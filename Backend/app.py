from flask import Flask
from flask_cors import CORS

from routes.risk_routes import risk_bp
from routes.nlp_routes import nlp_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(risk_bp)
app.register_blueprint(nlp_bp)

if __name__ == "__main__":
    app.run(debug=True)
