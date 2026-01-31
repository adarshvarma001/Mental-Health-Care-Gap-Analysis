import json, uuid, os
from datetime import datetime

DATA_PATH = "data/patient_records.json"

def save_patient_record(
    risk_score,
    risk_inputs,
    mental_health,
    urgency,
    city=None,
    state=None
):
    record = {
        "patient_id": "TEMP_ID",
        "risk_score": float(risk_score),
        "risk_inputs": risk_inputs,
        "mental_health": mental_health,
        "urgency": urgency,
        "city": city,
        "state": state
    }

    return record

