from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin  

db = SQLAlchemy()

#fixed BaseModel
class BaseModel:
    id = db.Column(db.Integer, primary_key=True)  
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow) 

#fixed User model
class User(db.Model, BaseModel, SerializerMixin):  
    __tablename__ = "users"

    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)  
    is_admin = db.Column(db.Boolean, default=False)  
    parcels = db.relationship('Parcel', backref='user', lazy=True)
    ratings = db.relationship('Rating', backref='user', lazy=True)

    serialize_rules = ('-parcels.user', '-ratings.user',)

    def __repr__(self):
        return f"<User {self.username}, Admin: {self.is_admin}>"

# fixed Parcel model
class Parcel(db.Model, BaseModel, SerializerMixin):
    __tablename__ = 'parcels' 

    description = db.Column(db.String(225), nullable=False)
    weight = db.Column(db.Float, nullable=False)
    destination = db.Column(db.String(225), nullable=False)
    status = db.Column(db.String(50), default='pending')

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  

    tracking_updates = db.relationship('TrackingUpdate', backref='parcel', lazy=True)
    ratings = db.relationship('Rating', backref='parcel', lazy=True)

    serialize_rules = ('-user.parcels', '-ratings.parcel', '-tracking_updates.parcel',)

    def __repr__(self):
        return f"<Parcel {self.description}, Status: {self.status}>"

# trackingUpdate model
class TrackingUpdate(db.Model, BaseModel, SerializerMixin):
    __tablename__ = 'tracking_updates'

    update_text = db.Column(db.String(255), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    parcel_id = db.Column(db.Integer, db.ForeignKey('parcels.id'), nullable=False)

    serialize_rules = ('-parcel.tracking_updates',)

    def __repr__(self):
        return f"<TrackingUpdate for Parcel {self.parcel_id} at {self.timestamp}>"

#rating model
class Rating(db.Model, BaseModel, SerializerMixin):
    __tablename__ = 'ratings'

    parcel_id = db.Column(db.Integer, db.ForeignKey('parcels.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    stars = db.Column(db.Integer, nullable=False)
    feedback = db.Column(db.Text, nullable=True)

    serialize_rules = ('-user.ratings', '-parcel.ratings',)

    def __repr__(self):
        return f"<Rating {self.stars}★ by User {self.user_id}>"
