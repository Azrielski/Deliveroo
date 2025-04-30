from flask import request, jsonify
from flask_restful import Resource, abort
from werkzeug.exceptions import BadRequest
from flask_jwt_extended import jwt_required, get_jwt_identity

from models import db, User, Parcel, TrackingUpdate, Rating ,Driver

def get_user_or_404(user_id):
    user = User.query.get(user_id)
    if not user:
        abort(404, message=f"User with id {user_id} not found")
    return user

def is_owner_or_admin(user_id):
    current_user_id = get_jwt_identity()
    if current_user_id != user_id:
        current_user = get_user_or_404(current_user_id)
        if not current_user.is_admin:
            raise BadRequest("You can only modify your own data or must be admin")
    return True

class UsersResource(Resource):
    def get(self):
        users = User.query.all()
        return jsonify({
            "status": "success",
            "message": "Users fetched successfully",
            "data": [{
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "is_admin": user.is_admin,
                "is_driver": user.is_driver
            } for user in users]
        }), 200

class UserResource(Resource):
    def get(self, id):
        user = get_user_or_404(id)
        return jsonify({
            "status": "success",
            "message": f"User {user.username} fetched successfully",
            "data": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "is_admin": user.is_admin,
                "is_driver": user.is_driver
            }
        }), 200

    @jwt_required()
    def delete(self, id):
        user = get_user_or_404(id)
        is_owner_or_admin(id)
        db.session.delete(user)
        db.session.commit()
        return jsonify({
            "status": "success",
            "message": f"User {user.username} deleted successfully"
        }), 200

class DriversResource(Resource):
    @jwt_required()
    def get(self):
        drivers = User.query.filter_by(is_driver=True).all()
        return jsonify({
            "status": "success",
            "message": "Drivers fetched successfully",
            "data": [{
                "id": d.id,
                "username": d.username,
                "email": d.email
            } for d in drivers]
        }), 200

    @jwt_required()
    def post(self):
        current_user = get_user_or_404(get_jwt_identity())
        if not current_user.is_admin:
            abort(403, message="Only admins can assign driver roles")

        data = request.get_json()
        try:
            user = get_user_or_404(data['user_id'])
            user.is_driver = True
            db.session.commit()
            return jsonify({
                "status": "success",
                "message": f"User {user.username} assigned as driver"
            }), 201
        except KeyError:
            raise BadRequest("Missing 'user_id' in the request body")

class ParcelsResource(Resource):
    @jwt_required()
    def get(self):
        parcels = Parcel.query.all()
        return jsonify({
            "status": "success",
            "message": "Parcels fetched successfully",
            "data": [{
                "id": p.id,
                "description": p.description,
                "weight": p.weight,
                "destination": p.destination,
                "status": p.status,
                "user_id": p.user_id,
                "driver_id": p.driver_id
            } for p in parcels]
        }), 200

    @jwt_required()
    def post(self):
        data = request.get_json()
        try:
            parcel = Parcel(
                description=data['description'],
                weight=data['weight'],
                destination=data['destination'],
                status=data.get('status', 'Pending'),
                user_id=data['user_id']
            )
            db.session.add(parcel)
            db.session.commit()
            return jsonify({
                "status": "success",
                "message": f"Parcel {parcel.description} created",
                "id": parcel.id
            }), 201
        except KeyError as e:
            raise BadRequest(f"Missing field: {e.args[0]}")

class ParcelResource(Resource):
    @jwt_required()
    def get(self, id):
        p = Parcel.query.get_or_404(id)
        return jsonify({
            "status": "success",
            "message": f"Parcel {p.id} fetched successfully",
            "data": {
                "id": p.id,
                "description": p.description,
                "weight": p.weight,
                "destination": p.destination,
                "status": p.status,
                "user_id": p.user_id,
                "driver_id": p.driver_id
            }
        }), 200

    @jwt_required()
    def put(self, id):
        data = request.get_json()
        p = Parcel.query.get_or_404(id)
        is_owner_or_admin(p.user_id)

        p.description = data.get('description', p.description)
        p.weight = data.get('weight', p.weight)
        p.destination = data.get('destination', p.destination)
        p.status = data.get('status', p.status)
        if 'driver_id' in data:
            p.driver_id = data['driver_id']

        db.session.commit()
        return jsonify({
            "status": "success",
            "message": f"Parcel {p.id} updated successfully"}), 200

    @jwt_required()
    def delete(self, id):
        p = Parcel.query.get_or_404(id)
        is_owner_or_admin(p.user_id)
        db.session.delete(p)
        db.session.commit()
        return jsonify({
            "status": "success",
            "message": f"Parcel {p.id} deleted successfully"}), 204

