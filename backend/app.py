from flask import Flask, request
from models import db, Parcel
from flask_restful import Api, Resource, abort
from flask_cors import CORS
from flask_migrate import Migrate

app = Flask(__name__)
CORS(app, supports_credentials=True)
api = Api(app)
app.config['SECRET_KEY'] = 'a9b7f8cbe34d4fd28b239872c88f199e'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
migrate = Migrate(app, db)


class UserParcels(Resource):
    def get(self):
        parcels = Parcel.query.all()
        return [p.to_dict() for p in parcels]

    def post(self):
        data = request.get_json()

        required_fields = ['weight', 'pickup_address', 'destination','description' ,'recipient_name', 'recipient_phone']
        for field in required_fields:
            if field not in data:
                return {'message': f'{field} is required.'}, 400
        
        new_parcel = Parcel(
            weight=data['weight'],                
            description=data['description'],  
            pickup_address=data['pickup_address'],
            destination=data['destination'],
            status='pending',
            pickup_lat=data.get('pickup_lat'),
            pickup_lon=data.get('pickup_lon'),
            destination_lat=data.get('destination_lat'),
            destination_lon=data.get('destination_lon'),
            recipient_name =data['recipient_name'],
            recipient_phone=data['recipient_phone'],
            
        )
        db.session.add(new_parcel)
        db.session.commit()
        return {'id': new_parcel.id}, 201

class ParcelDetail(Resource):
    def get(self, parcel_id):
        parcel = Parcel.query.get(parcel_id)
        if not parcel:
            return {'message': 'Parcel not found'}, 404
        return parcel.to_dict(), 200

    
    def patch(self, parcel_id):
        parcel = Parcel.query.get(parcel_id)
        if not parcel:
            return {'message': 'Parcel not found'}, 404
        if parcel.status in ('delivered', 'cancelled'):
            abort(400, message ='Cannot modify delivered/cancelled parcel')

        data = request.get_json()
        for attr, value in data.items():
            if hasattr(parcel, attr):
                setattr(parcel, attr, value)
        db.session.commit()
        return parcel.to_dict(), 200

   
    def delete(self, parcel_id):
        parcel = Parcel.query.get(parcel_id)
        if not parcel:
            return {'message': 'Parcel not found'}, 404
        db.session.delete(parcel)
        db.session.commit()
        return {'message': 'Parcel deleted'}, 200



api.add_resource(UserParcels, '/user/parcels')
api.add_resource(ParcelDetail, '/parcels/<int:parcel_id>')
if __name__ == '__main__':
    app.run(debug=True)