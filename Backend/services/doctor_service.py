import pandas as pd

DOCTOR_DATA_PATH = "data/clean_doctors_required.csv"   # adjust path if needed

MENTAL_SPECIALTIES = [
    "Psychiatry",
    "Psychologist",
    "Mental Health",
    "Behavioral Health"
]

def recommend_doctors(user_city=None, user_state=None, limit=3):
    df = pd.read_csv(DOCTOR_DATA_PATH)

    # ---- filter mental health doctors ----
    df = df[df["primary_specialty"].str.contains(
        "|".join(MENTAL_SPECIALTIES),
        case=False,
        na=False
    )]

    # ---- location filter (optional but recommended) ----
    if user_city:
        df = df[df["city"].str.lower() == user_city.lower()]

    if user_state:
        df = df[df["state"].str.lower() == user_state.lower()]

    # ---- fallback if no local doctors ----
    if df.empty:
        df = pd.read_csv(DOCTOR_DATA_PATH)
        df = df[df["primary_specialty"].str.contains(
            "|".join(MENTAL_SPECIALTIES),
            case=False,
            na=False
        )]

    df = df.head(limit)

    return df[[
        "first_name",
        "last_name",
        "credential",
        "primary_specialty",
        "city",
        "state",
        "phone"
    ]].to_dict(orient="records")
