import numpy as np

# 🔒 MUST MATCH TRAINING FEATURE ORDER EXACTLY
FEATURE_ORDER = [
    "_AGE_G",
    "_SEX",
    "MARITAL",
    "EMPLOY1",
    "INCOME3",
    "EDUCA",
    "MEDCOST1",
    "SDHFOOD1",
    "SDHBILLS",
    "EXERANY2",
    "SMOKE100",
    "ALCDAY4",
    "DIABETE4",
    "HAVARTH4",
    "GENHLTH",
    "LSATISFY",
    "EMTSUPRT"
]

def preprocess_input(data: dict):
    """
    Converts input JSON into model-ready NumPy array
    in the correct feature order.
    """

    feature_values = []

    for feature in FEATURE_ORDER:
        if feature not in data:
            raise ValueError(f"Missing required feature: {feature}")

        feature_values.append(data[feature])

    return np.array([feature_values])