from flask import Flask
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from models import db
from resources import register_routes

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# App configuration
 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'bb7523de87660149c8e11db73e41bce56afbbe1ea1324a731c97c415b493911c'

# Initialize extensions
db.init_app(app)
api = Api(app)
jwt = JWTManager(app)

# Register API routes
register_routes(api)

# **Create tables before serving requests**
with app.app_context():
    db.create_all()

# Root route
@app.route('/')
def index():
    return {"message": "Welcome to my website!"}

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
