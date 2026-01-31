from flask import Blueprint, request, jsonify
import os, uuid

from services.risk_service import predict_risk
from services.nlp_service import analyze_input
from services.urgency_service import compute_urgency, urgency_level
from services.patient_service import save_patient_record
from services.doctor_service import recommend_doctors

care_gap_bp = Blueprint("care_gap", __name__)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

RISK_FEATURES = [
    "_AGE_G", "_SEX", "MARITAL", "EMPLOY1", "INCOME3", "EDUCA",
    "MEDCOST1", "SDHFOOD1", "SDHBILLS", "EXERANY2", "SMOKE100",
    "ALCDAY4", "DIABETE4", "HAVARTH4", "GENHLTH", "LSATISFY", "EMTSUPRT"
]


@care_gap_bp.route("/self-check", methods=["POST"])
def self_check():

    # ============================================================
    # 0️⃣ INPUT (JSON OR IMAGE)
    # ============================================================
    data = {}
    image_path = None

    if request.content_type and request.content_type.startswith("multipart/form-data"):
        data = request.form.to_dict()
        image = request.files.get("image")

        if image and image.filename:
            filename = f"{uuid.uuid4().hex}.png"
            image_path = os.path.join(UPLOAD_DIR, filename)
            image.save(image_path)
    else:
        data = request.get_json(silent=True)
        if not data:
            return jsonify({"error": "Invalid or empty JSON input"}), 400

    # ============================================================
    # 1️⃣ RISK ANALYSIS (MANDATORY)
    # ============================================================
    risk_input = {}

    for f in RISK_FEATURES:
        if f not in data:
            return jsonify({"error": f"Missing risk feature: {f}"}), 400
        risk_input[f] = int(data[f])

    risk_score = float(predict_risk(risk_input))

    # ---------------- LOW RISK ----------------
    if risk_score < 50:
        return jsonify({
            "risk_score": risk_score,
            "action": "No further action required"
        })

    # ============================================================
    # 2️⃣ CHECK IF CARE GAP INPUT PROVIDED
    # ============================================================
    has_text = "text" in data and str(data["text"]).strip()
    has_image = image_path is not None

    # 🔴 Risk is high but no text/image yet
    if not has_text and not has_image:
        return jsonify({
            "risk_score": risk_score,
            "action": "Once consider taking Care Gap Analysis",
            "message": "Provide either Symtoms as text or an Medical Report image for further analysis"
        })

    if has_text and has_image:
        return jsonify({
            "error": "Provide only one input: text OR image"
        }), 400

    # ============================================================
    # 3️⃣ NLP ANALYSIS
    # ============================================================
    if has_text:
        nlp_result = analyze_input(text=data["text"])
    else:
        nlp_result = analyze_input(image_path=image_path)

    if "error" in nlp_result:
        return jsonify({"error": nlp_result["error"]}), 400

    mental_health = nlp_result["labels"]

    # ============================================================
    # 4️⃣ URGENCY
    # ============================================================
    urgency_score = float(compute_urgency(risk_score, mental_health))

    urgency = {
        "score": urgency_score,
        "level": urgency_level(urgency_score)
    }

    # ============================================================
    # 5️⃣ SAVE RECORD
    # ============================================================
    record = save_patient_record(
        risk_score=risk_score,
        risk_inputs=risk_input,
        mental_health=mental_health,
        urgency=urgency,
        city=data.get("city"),
        state=data.get("state")
    )

    response = {
        "patient_id": record.get("patient_id", "TEMP_ID"),
        "risk_score": risk_score,
        "mental_health": mental_health,
        "urgency": urgency
    }

    # ============================================================
    # 6️⃣ FINAL DECISION (ONLY BASED ON URGENCY)
    # ============================================================
    if urgency_score >= 50:
        response["action"] = "Doctor consultation recommended"
        response["doctors"] = recommend_doctors(
            user_city=data.get("city"),
            user_state=data.get("state")
        )
    else:
        response["action"] = "Care gap recommendations suggested"

    return jsonify(response)
