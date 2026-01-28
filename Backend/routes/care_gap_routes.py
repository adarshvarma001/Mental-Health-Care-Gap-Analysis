from flask import Blueprint, request, jsonify
from services.risk_service import calculate_risk
from services.nlp_service import analyze_input
from services.urgency_service import compute_urgency, urgency_level





@care_gap_bp.route("/self-check", methods=["POST"])
def self_check():
    data = request.get_json()

    # 1️⃣ Step 1: Risk analysis
    risk_result = calculate_risk(data)
    risk_score = risk_result["risk_score"]

    # STOP if risk < 50
    if risk_score < 50:
        return jsonify({
            "risk_score": risk_score,
            "message": "Risk is low. No further action needed.",
            "next_step": "None"
        })

    # 2️⃣ Step 2: Mental health analysis
    nlp_result = analyze_input(text=data.get("text"))
    labels = nlp_result["labels"]

    # 3️⃣ Step 3: Urgency calculation
    urgency_score = compute_urgency(risk_score, labels)
    urgency_lvl = urgency_level(urgency_score)

    response = {
        "risk_score": risk_score,
        "mental_health": labels,
        "urgency": {
            "score": urgency_score,
            "level": urgency_lvl
        }
    }

    # 4️⃣ Step 4: Decide next action
    if urgency_score >= 60:
        # 🔴 Doctor recommendation
        doctors = recommend_doctors(data)   # uses your doctor dataset
        response["action"] = "Doctor consultation recommended"
        response["doctors"] = doctors

    elif urgency_score >= 30:
        # 🟡 Care gap analysis
        care_gaps = analyze_care_gap(data, labels)
        response["action"] = "Care gap analysis recommended"
        response["care_gap"] = care_gaps

    else:
        response["action"] = "Self-care suggestions"

    return jsonify(response)
