from flask import request, jsonify
from flask_restful import Resource
from models import db, User, Parcel, TrackingUpdate, Rating, ParcelHistory, Payment
from helpers import assign_driver, is_admin, send_notification, validate_parcel_data, process_payment
from werkzeug.exceptions import BadRequest, NotFound, Unauthorized, Forbidden
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy.exc import IntegrityError
import logging

# User Resources 
class UserListResource(Resource):
    def get(self):
        # List all users (for admin only)
        users = User.query.all()
        return jsonify([u.to_dict() for u in users])

    def post(self):
        # Create new user
        data = request.get_json()
        try:
            user = User(**data)
            db.session.add(user)
            db.session.commit()
            return jsonify(user.to_dict()), 201
        except IntegrityError:
            db.session.rollback()
            raise BadRequest("User with provided data already exists.")

class UserResource(Resource):
    @jwt_required()
    def get(self, user_id):
        # Get user by ID 
        user = User.query.get_or_404(user_id)
        return jsonify(user.to_dict(include_profile=True))

    @jwt_required()
    def delete(self, user_id):
        # Delete user by ID
        current_user_id = get_jwt_identity()
        if current_user_id != user_id:
            raise Forbidden("You can only delete your own account.")
        user = User.query.get_or_404(user_id)
        # Delete all user's associated parcels
        parcels = Parcel.query.filter_by(user_id=user_id).all()
        for parcel in parcels:
            db.session.delete(parcel)
        db.session.delete(user)
        db.session.commit()
        return '', 204

# Parcel Resources
class ParcelListResource(Resource):
    @jwt_required()
    def post(self):
        # Create new parcel and assign driver automatically
        data = request.get_json()
        try:
            # Validate parcel data
            validate_parcel_data(data)

            user_id = get_jwt_identity()
            data['user_id'] = user_id
            
            # Automatically assign a driver
            driver = assign_driver()

            if not driver:
                logging.warning("No available drivers at the moment.")
                raise BadRequest("No available drivers at the moment.")
            
            data['driver_id'] = driver.id  # Assign the driver to the parcel
            parcel = Parcel(**data)
            db.session.add(parcel)
            db.session.commit()

            # Create a history record for the parcel
            parcel_history = ParcelHistory(parcel_id=parcel.id, status=parcel.status)
            db.session.add(parcel_history)
            db.session.commit()

            logging.info(f"Parcel created: {parcel.id}, assigned to driver: {driver.id}")
            
            # Send notifications to the driver and the user
            send_notification(driver.id, f"You have been assigned a new parcel: {parcel.id}")
            send_notification(user_id, f"Your parcel {parcel.id} has been created and assigned to a driver.")
            
            return jsonify(parcel.to_dict()), 201
        except Exception as e:
            logging.error(f"Error creating parcel: {str(e)}")
            return jsonify({"message": "Failed to create parcel."}), 500

    @jwt_required()
    def get(self):
        # Admin can view all parcels
        user = User.query.get(get_jwt_identity())
        if not is_admin(user):
            raise Forbidden("Only admin can access all parcels.")
        parcels = Parcel.query.all()
        return jsonify([p.to_dict() for p in parcels])

class ParcelResource(Resource):
    @jwt_required()
    def get(self, parcel_id):
        # Retrieve specific parcel
        parcel = Parcel.query.get_or_404(parcel_id)
        return jsonify(parcel.to_dict(detailed=True))

    @jwt_required()
    def patch(self, parcel_id):
        # Update parcel (e.g. status or destination)
        parcel = Parcel.query.get_or_404(parcel_id)
        data = request.get_json()
        for key, value in data.items():
            setattr(parcel, key, value)
        db.session.commit()
        return jsonify(parcel.to_dict())

    @jwt_required()
    def delete(self, parcel_id):
        # Cancel a parcel
        parcel = Parcel.query.get_or_404(parcel_id)
        parcel.status = 'Cancelled'
        db.session.commit()
        return '', 204

