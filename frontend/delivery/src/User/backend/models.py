from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin 

db = SQLAlchemy()
class Parcel(db.Model,SerializerMixin):
    __tablename__ = 'parcels'

    id = db.Column(db.Integer, primary_key=True)
    weight = db.Column(db.Float, nullable=False)  
    description = db.Column(db.String(500))       
    pickup_address = db.Column(db.String(200), nullable=False)
    destination_address = db.Column(db.String(200), nullable=False)
    status = db.Column(db.String(50), default='pending')
    present_location = db.Column(db.String(200))

     # Add these new fields
    pickup_lat = db.Column(db.Float)
    pickup_lon = db.Column(db.Float)
    destination_lat = db.Column(db.Float)
    destination_lon = db.Column(db.Float)

    
