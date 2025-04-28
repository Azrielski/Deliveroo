from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from flask_jwt_extended import JWTManager

from models import db
from resources import register_routes

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///deliveroo.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config[''] = 'group11'

db.init_app(app)
api = Api(app)
jwt = JWTManager(app)

with app.app_context():
    db.create_all()

register_routes(api)

if __name__ == '__main__':
    app.run(debug=True)
