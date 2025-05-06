from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin  
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

# Base models
class BaseModel:
    
    id = db.Column(db.Integer, primary_key=True)  
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow) 

# User model
class User(db.Model, BaseModel, SerializerMixin):  
    __tablename__ = "users"

    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)  

    is_admin = db.Column(db.Boolean, default=False)  
    is_active = db.Column(db.Boolean, default=True)  
    verification_token = db.Column(db.String(120), nullable=True)
    token_expiry = db.Column(db.DateTime, nullable=True)

    parcels = db.relationship('Parcel', back_populates='user', lazy=True)
    ratings = db.relationship('Rating', back_populates='user', lazy=True)

    serialize_rules = ('-parcels.user', '-ratings.user',)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f"<User {self.username}, Admin: {self.is_admin}>"


# Parcel model
class Parcel(db.Model, BaseModel, SerializerMixin):
    __tablename__ = 'parcels'

    description = db.Column(db.String(225), nullable=False)
    weight = db.Column(db.Float, nullable=False)
    destination = db.Column(db.String(225), nullable=False)
    status = db.Column(db.String(50), default='pending')
    pickup_address = db.Column(db.String(225), nullable=False)

    # Coordinates
    pickup_lat = db.Column(db.Float, nullable=True)
    pickup_lon = db.Column(db.Float, nullable=True)
    destination_lat = db.Column(db.Float, nullable=True)
    destination_lon = db.Column(db.Float, nullable=True)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship('User', back_populates='parcels', lazy=True)
    
    driver_id = db.Column(db.Integer, db.ForeignKey('drivers.id'), nullable=True)
    driver = db.relationship('Driver', back_populates='assigned_parcels', lazy=True)


    tracking_updates = db.relationship('TrackingUpdate', back_populates='parcel', lazy=True)
    ratings = db.relationship('Rating', back_populates='parcel', lazy=True)

    serialize_rules = (
        '-user.parcels',
        '-ratings.parcel',
        '-tracking_updates.parcel',
        '-driver.assigned_parcels',
    )


    def __repr__(self):
        return f"<Parcel {self.description}, Status: {self.status}>"

# TrackingUpdate model
class TrackingUpdate(db.Model, BaseModel, SerializerMixin):
    __tablename__ = 'tracking_updates'

    update_text = db.Column(db.String(255), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    parcel_id = db.Column(db.Integer, db.ForeignKey('parcels.id'), nullable=False)
    
    parcel = db.relationship('Parcel', back_populates='tracking_updates', lazy=True)

    serialize_rules = ('-parcel.tracking_updates',)

    def __repr__(self):
        return f"<TrackingUpdate for Parcel {self.parcel_id} at {self.timestamp}>"

# Rating model
class Rating(db.Model, BaseModel, SerializerMixin):
    __tablename__ = 'ratings'

    parcel_id = db.Column(db.Integer, db.ForeignKey('parcels.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    stars = db.Column(db.Integer, nullable=False)
    feedback = db.Column(db.Text, nullable=True)

    user = db.relationship('User', back_populates='ratings', lazy=True)
    parcel = db.relationship('Parcel', back_populates='ratings', lazy=True)

    serialize_rules = ('-user.ratings', '-parcel.ratings',)

    def __repr__(self):
        return f"<Rating {self.stars}★ by User {self.user_id}>"
    

class Driver(db.Model, BaseModel, SerializerMixin):
    __tablename__ = 'drivers'
    
    first_name = db.Column(db.String(80), nullable = False)
    last_name = db.Column(db.String(80), nullable = False)
    
    unique_name = db.Column(db.String(160), unique=True, nullable=False)
    
    is_active  = db.Column(db.Boolean, default = True)
    
    assigned_parcels = db.relationship('Parcels', back_populates = 'driver', lazy=True)
    
    serialize_rules = ('-assigned_parcels.driver',)
    
    def __repr__(self):
        return f"<Driver {self.unique_name}, Available: {self.is_available}>"

    