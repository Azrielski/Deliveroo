from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, User, Parcel, TrackingUpdate, Rating, Driver
from helpers import assign_driver_automatically, admin_required
from datetime import datetime

# User Detail Resource (GET, PATCH, DELETE)
class UserDetail(Resource):
    @jwt_required()
    def get(self):
        user_id = request.args.get('user_id')
        if not user_id or not user_id.isdigit():
            return {'message': 'Invalid user ID'}, 400

        user = User.query.get(int(user_id))
        if not user:
            return {'message': 'User not found'}, 404

        return user.to_dict(), 200

    @jwt_required()
    def patch(self):
        user_id = request.args.get('user_id')
        if not user_id or not user_id.isdigit():
            return {'message': 'Invalid user ID'}, 400

        user = User.query.get(int(user_id))
        if not user:
            return {'message': 'User not found'}, 404

        current_user = get_jwt_identity()
        if user.username != current_user:
            return {'message': 'Unauthorized access'}, 403

        data = request.get_json()
        user.username = data.get('username', user.username)
        user.email = data.get('email', user.email)
        db.session.commit()
        return user.to_dict(), 200

    @jwt_required()
    def delete(self):
        user_id = request.args.get('user_id')
        if not user_id or not user_id.isdigit():
            return {'message': 'Invalid user ID'}, 400

        user = User.query.get(int(user_id))
        if not user:
            return {'message': 'User not found'}, 404

        current_user = get_jwt_identity()
        if user.username != current_user:
            return {'message': 'Unauthorized access'}, 403

        db.session.delete(user)
        db.session.commit()
        return {'message': 'User deleted successfully'}, 200


class UserParcels(Resource):
    @jwt_required()
    def get(self):
        # user_id = request.args.get('user_id')
        # if not user_id or not user_id.isdigit():
        #     return {"message": "Invalid user ID"}, 400

        user = User.query.get(get_jwt_identity())
        # if not user:
        #     return {"message": "User not found"}, 404

        # current_user = get_jwt_identity()
        # if user.username != current_user:
        #     return {'message': 'Unauthorized access'}, 403

        parcels = Parcel.query.filter_by(user_id=user.id).all()
        return [parcel.to_dict() for parcel in parcels], 200

    @jwt_required()
    def post(self):
        current_user_id = get_jwt_identity()
        if not current_user_id:
            return {"message": "Missing or invalid user identity in JWT"}, 401

        user = User.query.get(current_user_id)
        if not user:
            return {"message": "User not found"}, 404

        data = request.get_json()
        required_fields = ["weight", "pickup_address", "destination", "recipient_name", "recipient_phone"]
        missing_fields = [field for field in required_fields if field not in data]
        if missing_fields:
            return {"message": f"Missing fields: {', '.join(missing_fields)}"}, 400

        description = data.get("description", "No description provided")
        new_parcel = Parcel(
            user_id=user.id,
            weight=data["weight"],
            status="pending",
            description=description,
            pickup_address=data["pickup_address"],
            destination=data["destination"],
            recipient_name=data["recipient_name"],
            recipient_phone=data["recipient_phone"]
        )

        assigned_driver = assign_driver_automatically(new_parcel)
        if assigned_driver:
            new_parcel.driver_id = assigned_driver.id

        db.session.add(new_parcel)
        db.session.commit()
        return new_parcel.to_dict(), 201


class ParcelDetail(Resource):
    @jwt_required()
    def get(self, parcel_id):
        if not parcel_id or not str(parcel_id).isdigit():
            return {'message': 'Invalid parcel ID'}, 400

        parcel = Parcel.query.get(parcel_id)
        if not parcel:
            return {'message': 'Parcel not found'}, 404

        current_user = get_jwt_identity()
        if (parcel.user and parcel.user.username == current_user) or \
           (parcel.driver and parcel.driver.username == current_user):
            return parcel.to_dict(), 200
        else:
            return {'message': 'Unauthorized access'}, 403


class ParcelTracking(Resource):
    @jwt_required()
    def get(self, parcel_id):
        if not parcel_id or not str(parcel_id).isdigit():
            return {'message': 'Invalid parcel ID'}, 400

        parcel = Parcel.query.get(parcel_id)
        if not parcel:
            return {'message': 'Parcel not found'}, 404

        current_user = get_jwt_identity()
        if not ((parcel.user and parcel.user.username == current_user) or 
                (parcel.driver and parcel.driver.username == current_user)):
            return {"message": "Unauthorized access"}, 403

        updates = TrackingUpdate.query.filter_by(parcel_id=parcel_id).all()
        return [u.to_dict() for u in updates], 200


