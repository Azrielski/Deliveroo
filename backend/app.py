from flask import Flask
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from resources import (
    UserRegister, UserDetail, UserParcels, ParcelDetail, ParcelTracking, 
    ParcelRating, DriverRating, ParcelPayment, AdminAllParcels, AdminUsers, 
    AdminRatings, AdminTrackingUpdates, DriverDetail
)
from helpers import admin_required

app = Flask(__name__)
CORS(app)  # Enabling Cross-Origin Resource Sharing (CORS)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///delivery.db'  
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'Group_11' 
api = Api(app)
db = SQLAlchemy(app)
jwt = JWTManager(app)

# Registering the resources with their endpoints
api.add_resource(UserRegister, '/register')
api.add_resource(UserDetail, '/user')
api.add_resource(UserParcels, '/user/parcels')
api.add_resource(ParcelDetail, '/parcel/<int:parcel_id>')
api.add_resource(ParcelTracking, '/parcel/<int:parcel_id>/tracking')
api.add_resource(ParcelRating, '/parcel/<int:parcel_id>/rating')
api.add_resource(DriverRating, '/driver/<int:driver_id>/rating')
api.add_resource(ParcelPayment, '/parcel/<int:parcel_id>/payment')
api.add_resource(AdminAllParcels, '/admin/parcels')
api.add_resource(AdminUsers, '/admin/users')
api.add_resource(AdminRatings, '/admin/ratings')
api.add_resource(AdminTrackingUpdates, '/admin/parcel/<int:parcel_id>/tracking')
api.add_resource(DriverDetail, '/driver/<int:driver_id>')

# Initialize the database
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)
