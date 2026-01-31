import json, uuid, os
from datetime import datetime

DATA_PATH = "data/patient_records.json"

def save_patient_record(risk_score, risk_inputs, mental_health, urgency):
    record = {
        "patient_id": str(uuid.uuid4()),
        "risk_score": risk_score,
        "risk_inputs": risk_inputs,
        "mental_health": mental_health,
        "urgency": urgency,
        "timestamp": datetime.utcnow().isoformat()
    }

    if os.path.exists(DATA_PATH):
        with open(DATA_PATH, "r") as f:
            data = json.load(f)
    else:
        data = []

    data.append(record)

    with open(DATA_PATH, "w") as f:
        json.dump(data, f, indent=2)

    return record
