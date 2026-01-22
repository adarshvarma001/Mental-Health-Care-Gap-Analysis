import os
import re

MODEL_DIR = "models"
DEFAULT_MODEL = "mental_health_xgb_model.pkl"

def get_latest_model():
    if not os.path.exists(MODEL_DIR):
        raise FileNotFoundError("Models directory not found")

    models = os.listdir(MODEL_DIR)

    # Look for versioned models first
    versioned = []
    for m in models:
        match = re.search(r"_v(\d+)\.pkl$", m)
        if match:
            versioned.append((int(match.group(1)), m))

    # If versioned models exist, load latest
    if versioned:
        latest = sorted(versioned, reverse=True)[0][1]
        return os.path.join(MODEL_DIR, latest)

    # Fallback to default model
    fallback = os.path.join(MODEL_DIR, DEFAULT_MODEL)
    if os.path.exists(fallback):
        return fallback

    raise FileNotFoundError("No suitable model found")
