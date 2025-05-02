from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from flask_jwt_extended import JWTManager

from models import db
from resources import register_resources  

app = Flask(__name__)

# Flask configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///deliveroo.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'Group_11'  

# Initialize extensions
db.init_app(app)
api = Api(app)
jwt = JWTManager(app)

# Initialize the database and create all tables
with app.app_context():
    db.create_all()

# Register resources
register_resources(api)

if __name__ == '__main__':
    app.run(debug=True)
