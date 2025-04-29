from flask import Blueprint, request, jsonify, current_app, url_for
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash
from models import User, db
from app.schemas.user_schema import (
    UserRegisterSchema,
    UserLoginSchema,
    PasswordResetRequestSchema,
    PasswordResetSchema,
    UserBaseSchema
)
from app.services.auth_service import generate_token, verify_token, blacklist_token
from app.services.email_service import send_verification_email, send_password_reset_email
from app.utils.decorators import token_required, validate_json
from app.utils.helpers import generate_secure_token
from sqlalchemy.exc import IntegrityError

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')


# Register route
@auth_bp.route('/register', methods=['POST'])
@validate_json(UserRegisterSchema)
def register(validated_data):
    try:
        # Ensure password and confirm_password match
        if validated_data['password'] != validated_data['confirm_password']:
            return jsonify({'message': 'Passwords do not match'}), 400

        # Check if user already exists
        if User.query.filter_by(email=validated_data['email']).first():
            return jsonify({'message': 'User already exists with this email'}), 409

    
        hashed_password = generate_password_hash(validated_data['password'])

        # Generate verification token
        token = generate_secure_token()

        # Create new user (default is_active=False)
        new_user = User(
            first_name=validated_data['first_name'],
            second_name=validated_data['second_name'],
            username=validated_data['username'],
            email=validated_data['email'],
            password_hash=hashed_password,
            verification_token=token,
            token_expiry=datetime.utcnow() + timedelta(hours=24),
            is_active=False
        )

        db.session.add(new_user)
        
        # Send verification email
        try:
            verification_url = url_for('auth.verify_email', token=token, _external=True)
            email_sent = send_verification_email(new_user.email, token)
            
            if not email_sent:
                current_app.logger.error(f"Failed to send verification email to {new_user.email}")
                db.session.rollback()  # Roll back if email fails
                return jsonify({'message': 'Registration failed due to email service issue'}), 500
                
            # Only commit if email was sent successfully
            db.session.commit()
            
            return jsonify({
                'message': 'User registered successfully. Please check your email to verify your account.',
                'user_id': new_user.id
            }), 201
            
        except Exception as e:
            db.session.rollback()
            current_app.logger.error(f"Failed to send verification email: {e}")
            return jsonify({'message': 'Registration failed due to email service issue'}), 500

    except IntegrityError:
        db.session.rollback()
        return jsonify({'message': 'Username or email already exists'}), 409
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Error during registration: {e}")
        return jsonify({'message': 'An error occurred during registration'}), 500


# Verify email
@auth_bp.route('/verify-email/<token>', methods=['GET'])
def verify_email(token):
    try:
        # Find user with this token
        user = User.query.filter_by(verification_token=token).first()

        if not user:
            return jsonify({'message': 'Invalid or expired verification token'}), 400

        # Check if token is expired
        if user.token_expiry < datetime.utcnow():
            return jsonify({'message': 'Verification link has expired'}), 400

        # Activate the user account
        user.is_active = True
        user.verification_token = None
        user.token_expiry = None
        db.session.commit()

        return jsonify({'message': 'Email verified successfully. You can now log in.'}), 200
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Error during email verification: {e}")
        return jsonify({'message': 'An error occurred during email verification'}), 500


# Login route
@auth_bp.route('/login', methods=['POST'])
@validate_json(UserLoginSchema)
def login(validated_data):
    try:
        user = User.query.filter_by(email=validated_data['email']).first()

        if not user or not user.check_password(validated_data['password']):
            return jsonify({'message': 'Invalid email or password'}), 401

        # Check if user account is active
        if not user.is_active:
            return jsonify({'message': 'Please verify your email before logging in'}), 401

        # Generate JWT token
        token = generate_token(user.id)

        return jsonify({
            'message': 'Login successful',
            'token': token,
            'user': UserBaseSchema().dump(user)
        }), 200
    except Exception as e:
        current_app.logger.error(f"Error during login: {e}")
        return jsonify({'message': 'An error occurred during login'}), 500


