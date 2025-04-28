from flask import request, jsonify
from flask_restful import Resource, abort
from werkzeug.exceptions import BadRequest
from flask_jwt_extended import jwt_required, get_jwt_identity

from models import db, User, Parcel, TrackingUpdate, Rating

def get_user_or_404(user_id):
    user = User.query.get(user_id)
    if not user:
        abort(404, message=f"User with id {user_id} not found")
    return user

def is_owner_or_admin(user_id):
    current_user_id = get_jwt_identity()
    if current_user_id != user_id:
        user = get_user_or_404(user_id)
        if not user.is_admin:
            raise BadRequest("You can only modify your own data or admin data")
    return True

class UsersResource(Resource):
    def get(self):
        users = User.query.all()
        if users:
            return [{
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "is_admin": user.is_admin
            } for user in users], 200
        return {"message": "No users found"}, 404

class UserResource(Resource):
    def get(self, id):
        user = get_user_or_404(id)
        return {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "is_admin": user.is_admin
        }, 200

    @jwt_required()
    def delete(self, id):
        user = get_user_or_404(id)
        is_owner_or_admin(id)
        db.session.delete(user)
        db.session.commit()
        return {"message": f"User {user.username} deleted successfully"}, 204

class ParcelsResource(Resource):
    @jwt_required()
    def get(self):
        parcels = Parcel.query.all()
        if parcels:
            return [{
                "id": p.id,
                "description": p.description,
                "weight": p.weight,
                "destination": p.destination,
                "status": p.status,
                "user_id": p.user_id
            } for p in parcels], 200
        return {"message": "No parcels found"}, 404

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
        except KeyError as e:
            raise BadRequest(f"Missing field: {e.args[0]}")
        db.session.add(parcel)
        db.session.commit()
        return {"message": f"Parcel {parcel.description} created", "id": parcel.id}, 201

class ParcelResource(Resource):
    @jwt_required()
    def get(self, id):
        p = Parcel.query.get_or_404(id)
        return {
            "id": p.id,
            "description": p.description,
            "weight": p.weight,
            "destination": p.destination,
            "status": p.status,
            "user_id": p.user_id
        }, 200

    @jwt_required()
    def put(self, id):
        data = request.get_json()
        p = Parcel.query.get_or_404(id)
        is_owner_or_admin(p.user_id)

        p.description = data.get('description', p.description)
        p.weight = data.get('weight', p.weight)
        p.destination = data.get('destination', p.destination)
        p.status = data.get('status', p.status)

        db.session.commit()
        return {"message": f"Parcel {p.id} updated successfully"}, 200

    @jwt_required()
    def delete(self, id):
        p = Parcel.query.get_or_404(id)
        is_owner_or_admin(p.user_id)

        db.session.delete(p)
        db.session.commit()
        return {"message": f"Parcel {p.id} deleted successfully"}, 204

class TrackingUpdatesResource(Resource):
    @jwt_required()
    def get(self):
        updates = TrackingUpdate.query.all()
        if updates:
            return [{
                "id": u.id,
                "update_text": u.update_text,
                "timestamp": u.timestamp.isoformat(),
                "parcel_id": u.parcel_id
            } for u in updates], 200
        return {"message": "No tracking updates found"}, 404

    @jwt_required()
    def post(self):
        data = request.get_json()
        try:
            update = TrackingUpdate(
                update_text=data['update_text'],
                parcel_id=data['parcel_id']
            )
        except KeyError as e:
            raise BadRequest(f"Missing field: {e.args[0]}")
        db.session.add(update)
        db.session.commit()
        return {"message": f"Tracking update for parcel {update.parcel_id} added", "id": update.id}, 201

class TrackingUpdateResource(Resource):
    @jwt_required()
    def get(self, id):
        u = TrackingUpdate.query.get_or_404(id)
        return {
            "id": u.id,
            "update_text": u.update_text,
            "timestamp": u.timestamp.isoformat(),
            "parcel_id": u.parcel_id
        }, 200

    @jwt_required()
    def put(self, id):
        data = request.get_json()
        u = TrackingUpdate.query.get_or_404(id)
        u.update_text = data.get('update_text', u.update_text)
        db.session.commit()
        return {"message": f"Tracking update for parcel {u.parcel_id} updated"}, 200

    @jwt_required()
    def delete(self, id):
        u = TrackingUpdate.query.get_or_404(id)
        db.session.delete(u)
        db.session.commit()
        return {"message": f"Tracking update for parcel {u.parcel_id} deleted"}, 204

class RatingsResource(Resource):
    @jwt_required()
    def get(self):
        ratings = Rating.query.all()
        if ratings:
            return [{
                "id": r.id,
                "stars": r.stars,
                "feedback": r.feedback,
                "parcel_id": r.parcel_id,
                "user_id": r.user_id
            } for r in ratings], 200
        return {"message": "No ratings found"}, 404

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
        except KeyError as e:
            raise BadRequest(f"Missing field: {e.args[0]}")
        db.session.add(rating)
        db.session.commit()
        return {"message": f"Rating for parcel {rating.parcel_id} added", "id": rating.id}, 201

class RatingResource(Resource):
    @jwt_required()
    def get(self, id):
        r = Rating.query.get_or_404(id)
        return {
            "id": r.id,
            "stars": r.stars,
            "feedback": r.feedback,
            "parcel_id": r.parcel_id,
            "user_id": r.user_id
        }, 200

    @jwt_required()
    def put(self, id):
        data = request.get_json()
        r = Rating.query.get_or_404(id)
        r.stars = data.get('stars', r.stars)
        r.feedback = data.get('feedback', r.feedback)
        db.session.commit()
        return {"message": f"Rating {r.id} updated"}, 200

    @jwt_required()
    def delete(self, id):
        r = Rating.query.get_or_404(id)
        db.session.delete(r)
        db.session.commit()
        return {"message": f"Rating {r.id} deleted"}, 204

def register_routes(api):
    api.add_resource(UsersResource, '/users')
    api.add_resource(UserResource, '/users/<int:id>')
    api.add_resource(ParcelsResource, '/parcels')
    api.add_resource(ParcelResource, '/parcels/<int:id>')
    api.add_resource(TrackingUpdatesResource, '/tracking')
    api.add_resource(TrackingUpdateResource, '/tracking/<int:id>')
    api.add_resource(RatingsResource, '/ratings')
    api.add_resource(RatingResource, '/ratings/<int:id>')