# Tracking Resources 
class TrackingResource(Resource):
    @jwt_required()
    def post(self, parcel_id):
        # Adding a tracking update
        parcel = Parcel.query.get_or_404(parcel_id)
        data = request.get_json()

        # Checking if user is authorized to update tracking information
        current_user_id = get_jwt_identity()
        if current_user_id != parcel.user_id and current_user_id != parcel.receiver_id:
            raise Forbidden("You are not authorized to update tracking for this parcel.")

        # Creating and save the tracking update
        update = TrackingUpdate(parcel_id=parcel.id, **data)
        db.session.add(update)
        db.session.commit()
        return jsonify(update.to_dict()), 201

    @jwt_required()
    def get(self, parcel_id):
        # Get all tracking updates for a parcel
        parcel = Parcel.query.get_or_404(parcel_id)
        current_user_id = get_jwt_identity()

        # Checking if user is authorized to view tracking info
        if current_user_id != parcel.user_id and current_user_id != parcel.receiver_id:
            raise Forbidden("You are not authorized to view tracking for this parcel.")
        
        # Retrieving all tracking updates
        updates = TrackingUpdate.query.filter_by(parcel_id=parcel_id).all()
        return jsonify([u.to_dict() for u in updates])

# Rating Resources 
class RatingResource(Resource):
    @jwt_required()
    def post(self, driver_id):
        # Post a rating for a driver
        data = request.get_json()
        rating = Rating(user_id=get_jwt_identity(), driver_id=driver_id, **data)
        db.session.add(rating)
        db.session.commit()
        return jsonify(rating.to_dict()), 201

    def get(self, driver_id):
        # Get all ratings for a driver
        ratings = Rating.query.filter_by(driver_id=driver_id).all()
        return jsonify([r.to_dict() for r in ratings])

# Admin Dashboard
class AdminDashboardResource(Resource):
    @jwt_required()
    def get(self):
        # Admin-only overview dashboard
        user = User.query.get(get_jwt_identity())
        if not is_admin(user):
            raise Forbidden("Admins only.")
        users = User.query.count()
        parcels = Parcel.query.count()
        drivers = User.query.filter_by(role='driver').count()
        return jsonify({"users": users, "parcels": parcels, "drivers": drivers})

# Driver Resources 
class DriverResource(Resource):
    @jwt_required()
    def get(self, driver_id):
        # Retrieve driver information (for user)
        driver = User.query.get_or_404(driver_id)
        return jsonify(driver.to_dict(include_profile=True))

# Payment Resources 
class PaymentResource(Resource):
    @jwt_required()
    def post(self, parcel_id):
        # Process a payment for a parcel
        data = request.get_json()
        user_id = get_jwt_identity()
        parcel = Parcel.query.get_or_404(parcel_id)

        if parcel.user_id != user_id:
            raise Forbidden("You can only pay for your own parcels.")

        # Process payment
        payment = process_payment(data)
        if not payment:
            raise BadRequest("Payment failed. Please try again.")

        # Save payment details in the database
        payment_record = Payment(parcel_id=parcel.id, **payment)
        db.session.add(payment_record)
        db.session.commit()

        # Update parcel status to "Paid"
        parcel.status = "Paid"
        db.session.commit()

        send_notification(user_id, f"Your payment for parcel {parcel.id} has been successfully processed.")

        return jsonify(payment_record.to_dict()), 201

# Helper Function to Assign Driver
def assign_driver():
    available_driver = User.query.filter_by(role="driver", is_available=True).first()
    if available_driver:
        # Mark driver as unavailable once assigned to a parcel
        available_driver.is_available = False
        db.session.commit()
    return available_driver

# Routes Setup 
def register_resources(api):
    api.add_resource(UserListResource, '/users')
    api.add_resource(UserResource, '/users/<int:user_id>')
    api.add_resource(ParcelListResource, '/parcels')
    api.add_resource(ParcelResource, '/parcels/<int:parcel_id>')
    api.add_resource(TrackingResource, '/parcels/<int:parcel_id>/tracking')
    api.add_resource(RatingResource, '/drivers/<int:driver_id>/ratings')
    api.add_resource(AdminDashboardResource, '/admin/dashboard')
    api.add_resource(DriverResource, '/drivers/<int:driver_id>')  
    api.add_resource(PaymentResource, '/parcels/<int:parcel_id>/payment')
