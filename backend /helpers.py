from flask import jsonify
from datetime import datetime
from functools import wraps
from flask_jwt_extended import get_jwt_identity
from models import User, Driver,db

# --- Success Response Helper ---
def success_response(data, status_code=200):
    """Helper to return a successful response"""
    return jsonify({
        'status': 'success',
        'data': data
    }), status_code

# --- Error Response Helper ---
def error_response(message, status_code=400):
    """Helper to return an error response"""
    return jsonify({
        'status': 'error',
        'message': message
    }), status_code

# --- Check if the user is an admin ---
def admin_required(f):
    """Decorator to ensure the user is an admin"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        if user is None or not user.is_admin:
            return error_response('Admin privileges required', 403)
        return f(*args, **kwargs)
    return decorated_function

# --- Validate Required Fields ---
def validate_required_fields(data, required_fields):
    """Helper to validate if required fields are in the provided data"""
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        return error_response(f'Missing fields: {", ".join(missing_fields)}', 400)
    return None  # No error, return None

# --- Date Formatting Helper ---
def format_date(date_obj):
    """Helper to format date as string"""
    return date_obj.strftime('%Y-%m-%d %H:%M:%S') if date_obj else None

# --- Check if the parcel has a driver ---
def assign_driver_automatically(parcel):
    """Helper to automatically assign a driver if no driver is assigned yet"""
    if not parcel.driver_id:
        available_driver = Driver.query.filter_by(is_available=True).first()

        if available_driver:
            parcel.driver_id = available_driver.id
            available_driver.assigned_parcel = parcel.id
            db.session.commit()
            return available_driver
    return None

# --- Payment Validation Helper ---
def validate_payment(data):
    """Validate payment details before processing"""
    if 'amount' not in data or 'status' not in data:
        return error_response('Payment amount and status are required', 400)
    if data['status'] not in ['Pending', 'Completed', 'Failed']:
        return error_response('Invalid payment status', 400)
    return None  # No error, return None
