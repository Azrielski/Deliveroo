from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin 

db = SQLAlchemy()
class Parcel(db.Model,SerializerMixin):
    __tablename__ = 'parcels'

    id = db.Column(db.Integer, primary_key=True)  
    description = db.Column(db.String(225), nullable=False)
    weight = db.Column(db.Float, nullable=False)
    destination = db.Column(db.String(225), nullable=False)
    status = db.Column(db.String(50), default='pending')
    pickup_address = db.Column(db.String(225), nullable=False)
    recipient_name = db.Column(db.String(100), nullable=False)
    recipient_phone = db.Column(db.String(20), nullable=False)


    # Coordinates
    pickup_lat = db.Column(db.Float, nullable=True)
    pickup_lon = db.Column(db.Float, nullable=True)
    destination_lat = db.Column(db.Float, nullable=True)
    destination_lon = db.Column(db.Float, nullable=True)
