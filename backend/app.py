
import sys
sys.path.append("backend")

from app import create_app, mail  # Import the app factory and mail instance
from flask import request, current_app, render_template_string
from flask_mail import Message
from flask_cors import CORS  # Allow requests from all origins

from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager

from app.resources import (
    UserDetail, UserParcels, ParcelDetail, ParcelTracking, 
    ParcelRating, DriverRating, AdminAllParcels, AdminUsers, 
    AdminRatings, AdminTrackingUpdates, DriverDetail
)
from helpers import admin_required
from app import db
# Create the Flask app using the factory pattern
app = create_app()

 # Enabling Cross-Origin Resource Sharing (CORS)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:Marco2650@localhost:5432/deliveroo'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'bb7523de87660149c8e11db73e41bce56afbbe1ea1324a731c97c415b493911c'
api = Api(app)

jwt = JWTManager(app)


api.add_resource(UserDetail, '/user')
api.add_resource(UserParcels, '/user/parcels')
api.add_resource(ParcelDetail, '/parcel/<int:parcel_id>')
api.add_resource(ParcelTracking, '/parcel/<int:parcel_id>/tracking')
api.add_resource(ParcelRating, '/parcel/<int:parcel_id>/rating')
api.add_resource(DriverRating, '/driver/<int:driver_id>/rating')
# api.add_resource(ParcelPayment, '/parcel/<int:parcel_id>/payment')
api.add_resource(AdminAllParcels, '/admin/parcels')
api.add_resource(AdminUsers, '/admin/users')
api.add_resource(AdminRatings, '/admin/ratings')
api.add_resource(AdminTrackingUpdates, '/admin/parcel/<int:parcel_id>/tracking')
api.add_resource(DriverDetail, '/driver/<int:driver_id>')

# Initialize the database
with app.app_context():
    db.create_all()

# Corrected CORS setup
CORS(app, resources={r"/*": {"origins": "http://localhost:5174"}}, supports_credentials=True)

@app.route('/')
def index():
    return {"message": "Welcome to my website!"}


@app.route('/send-email', methods=['OPTIONS', 'POST'])
def send_email_api():
    """Handle preflight requests and send emails using the user's email"""
    if request.method == "OPTIONS":
        return {"message": "Preflight request successful"}, 200

    data = request.get_json()
    subject = data.get("subject")
    sender_email = data.get("sender_email")  # ✅ Use sender's email
    recipient = data.get("recipient")
    html_content = data.get("html_content")

    if not subject or not sender_email or not recipient or not html_content:
        return {"message": "Missing required fields"}, 400

    try:
        msg = Message(
            subject=subject,
            sender=sender_email,  
            recipients=[recipient],
            html=html_content
        )
        mail.send(msg)
        current_app.logger.info(f"Email sent from {sender_email} to {recipient}")
        return {"message": "Email sent successfully!"}, 200
    except Exception as e:
        current_app.logger.error(f"Error sending email: {str(e)}")
        return {"message": "Failed to send email."}, 500

@app.route('/send-verification-email', methods=['POST'])
def send_verification_email():
    """Endpoint to send verification email"""
    email = request.json.get('email')
    token = "sample-verification-token"
    subject = "Verify Your Deliveroo Account"
    verification_url = f"{request.host_url.rstrip('/')}/verify-email?token={token}"

    # Generate email HTML content dynamically
    html_content = render_template_string("""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Welcome to Deliveroo!</h2>
        <p>Thank you for signing up. Please verify your email address by clicking the link below:</p>
        <p><a href="{{ verification_url }}" style="display: inline-block; padding: 10px 20px; background-color: #00CCBC; color: white; text-decoration: none; border-radius: 5px;">Verify Email Address</a></p>
        <p>If the button doesn't work, copy and paste this URL into your browser:</p>
        <p>{{ verification_url }}</p>
        <p>This link will expire in 24 hours.</p>
        <p>Best regards,<br>The Deliveroo Team</p>
    </div>
    """, verification_url=verification_url)

    # Send the email
    try:
        msg = Message(
            subject=subject,
            recipients=[email],
            html=html_content,
            sender=current_app.config.get('MAIL_DEFAULT_SENDER')
        )
        mail.send(msg)
        current_app.logger.info(f"Verification email sent to {email}")
        return {"message": "Verification email sent successfully!"}, 200
    except Exception as e:
        current_app.logger.error(f"Error sending verification email: {str(e)}")
        return {"message": "Failed to send verification email."}, 500

@app.route('/send-password-reset-email', methods=['POST'])
def send_password_reset_email():
    """Endpoint to send password reset email"""
    email = request.json.get('email')  # Get recipient email from request body
    token = "sample-password-reset-token"  # Generate or retrieve a real token
    subject = "Reset Your Deliveroo Password"
    reset_url = f"{request.host_url.rstrip('/')}/reset-password?token={token}"

    # Generate email HTML content dynamically
    html_content = render_template_string("""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p>We received a request to reset your password. Click the link below to set a new password:</p>
        <p><a href="{{ reset_url }}" style="display: inline-block; padding: 10px 20px; background-color: #00CCBC; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a></p>
        <p>If the button doesn't work, copy and paste this URL into your browser:</p>
        <p>{{ reset_url }}</p>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request a password reset, you can ignore this email.</p>
        <p>Best regards,<br>The Deliveroo Team</p>
    </div>
    """, reset_url=reset_url)

    # Send the email
    try:
        msg = Message(
            subject=subject,
            recipients=[email],
            html=html_content,
            sender=current_app.config.get('MAIL_DEFAULT_SENDER')
        )
        mail.send(msg)
        current_app.logger.info(f"Password reset email sent to {email}")
        return {"message": "Password reset email sent successfully!"}, 200
    except Exception as e:
        current_app.logger.error(f"Error sending password reset email: {str(e)}")
        return {"message": "Failed to send password reset email."}, 500

if __name__ == '__main__':
    app.run(debug=True)