class ParcelRating(Resource):
    @jwt_required()
    def post(self, parcel_id):
        if not parcel_id or not str(parcel_id).isdigit():
            return {'message': 'Invalid parcel ID'}, 400

        parcel = Parcel.query.get(parcel_id)
        if not parcel:
            return {'message': 'Parcel not found'}, 404

        current_user = get_jwt_identity()
        if not parcel.user or parcel.user.username != current_user:
            return {'message': 'Unauthorized access'}, 403

        if parcel.status != 'delivered':
            return {'message': 'Can only rate delivered parcels'}, 400

        data = request.get_json()
        if 'stars' not in data or not isinstance(data['stars'], int) or data['stars'] < 1 or data['stars'] > 5:
            return {'message': 'Invalid rating. Stars must be between 1 and 5'}, 400

        rating = Rating(
            parcel_id=parcel_id,
            stars=data['stars'],
            comment=data.get('comment', '')
        )
        db.session.add(rating)
        db.session.commit()
        return rating.to_dict(), 201


class DriverRating(Resource):
    @jwt_required()
    def post(self, driver_id):
        if not driver_id or not str(driver_id).isdigit():
            return {'message': 'Invalid driver ID'}, 400

        driver = Driver.query.get(driver_id)
        if not driver:
            return {'message': 'Driver not found'}, 404

        current_user = get_jwt_identity()
        user = User.query.filter_by(username=current_user).first()

        delivered_by_driver = Parcel.query.filter_by(
            user_id=user.id, 
            driver_id=driver_id,
            status='delivered'
        ).first()

        if not delivered_by_driver:
            return {'message': 'You can only rate drivers who have delivered your parcels'}, 403

        data = request.get_json()
        if 'stars' not in data or not isinstance(data['stars'], int) or data['stars'] < 1 or data['stars'] > 5:
            return {'message': 'Invalid rating. Stars must be between 1 and 5'}, 400

        rating = Rating(
            driver_id=driver_id,
            user_id=user.id,
            stars=data['stars'],
            comment=data.get('comment', '')
        )
        db.session.add(rating)
        db.session.commit()
        return rating.to_dict(), 201


class AdminAllParcels(Resource):
    @jwt_required()
    @admin_required
    def get(self):
        parcels = Parcel.query.all()
        return [p.to_dict() for p in parcels], 200


class AdminUsers(Resource):
    @jwt_required()
    @admin_required
    def get(self):
        users = User.query.all()
        return [u.to_dict() for u in users], 200


class AdminRatings(Resource):
    @jwt_required()
    @admin_required
    def get(self):
        ratings = Rating.query.all()
        return [r.to_dict() for r in ratings], 200


class AdminTrackingUpdates(Resource):
    @jwt_required()
    @admin_required
    def post(self, parcel_id):
        if not parcel_id or not str(parcel_id).isdigit():
            return {'message': 'Invalid parcel ID'}, 400

        parcel = Parcel.query.get(parcel_id)
        if not parcel:
            return {'message': 'Parcel not found'}, 404

        data = request.get_json()
        if not data or 'location' not in data or 'status' not in data:
            return {'message': 'Missing required fields: location, status'}, 400

        update = TrackingUpdate(
            parcel_id=parcel_id,
            location=data['location'],
            status=data['status']
        )

        parcel.status = data['status']
        parcel.present_location = data['location']

        db.session.add(update)
        db.session.commit()
        return update.to_dict(), 201


class DriverDetail(Resource):
    @jwt_required()
    def get(self, driver_id):
        if not driver_id or not str(driver_id).isdigit():
            return {'message': 'Invalid driver ID'}, 400

        driver = Driver.query.get(driver_id)
        if not driver:
            return {'message': 'Driver not found'}, 404

        return driver.to_dict(), 200

    @jwt_required()
    @admin_required
    def patch(self, driver_id):
        if not driver_id or not str(driver_id).isdigit():
            return {'message': 'Invalid driver ID'}, 400

        driver = Driver.query.get(driver_id)
        if not driver:
            return {'message': 'Driver not found'}, 404

        data = request.get_json()
        if not data:
            return {'message': 'No data provided'}, 400

        driver.name = data.get('name', driver.name)
        driver.phone_number = data.get('phone_number', driver.phone_number)
        db.session.commit()
        return driver.to_dict(), 200

    @jwt_required()
    @admin_required
    def delete(self, driver_id):
        if not driver_id or not str(driver_id).isdigit():
            return {'message': 'Invalid driver ID'}, 400

        driver = Driver.query.get(driver_id)
        if not driver:
            return {'message': 'Driver not found'}, 404

        assigned_parcels = Parcel.query.filter_by(driver_id=driver_id).filter(
            Parcel.status.in_(['pending', 'in_transit'])
        ).first()

        if assigned_parcels:
            return {'message': 'Cannot delete driver with active parcels'}, 400

        db.session.delete(driver)
        db.session.commit()
        return {'message': 'Driver deleted successfully'}, 200