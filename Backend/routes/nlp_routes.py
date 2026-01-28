from flask import Blueprint, request, jsonify
from services.nlp_service import analyze_input
import os, uuid

nlp_bp = Blueprint("nlp", __name__)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@nlp_bp.route("/nlp/analyze", methods=["POST"])
def analyze():

    has_image = "image" in request.files
    has_json = request.is_json

    # ❌ BOTH PROVIDED
    if has_image and has_json:
        return jsonify({
            "error": "Provide either text OR image, not both"
        }), 400

    # -------- IMAGE FLOW --------
    if has_image:
        image = request.files["image"]

        if image.filename == "":
            return jsonify({"error": "Empty image file"}), 400

        filename = f"{uuid.uuid4().hex}.png"
        path = os.path.join(UPLOAD_DIR, filename)
        image.save(path)

        return jsonify(analyze_input(image_path=path))

    # -------- TEXT FLOW --------
    if has_json:
        data = request.get_json(silent=True)

        if not data or "text" not in data:
            return jsonify({
                "error": "JSON body must contain 'text'"
            }), 400

        if not data["text"].strip():
            return jsonify({
                "error": "Text input cannot be empty"
            }), 400

        return jsonify(analyze_input(text=data["text"]))

    # ❌ NOTHING PROVIDED
    return jsonify({
        "error": "Send either JSON with 'text' OR an image file"
    }), 400
