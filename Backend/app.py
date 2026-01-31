from flask import Flask
from flask_cors import CORS

# -------- BLUEPRINT IMPORTS --------
from routes.risk_routes import risk_bp
from routes.nlp_routes import nlp_bp
from routes.care_gap_routes import care_gap_bp

app = Flask(__name__)
CORS(app)

# -------- REGISTER BLUEPRINTS --------
app.register_blueprint(risk_bp)
app.register_blueprint(nlp_bp)
app.register_blueprint(care_gap_bp, url_prefix="/care-gap")

if __name__ == "__main__":
    app.run(debug=True)
