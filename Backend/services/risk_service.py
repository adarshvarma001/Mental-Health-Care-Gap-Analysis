import joblib
import numpy as np
from utils.preprocessing import preprocess_input
from config import get_latest_model  # auto versioning

# Load model ONCE at startup
MODEL_PATH = get_latest_model()
model = joblib.load(MODEL_PATH)

print(f"Loaded model: {MODEL_PATH}")

def predict_risk(input_data: dict) -> float:
    X = preprocess_input(input_data)
    risk_prob = model.predict_proba(X)[0][1]
    return round(risk_prob * 100, 2)