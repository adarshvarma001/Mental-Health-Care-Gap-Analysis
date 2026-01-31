from flask import Blueprint, request, jsonify

# -------- SERVICES --------
from services.risk_service import predict_risk
from services.nlp_service import analyze_input
from services.urgency_service import compute_urgency, urgency_level
from services.patient_service import save_patient_record
from services.doctor_service import recommend_doctors

care_gap_bp = Blueprint("care_gap", __name__)

# -------- RISK FEATURES (MUST MATCH MODEL) --------
RISK_FEATURES = [
    "_AGE_G", "_SEX", "MARITAL", "EMPLOY1", "INCOME3", "EDUCA",
    "MEDCOST1", "SDHFOOD1", "SDHBILLS", "EXERANY2", "SMOKE100",
    "ALCDAY4", "DIABETE4", "HAVARTH4", "GENHLTH", "LSATISFY", "EMTSUPRT"
]


@care_gap_bp.route("/self-check", methods=["POST"])
def self_check():
    """
    FULL CARE GAP FLOW
    1. Risk Analysis
    2. Mental Health Analysis (Text OR Image)
    3. Urgency Calculation
    4. Patient Record Storage
    5. Care Gap / Doctor Recommendation
    """

    # ---------------- 0️⃣ INPUT ----------------
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"error": "Invalid or empty JSON input"}), 400

    # ---------------- 1️⃣ RISK ANALYSIS ----------------
    try:
        # Extract ONLY risk features
        risk_input = {k: data[k] for k in RISK_FEATURES if k in data}

        if len(risk_input) != len(RISK_FEATURES):
            return jsonify({
                "error": "Missing required risk features"
            }), 400

        risk_score = round(float(predict_risk(risk_input)), 2)

    except Exception as e:
        print("Risk error:", e)
        return jsonify({"error": "Risk calculation failed"}), 500

    # ⛔ Stop early if risk is low
    if risk_score < 50:
        return jsonify({
            "risk_score": risk_score,
            "risk_type": "LOW",
            "message": "Risk is low. No further action required."
        })

    # ---------------- 2️⃣ MENTAL HEALTH (TEXT ONLY FOR NOW) ----------------
    try:
        if "text" in data and data["text"].strip():
            nlp_result = analyze_input(text=data["text"])
        else:
            return jsonify({
                "error": "Provide 'text' for mental health analysis"
            }), 400

        mental_health = nlp_result["labels"]

    except Exception as e:
        print("NLP error:", e)
        return jsonify({"error": "Mental health analysis failed"}), 500

    # ---------------- 3️⃣ URGENCY ----------------
    urgency_score = compute_urgency(risk_score, mental_health)
    urgency_lvl = urgency_level(urgency_score)

    urgency = {
        "score": urgency_score,
        "level": urgency_lvl
    }

    # ---------------- 4️⃣ SAVE PATIENT RECORD ----------------
    try:
        record = save_patient_record(
            risk_score=risk_score,
            risk_inputs=risk_input,
            mental_health=mental_health,
            urgency=urgency,
            city=data.get("city"),
            state=data.get("state")
        )
        patient_id = record.get("patient_id", "UNKNOWN")
    except Exception as e:
        print("Save error:", e)
        patient_id = "TEMP_ID"

    # ---------------- 5️⃣ FINAL DECISION ----------------
    response = {
        "patient_id": patient_id,
        "risk_score": risk_score,
        "mental_health": mental_health,
        "urgency": urgency
    }

    if urgency_score >= 60:
        response["action"] = "Doctor consultation recommended"

        doctors = recommend_doctors(
            user_city=data.get("city"),
            user_state=data.get("state")
        )

        if doctors:
            response["doctors"] = doctors
        else:
            response["message"] = "No nearby mental health specialists found"

    elif urgency_score >= 30:
        response["action"] = "Care gap recommendations suggested"

    else:
        response["action"] = "Self-care advised"

    return jsonify(response)
