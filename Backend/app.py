from flask import Flask
from flask_cors import CORS
from routes.risk_routes import risk_bp

app = Flask(__name__)
CORS(app)

# Register only Page-1 route
app.register_blueprint(risk_bp)

if __name__ == "__main__":
    app.run(debug=True)