class TrackingUpdatesResource(Resource):
    @jwt_required()
    def get(self):
        updates = TrackingUpdate.query.all()
        return jsonify({
            "status": "success",
            "message": "Tracking updates fetched successfully",
            "data": [{
                "id": u.id,
                "update_text": u.update_text,
                "timestamp": u.timestamp.isoformat(),
                "parcel_id": u.parcel_id
            } for u in updates]
        }), 200

    @jwt_required()
    def post(self):
        data = request.get_json()
        try:
            update = TrackingUpdate(
                update_text=data['update_text'],
                parcel_id=data['parcel_id']
            )
            db.session.add(update)
            db.session.commit()
            return jsonify({
                "status": "success",
                "message": "Tracking update added",
                "id": update.id
            }), 201
        except KeyError as e:
            raise BadRequest(f"Missing field: {e.args[0]}")

class TrackingUpdateResource(Resource):
    @jwt_required()
    def get(self, id):
        u = TrackingUpdate.query.get_or_404(id)
        return jsonify({
            "status": "success",
            "message": f"Tracking update {u.id} fetched successfully",
            "data": {
                "id": u.id,
                "update_text": u.update_text,
                "timestamp": u.timestamp.isoformat(),
                "parcel_id": u.parcel_id
            }
        }), 200

    @jwt_required()
    def put(self, id):
        u = TrackingUpdate.query.get_or_404(id)
        data = request.get_json()
        u.update_text = data.get('update_text', u.update_text)
        db.session.commit()
        return jsonify({
            "status": "success",
            "message": f"Tracking update {u.id} updated"
        }), 200

    @jwt_required()
    def delete(self, id):
        u = TrackingUpdate.query.get_or_404(id)
        db.session.delete(u)
        db.session.commit()
        return jsonify({
            "status": "success",
            "message": f"Tracking update {u.id} deleted"
        }), 204

class RatingsResource(Resource):
    @jwt_required()
    def get(self):
        ratings = Rating.query.all()
        return jsonify({
            "status": "success",
            "message": "Ratings fetched successfully",
            "data": [{
                "id": r.id,
                "stars": r.stars,
                "feedback": r.feedback,
                "parcel_id": r.parcel_id,
                "user_id": r.user_id
            } for r in ratings]
        }), 200

    @jwt_required()
    def post(self):
        data = request.get_json()
        try:
            rating = Rating(
                stars=data['stars'],
                feedback=data.get('feedback'),
                parcel_id=data['parcel_id'],
                user_id=data['user_id']
            )
            db.session.add(rating)
            db.session.commit()
            return jsonify({
                "status": "success",
                "message": "Rating added",
                "id": rating.id
            }), 201
        except KeyError as e:
            raise BadRequest(f"Missing field: {e.args[0]}")

class RatingResource(Resource):
    @jwt_required()
    def get(self, id):
        r = Rating.query.get_or_404(id)
        return jsonify({
            "status": "success",
            "message": f"Rating {r.id} fetched successfully",
            "data": {
                "id": r.id,
                "stars": r.stars,
                "feedback": r.feedback,
                "parcel_id": r.parcel_id,
                "user_id": r.user_id
            }
        }), 200

    @jwt_required()
    def put(self, id):
        r = Rating.query.get_or_404(id)
        data = request.get_json()
        r.stars = data.get('stars', r.stars)
        r.feedback = data.get('feedback', r.feedback)
        db.session.commit()
        return jsonify({
            "status": "success",
            "message": f"Rating {r.id} updated"
        }), 200

    @jwt_required()
    def delete(self, id):
        r = Rating.query.get_or_404(id)
        db.session.delete(r)
        db.session.commit()
        return jsonify({
            "status": "success",
            "message": f"Rating {r.id} deleted"
        }), 204

def register_routes(api):
    api.add_resource(UsersResource, '/users')
    api.add_resource(UserResource, '/users/<int:id>')
    api.add_resource(DriversResource, '/drivers')
    api.add_resource(ParcelsResource, '/parcels')
    api.add_resource(ParcelResource, '/parcels/<int:id>')
    api.add_resource(TrackingUpdatesResource, '/tracking')
    api.add_resource(TrackingUpdateResource, '/tracking/<int:id>')
    api.add_resource(RatingsResource, '/ratings')
    api.add_resource(RatingResource, '/ratings/<int:id>')
