from flask import request, jsonify
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, User, Parcel, TrackingUpdate, Rating, Payment, Driver
from helpers import assign_driver_automatically, admin_required
from datetime import datetime

# User Registration
class UserRegister(Resource):
    def post(self):
        data = request.get_json()
        if User.query.filter_by(username=data['username']).first():
            return {'message': 'Username already exists'}, 409
        user = User(**data)
        db.session.add(user)
        db.session.commit()
        return {'message': 'User created successfully'}, 201

# User Details
class UserDetail(Resource):
    @jwt_required()
    def get(self):
        current_user = get_jwt_identity()
        user = User.query.filter_by(username=current_user).first()
        if not user:
            return {'message': 'User not found'}, 404
        return user.to_dict(), 200

    @jwt_required()
    def put(self):
        current_user = get_jwt_identity()
        user = User.query.filter_by(username=current_user).first()
        if not user:
            return {'message': 'User not found'}, 404

        data = request.get_json()
        user.username = data.get('username', user.username)
        user.email = data.get('email', user.email)
        db.session.commit()
        return user.to_dict(), 200

    @jwt_required()
    def delete(self):
        current_user = get_jwt_identity()
        user = User.query.filter_by(username=current_user).first()
        if not user:
            return {'message': 'User not found'}, 404

        db.session.delete(user)
        db.session.commit()
        return {'message': 'User deleted successfully'}, 200

# User Parcels
class UserParcels(Resource):
    @jwt_required()
    def get(self):
        current_user = get_jwt_identity()
        user = User.query.filter_by(username=current_user).first()
        parcels = Parcel.query.filter_by(user_id=user.id).all()
        return jsonify([parcel.to_dict() for parcel in parcels])

    @jwt_required()
    def post(self):
        current_user = get_jwt_identity()
        user = User.query.filter_by(username=current_user).first()
        data = request.get_json()

        required_fields = ['origin', 'weight', 'pickup_address', 'destination_address', 'recipient_name', 'recipient_phone']
        for field in required_fields:
            if field not in data:
                return {'message': f'{field} is required.'}, 400

        new_parcel = Parcel(
            origin=data['origin'],
            user_id=user.id,
            weight=data['weight'],
            payment_status='pending',
            status='pending',
            description=data.get('description'),
            pickup_address=data['pickup_address'],
            destination_address=data['destination_address'],
            present_location=data['pickup_address'],
            pickup_lat=data.get('pickup_lat'),
            pickup_lon=data.get('pickup_lon'),
            destination_lat=data.get('destination_lat'),
            destination_lon=data.get('destination_lon'),
            recipient_name=data['recipient_name'],
            recipient_phone=data['recipient_phone'],
            
        )

        new_parcel.driver_id = assign_driver_automatically()
        db.session.add(new_parcel)
        db.session.commit()
        return new_parcel.to_dict(), 201

# Parcel Details
class ParcelDetail(Resource):
    @jwt_required()
    def get(self, parcel_id):
        parcel = Parcel.query.get(parcel_id)
        if not parcel:
            return {'message': 'Parcel not found'}, 404
        return parcel.to_dict(), 200

    @jwt_required()
    def patch(self, parcel_id):
        parcel = Parcel.query.get(parcel_id)
        if not parcel:
            return {'message': 'Parcel not found'}, 404
        if parcel.status in ('delivered', 'cancelled'):
            return {'message': 'Cannot modify delivered/cancelled parcel'}, 400

        data = request.get_json()
        if 'destination_address' in data:
            parcel.destination_address = data['destination_address']
        db.session.commit()
        return parcel.to_dict(), 200

    @jwt_required()
    def delete(self, parcel_id):
        parcel = Parcel.query.get(parcel_id)
        if not parcel:
            return {'message': 'Parcel not found'}, 404
        db.session.delete(parcel)
        db.session.commit()
        return {'message': 'Parcel deleted'}, 200

# Parcel Delivery Confirmation
class ParcelDeliveryConfirm(Resource):
    @jwt_required()
    def post(self, parcel_id):
        parcel = Parcel.query.get(parcel_id)
        if not parcel:
            return {'message': 'Parcel not found'}, 404
        if parcel.status != 'in_transit':
            return {'message': 'Parcel not in transit'}, 400

        parcel.status = 'delivered'
        parcel.present_location = parcel.destination_address
        parcel.delivered_at = datetime.utcnow()
        db.session.commit()
        return {'message': 'Parcel marked as delivered'}, 200

