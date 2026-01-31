import base64
import pytesseract
from PIL import Image
import io

def extract_text_from_image(image_base64: str) -> str:
    image_bytes = base64.b64decode(image_base64)
    image = Image.open(io.BytesIO(image_bytes))
    text = pytesseract.image_to_string(image)
    return text.strip()