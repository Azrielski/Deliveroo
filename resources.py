from flask import request, jsonify
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, User, Parcel, TrackingUpdate, Rating, Driver
from helpers import assign_driver_automatically, admin_required


class UserRegister(Resource):
    def post(self):
        data = request.get_json()
        if User.query.filter_by(username=data['username']).first():
            return {'message': 'Username already exists'}, 409
        user = User(**data)
        db.session.add(user)
        db.session.commit()
        return {'message': 'User created successfully'}, 201

# USER CRUD 
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
        user.username = data['username'] if 'username' in data else user.username
        user.email = data['email'] if 'email' in data else user.email
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

#  USER PARCEL CRUD 
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
        new_parcel = Parcel(
            origin=data['origin'],
            user_id=user.id,
            payment_status='pending',  # initially set to pending
            status='pending',
            weight=data ['weight'] ,
                      
            description=data.get('description'),  
            pickup_address=data['pickup_address'],
            destination_address=data['destination_address'],
    
            present_location=data['pickup_address'],
            pickup_lat=data.get('pickup_lat'),
            pickup_lon=data.get('pickup_lon'),
            destination_lat=data.get('destination_lat'),
            destination_lon=data.get('destination_lon') # initially set to pending
        )
        # Assigning a driver automatically when the parcel is created
        new_parcel.driver_id = assign_driver_automatically()

        db.session.add(new_parcel)
        db.session.commit()
        return new_parcel.to_dict(), 201

class ParcelDetail(Resource):
    @jwt_required()
    def get(self, parcel_id):
        parcel = Parcel.query.get(parcel_id)
        if not parcel:
            return {'message': 'Parcel not found'}, 404
        return  {
            'description':parcel.description,
            'pickup_address': parcel.pickup_address,
            'destination_address': parcel.destination_address,
            'present_location': parcel.present_location,
            'status': parcel.status,
            'pickup_lat': parcel.pickup_lat,
            'pickup_lon': parcel.pickup_lon,
            'destination_lat': parcel.destination_lat,
            'destination_lon': parcel.destination_lon
        },200

    @jwt_required()
    def put(self, parcel_id):
        parcel = Parcel.query.get(parcel_id)
        if not parcel:

            return {'message': 'Parcel not found'}, 404
            if parcel.status in ('delivered', 'cancelled'):
               abort(400, message="Cannot modify delivered/cancelled parcel")

        data = request.get_json()
        if 'destination' in data:
            parcel.destination = data['destination']
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

#  TRACKING 
class ParcelTracking(Resource):
    @jwt_required()
    def get(self, parcel_id):
        current_user = get_jwt_identity()
        parcel = Parcel.query.get(parcel_id)
        if not parcel:
            return {'message': 'Parcel not found'}, 404
        if parcel.user_id != current_user:
            return {'message': 'You can only track your own parcels'}, 403
        updates = TrackingUpdate.query.filter_by(parcel_id=parcel_id).all()
        return jsonify([u.to_dict() for u in updates])

# RATING 
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

#  DRIVER RATING 
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

# # PAYMENT 
# class ParcelPayment(Resource):
#     @jwt_required()
#     def post(self, parcel_id):
#         current_user = get_jwt_identity()
#         parcel = Parcel.query.get(parcel_id)

#         if not parcel:
#             return {'message': 'Parcel not found'}, 404
#         if parcel.user_id != current_user:
#             return {'message': 'You can only pay for your own parcels'}, 403
        
#         data = request.get_json()

#         # If the parcel is being paid before delivery (upfront)
#         if parcel.payment_status == 'pending':
#             payment = Payment(
#                 parcel_id=parcel.id,
#                 amount=data['amount'],
#                 status='paid'  # Automatically mark as paid when the user pays upfront
#             )
#             db.session.add(payment)
#             db.session.commit()

#             parcel.payment_status = 'paid'  # Change the parcel's payment status to 'paid'
#             db.session.commit()
            
#             return {'message': 'Payment successful, parcel is now paid', 'payment': payment.to_dict()}, 201

#         # If the parcel is paid on delivery (and is already delivered)
#         elif parcel.payment_status == 'delivered' and parcel.delivery_status == 'delivered':
#             payment = Payment(
#                 parcel_id=parcel.id,
#                 amount=data['amount'],
#                 status='paid'  # Mark the payment as paid when the parcel is delivered
#             )
#             db.session.add(payment)
#             db.session.commit()

#             parcel.payment_status = 'paid'
#             db.session.commit()

#             return {'message': 'Payment successful, parcel has been delivered', 'payment': payment.to_dict()}, 201

#         return {'message': 'Payment not allowed for this parcel state'}, 400

# ADMIN DASHBOARD 
class AdminAllParcels(Resource):
    @jwt_required()
    @admin_required
    def get(self):
        parcels = Parcel.query.all()
        return jsonify([p.to_dict() for p in parcels])

class AdminUsers(Resource):
    @jwt_required()
    @admin_required
    def get(self):
        users = User.query.all()
        return jsonify([u.to_dict() for u in users])

class AdminRatings(Resource):
    @jwt_required()
    @admin_required
    def get(self):
        ratings = Rating.query.all()
        return jsonify([r.to_dict() for r in ratings])

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

#  DRIVER CRUD
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
        driver.name = data['name'] if 'name' in data else driver.name
        driver.phone_number = data['phone_number'] if 'phone_number' in data else driver.phone_number
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