# Parcel Tracking
class ParcelTracking(Resource):
    @jwt_required()
    def get(self, parcel_id):
        current_user = get_jwt_identity()
        parcel = Parcel.query.get(parcel_id)
        if not parcel:
            return {'message': 'Parcel not found'}, 404
        if parcel.user_id != current_user:
            return {'message': 'Unauthorized access'}, 403
        updates = TrackingUpdate.query.filter_by(parcel_id=parcel_id).all()
        return jsonify([u.to_dict() for u in updates])

# Parcel Rating
class ParcelRating(Resource):
    @jwt_required()
    def post(self, parcel_id):
        data = request.get_json()
        rating = Rating(
            parcel_id=parcel_id,
            stars=data['stars'],
            comment=data.get('comment')
        )
        db.session.add(rating)
        db.session.commit()
        return rating.to_dict(), 201

# Driver Rating
class DriverRating(Resource):
    @jwt_required()
    def post(self, driver_id):
        data = request.get_json()
        driver = Driver.query.get(driver_id)
        if not driver:
            return {'message': 'Driver not found'}, 404
        rating = Rating(
            driver_id=driver_id,
            stars=data['stars'],
            comment=data.get('comment')
        )
        db.session.add(rating)
        db.session.commit()
        return rating.to_dict(), 201

# Parcel Payment
class ParcelPayment(Resource):
    @jwt_required()
    def post(self, parcel_id):
        current_user = get_jwt_identity()
        parcel = Parcel.query.get(parcel_id)

        if not parcel:
            return {'message': 'Parcel not found'}, 404
        if parcel.user_id != current_user:
            return {'message': 'Unauthorized access'}, 403

        data = request.get_json()
        if parcel.payment_status == 'pending':
            payment = Payment(
                parcel_id=parcel.id,
                amount=data['amount'],
                status='paid'
            )
            db.session.add(payment)
            parcel.payment_status = 'paid'
            db.session.commit()
            return {'message': 'Payment successful', 'payment': payment.to_dict()}, 201

        return {'message': 'Payment not allowed for this parcel state'}, 400

# Admin: All Parcels
class AdminAllParcels(Resource):
    @jwt_required()
    @admin_required
    def get(self):
        parcels = Parcel.query.all()
        return jsonify([p.to_dict() for p in parcels])

# Admin: Users
class AdminUsers(Resource):
    @jwt_required()
    @admin_required
    def get(self):
        users = User.query.all()
        return jsonify([u.to_dict() for u in users])

# Admin: Ratings
class AdminRatings(Resource):
    @jwt_required()
    @admin_required
    def get(self):
        ratings = Rating.query.all()
        return jsonify([r.to_dict() for r in ratings])

# Admin: Tracking Updates
class AdminTrackingUpdates(Resource):
    @jwt_required()
    @admin_required
    def post(self, parcel_id):
        data = request.get_json()
        update = TrackingUpdate(
            parcel_id=parcel_id,
            location=data['location'],
            status=data['status']
        )
        db.session.add(update)
        db.session.commit()
        return update.to_dict(), 201

# Driver Details
class DriverDetail(Resource):
    @jwt_required()
    def get(self, driver_id):
        driver = Driver.query.get(driver_id)
        if not driver:
            return {'message': 'Driver not found'}, 404
        return driver.to_dict(), 200

    @jwt_required()
    def put(self, driver_id):
        driver = Driver.query.get(driver_id)
        if not driver:
            return {'message': 'Driver not found'}, 404

        data = request.get_json()
        driver.name = data.get('name', driver.name)
        driver.phone_number = data.get('phone_number', driver.phone_number)
        db.session.commit()
        return driver.to_dict(), 200

    @jwt_required()
    def delete(self, driver_id):
        driver = Driver.query.get(driver_id)
        if not driver:
            return {'message': 'Driver not found'}, 404

        db.session.delete(driver)
        db.session.commit()
        return {'message': 'Driver deleted successfully'}, 200
