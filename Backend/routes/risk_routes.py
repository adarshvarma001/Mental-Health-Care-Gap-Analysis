from flask import Blueprint, request, jsonify
from services.risk_service import predict_risk

risk_bp = Blueprint("risk", __name__)

@risk_bp.route("/risk", methods=["POST"])
def risk_prediction():
    data = request.json

    if not data:
        return jsonify({"error": "No input data provided"}), 400

    risk_percentage = round(float(predict_risk(data)), 2)

    # 🔹 Risk type classification
    if 2 <= risk_percentage <= 32:
        risk_type = "LOW"
    elif 33 <= risk_percentage <= 70:
        risk_type = "MODERATE"
    else:
        risk_type = "HIGH"

    # 🔹 Care gap trigger
    care_gap_required = risk_percentage >= 65

    # 🔹 Next action message
    if care_gap_required:
        next_action = "Proceed to care gap analysis"
    elif risk_type == "MODERATE":
        next_action = "Monitor and reassess"
    else:
        next_action = "No care gap analysis required"

    return jsonify({
        "risk_percentage": risk_percentage,
        "risk_type": risk_type,
        "care_gap_required": care_gap_required,
        "next_action": next_action
    })