# Request password reset
@auth_bp.route('/password-reset-request', methods=['POST'])
@validate_json(PasswordResetRequestSchema)
def request_password_reset(validated_data):
    try:
        # Find user by email
        user = User.query.filter_by(email=validated_data['email']).first()

        if not user:
            # Return generic response for security
            return jsonify({'message': 'If your email is registered, you will receive a password reset link'}), 200

        # Generate reset token
        token = generate_secure_token()
        user.verification_token = token
        user.token_expiry = datetime.utcnow() + timedelta(hours=1)
        
        # Send password reset email
        reset_url = url_for('auth.reset_password_form', token=token, _external=True)
        email_sent = send_password_reset_email(user.email, token)

        if not email_sent:
            db.session.rollback()
            current_app.logger.error(f"Failed to send password reset email to {user.email}")
            # Still return success for security reasons
            return jsonify({'message': 'If your email is registered, you will receive a password reset link'}), 200
        
        db.session.commit()
        return jsonify({'message': 'If your email is registered, you will receive a password reset link'}), 200
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Error during password reset request: {e}")
        return jsonify({'message': 'An error occurred during password reset request'}), 500


# GET endpoint to render the password reset form (frontend will handle this)
@auth_bp.route('/password-reset/<token>', methods=['GET'])
def reset_password_form(token):
    # This endpoint would typically redirect to a frontend page that handles the reset
    # For API-only backends, this might redirect to a frontend URL
    return jsonify({'message': 'Please submit your new password', 'token': token}), 200


# Reset password (actual processing of the reset)
@auth_bp.route('/password-reset', methods=['POST'])
@validate_json(PasswordResetSchema)
def reset_password(validated_data):
    try:
        token = validated_data.get('token')
        if not token:
            return jsonify({'message': 'Token is required'}), 400
            
        # Find user with this token
        user = User.query.filter_by(verification_token=token).first()

        if not user:
            return jsonify({'message': 'Invalid or expired token'}), 400

        # Check if token is expired
        if user.token_expiry < datetime.utcnow():
            return jsonify({'message': 'Password reset link has expired'}), 400

        # Ensure password and confirm_password match
        if validated_data['password'] != validated_data.get('confirm_password', ''):
            return jsonify({'message': 'Passwords do not match'}), 400

        # Update password
        user.password_hash = generate_password_hash(validated_data['password'])
        user.verification_token = None
        user.token_expiry = None
        db.session.commit()

        return jsonify({'message': 'Password updated successfully'}), 200
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Error during password reset: {e}")
        return jsonify({'message': 'An error occurred during password reset'}), 500


# Resend verification email
@auth_bp.route('/resend-verification', methods=['POST'])
@validate_json(PasswordResetRequestSchema)
def resend_verification(validated_data):
    try:
        user = User.query.filter_by(email=validated_data['email']).first()
        
        if not user:
            # Return generic response for security
            return jsonify({'message': 'If your email is registered, you will receive a verification link'}), 200
            
        if user.is_active:
            return jsonify({'message': 'This account is already verified'}), 400
            
        # Generate new verification token
        token = generate_secure_token()
        user.verification_token = token
        user.token_expiry = datetime.utcnow() + timedelta(hours=24)
        
        # Send verification email
        verification_url = url_for('auth.verify_email', token=token, _external=True)
        email_sent = send_verification_email(user.email, token)
        
        if not email_sent:
            db.session.rollback()
            current_app.logger.error(f"Failed to send verification email to {user.email}")
            return jsonify({'message': 'If your email is registered, you will receive a verification link'}), 200
        
        db.session.commit()
        return jsonify({'message': 'If your email is registered, you will receive a verification link'}), 200
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Error during resend verification: {e}")
        return jsonify({'message': 'An error occurred during resend verification'}), 500


# Logout route
@auth_bp.route('/logout', methods=['POST'])
@token_required
def logout(current_user):
    try:
        # Get token from the Authorization header
        auth_header = request.headers.get('Authorization')
        if auth_header and auth_header.startswith('Bearer '):
            token = auth_header.split(' ')[1]
            blacklist_token(token)
            return jsonify({'message': 'Successfully logged out'}), 200
        
        return jsonify({'message': 'Token is missing'}), 401
    except Exception as e:
        current_app.logger.error(f"Error during logout: {e}")
        return jsonify({'message': 'An error occurred during logout'}), 500


# Helper function for generating secure tokens
def generate_secure_token():
    """
    Generate a secure random token for email verification or password reset.
    This replaces the imported generate_verification_token function.
    
    Returns:
        str: A secure random token
    """
    import secrets
    return secrets.token_urlsafe(32)  # Generate a 32-byte URL-safe token



