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

    if user_city:
        df = df[df["city"].str.lower() == user_city.lower()]

    if user_state:
        df = df[df["state"].str.lower() == user_state.lower()]

    df = df.head(limit)

    # 🔥 FINAL JSON-SAFE CONVERSION
    doctors = []
    for _, row in df.iterrows():
        doctors.append({
            "NPI": str(row["NPI"]),
            "first_name": str(row["first_name"]),
            "last_name": str(row["last_name"]),
            "gender": str(row["gender"]),
            "credential": str(row["credential"]),
            "primary_specialty": str(row["primary_specialty"]),
            "city": str(row["city"]),
            "state": str(row["state"]),
            "phone": str(row["phone"])
        })

    return doctors
