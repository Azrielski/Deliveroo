# helpers.py

from werkzeug.exceptions import BadRequest, NotFound
from models import User, Parcel, Payment
import logging

def send_notification(user_id, message):
    # This function sends notifications to the user (via email, SMS, etc.).
    # Here i'll just print the notification for simplicity.
    user = User.query.get(user_id)
    if not user:
        raise NotFound("User not found.")
    
    #  a mock of the actual notification system.
    #  replace this with an actual email/SMS service.
    print(f"Notification sent to {user.username}: {message}")
    # Example: send_email(user.email, message)
    # Example: send_sms(user.phone_number, message)

def validate_parcel_data(data):
    required_fields = ['origin', 'destination', 'weight', 'size', 'status', 'driver_id']

    # Checking if all required fields are present
    for field in required_fields:
        if field not in data:
            raise BadRequest(f"Missing required field: {field}")
    
    # Checking if the weight is a positive number
    if not isinstance(data.get('weight'), (int, float)) or data['weight'] <= 0:
        raise BadRequest("Weight must be a positive number.")
    
    # Check if size is a positive number
    if not isinstance(data.get('size'), (int, float)) or data['size'] <= 0:
        raise BadRequest("Size must be a positive number.")
    
    # Ensuring  the status is valid 
    valid_statuses = ['Created', 'In Transit', 'Delivered', 'Cancelled']
    if data['status'] not in valid_statuses:
        raise BadRequest(f"Invalid status. Valid statuses are: {', '.join(valid_statuses)}.")

def process_payment(payment_data):
    # Simulate processing a payment (e.g., call to a payment gateway API)
    if payment_data.get('amount') <= 0:
        return None  # Payment failed if amount is invalid
    return {"status": "success", "amount": payment_data['amount'], "transaction_id": "1234567890"}  # Mock payment success
