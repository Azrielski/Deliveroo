from flask import Flask, request
from models import db, Parcel
from flask_restful import Api, Resource, abort
from flask_cors import CORS
from flask_migrate import Migrate

app = Flask(__name__)
# Configure CORS with specific settings
CORS(app,
     supports_credentials=True,
     resources={
         r"/parcels*": {
             "origins": ["http://localhost:5173"],
             "methods": ["GET", "POST", "PATCH", "OPTIONS"],
             "allow_headers": ["Content-Type", "Authorization"],
             "expose_headers": ["Content-Type"],
             "max_age": 600
         }
     })

# Add this after_request handler for additional headers
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,PATCH,OPTIONS')
    return response
api = Api(app)
app.config['SECRET_KEY'] = 'a9b7f8cbe34d4fd28b239872c88f199e'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
migrate = Migrate(app, db)


class ParcelList(Resource):
    def get(self):
        parcels = Parcel.query.all()
        return [p.to_dict() for p in parcels]

    def post(self):
        data = request.get_json()
        
        parcel = Parcel(
            weight=data['weight'],                
            description=data.get('description'),  
            pickup_address=data['pickup_address'],
            destination_address=data['destination_address'],
            status='pending',
            present_location=data['pickup_address'],
            pickup_lat=data.get('pickup_lat'),
            pickup_lon=data.get('pickup_lon'),
            destination_lat=data.get('destination_lat'),
            destination_lon=data.get('destination_lon')
        )
        db.session.add(parcel)
        db.session.commit()
        return {'id': parcel.id}, 201

class ParcelDetail(Resource):
    def get(self, parcel_id):
        parcel = Parcel.query.get_or_404(parcel_id)
        return parcel.to_dict()
    

    def patch(self, parcel_id):
        parcel = Parcel.query.get_or_404(parcel_id)
        if parcel.status in ('delivered', 'cancelled'):
            abort(400, message="Cannot modify delivered/cancelled parcel")
        data = request.get_json()
        for attr, value in data.items():
            if hasattr(parcel, attr):
                setattr(parcel, attr, value)
        db.session.commit()
        return {'message': 'Parcel updated'}
    
    def delete(self, parcel_id):
        parcel = Parcel.query.get(parcel_id)
        if not parcel:
            return {'message': 'Parcel not found'}, 404
        db.session.delete(parcel)
        db.session.commit()
        return {'message': 'Parcel deleted'}, 200



api.add_resource(ParcelList, '/parcels')
api.add_resource(ParcelDetail, '/parcels/<int:parcel_id>')

if __name__ == '__main__':
    app.run(debug=True)