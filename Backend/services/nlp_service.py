import os
import torch
import torch.nn.functional as F
from transformers import AutoTokenizer, AutoModel
from utils.ocr import extract_text_from_image
from utils.ocr import extract_text_from_image
from utils.text_cleaning import clean_text



from utils.text_cleaning import clean_text

MODEL_DIR = "models/nlp/clinicalbert_final"
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

LABELS = ["Anxiety", "Stress", "Depression", "Sleep"]

# ---------------- TOKENIZER ----------------
tokenizer = AutoTokenizer.from_pretrained(MODEL_DIR)

# ---------------- MODEL ----------------
class ClinicalBERTRegression(torch.nn.Module):
    def __init__(self):
        super().__init__()
        self.encoder = AutoModel.from_pretrained("emilyalsentzer/Bio_ClinicalBERT")
        self.regressor = torch.nn.Linear(self.encoder.config.hidden_size, 4)

    def forward(self, input_ids, attention_mask):
        out = self.encoder(input_ids=input_ids, attention_mask=attention_mask)
        pooled = out.last_hidden_state[:, 0]
        return self.regressor(pooled)

model = ClinicalBERTRegression().to(DEVICE)

model_path = f"{MODEL_DIR}/model.pt"
if not os.path.exists(model_path):
    raise FileNotFoundError(f"Model not found: {model_path}")

model.load_state_dict(torch.load(model_path, map_location=DEVICE))
model.eval()

print("✅ ClinicalBERT NLP model loaded successfully")

from utils.text_cleaning import clean_text
from utils.ocr import extract_text_from_image


def analyze_input(text=None, image_path=None):
    # ❌ both given
    if text and image_path:
        return {"error": "Provide either text OR image, not both"}

    # ✅ image path
    if image_path:
        extracted_text = extract_text_from_image(image_path)

        if not extracted_text.strip():
            return {"error": "No readable text found in image"}

        return analyze_text(extracted_text)

    # ✅ text input
    if text:
        return analyze_text(clean_text(text))

    return {"error": "No input provided"}


# ---------------- SEVERITY ----------------
def score_to_severity(score):
    if score < 30:
        return "Low"
    elif score < 70:
        return "Moderate"
    return "High"




# ---------------- ANALYZE ----------------
def analyze_text(text: str):
    text = clean_text(text)
    text_lower = text.lower()

    enc = tokenizer(
        text,
        truncation=True,
        padding="max_length",
        max_length=256,  # improved
        return_tensors="pt"
    )
    enc = {k: v.to(DEVICE) for k, v in enc.items()}

    with torch.no_grad():
        outputs = model(enc["input_ids"], enc["attention_mask"])

    outputs = outputs.squeeze(0)          # FIX 1
    outputs = torch.clamp(outputs, 0, 5)  # FIX 2

    neutral_phrases = [
        "doing fine", "feel fine", "everything is normal",
        "emotionally okay", "no issues", "all good",
        "i am fine", "i'm fine", "nothing wrong"
    ]

    stress_words = ["work", "deadline", "pressure", "workload", "stress"]
    depression_words = ["hopeless", "worthless", "empty", "no motivation"]

    is_neutral = any(p in text_lower for p in neutral_phrases)
    stress_present = any(w in text_lower for w in stress_words)
    depression_present = any(w in text_lower for w in depression_words)

    results = {}

    for i, label in enumerate(LABELS):
        raw_score = (outputs[i].item() / 5.0) * 100
        score = raw_score

        # 🔒 Neutral suppression
        if is_neutral:
            score = min(score, 15)

        # 🔒 Depression protection
        if label == "Depression" and not depression_present:
            score = min(score, 30)

        # 🔒 Stress floor
        if label == "Stress" and stress_present:
            score = max(score, 35)

        score = round(score, 2)

        results[label] = {
            "score": score,
            "severity": score_to_severity(score)
        }

    return {
        "labels": results,
        "overall_severity": max(v["score"] for v in results.values())
    }
