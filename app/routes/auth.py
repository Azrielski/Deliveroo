from flask import Blueprint, request, jsonify, current_app
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
from app.utils.helpers import generate_verification_token

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

        # Hash the password before saving
        hashed_password = generate_password_hash(validated_data['password'])

        # Generate verification token
        token = generate_verification_token()

        # Create new user (default is_active=False)
        new_user = User(
            username=validated_data['username'],
            email=validated_data['email'],
            password_hash=hashed_password,
            verification_token=token,
            token_expiry=datetime.utcnow() + timedelta(hours=24),
            is_active=False
        )

        db.session.add(new_user)
        db.session.commit()

        # Send verification email
        try:
            send_verification_email(new_user.email, token)
        except Exception as e:
            current_app.logger.error(f"Failed to send verification email: {e}")

        return jsonify({
            'message': 'User registered successfully. Please check your email to verify your account.',
            'user_id': new_user.id
        }), 201

    except Exception as e:
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
            return jsonify({'message': 'If your email is registered, you will receive a password reset link'}), 200

        # Generate reset token
        token = generate_verification_token()
        user.verification_token = token
        user.token_expiry = datetime.utcnow() + timedelta(hours=1)
        db.session.commit()

        # Send password reset email
        success = send_password_reset_email(user.email, token)

        if not success:
            current_app.logger.error(f"Failed to send password reset email to {user.email}")
        
        return jsonify({'message': 'If your email is registered, you will receive a password reset link'}), 200
    except Exception as e:
        current_app.logger.error(f"Error during password reset request: {e}")
        return jsonify({'message': 'An error occurred during password reset request'}), 500


# Reset password
@auth_bp.route('/password-reset/<token>', methods=['POST'])
@validate_json(PasswordResetSchema)
def reset_password(token, validated_data):
    try:
        # Find user with this token
        user = User.query.filter_by(verification_token=token).first()

        if not user:
            return jsonify({'message': 'Invalid or expired token'}), 400

        # Check if token is expired
        if user.token_expiry < datetime.utcnow():
            return jsonify({'message': 'Password reset link has expired'}), 400

        # Update password
        user.password_hash = generate_password_hash(validated_data['password'])
        user.verification_token = None
        user.token_expiry = None
        db.session.commit()

        return jsonify({'message': 'Password updated successfully'}), 200
    except Exception as e:
        current_app.logger.error(f"Error during password reset: {e}")
        return jsonify({'message': 'An error occurred during password reset'}), 500


# Resend verification email
@auth_bp.route('/resend-verification', methods=['POST'])
@validate_json(PasswordResetRequestSchema)
def resend_verification(validated_data):
    try:
        user = User.query.filter_by(email=validated_data['email']).first()
        
        if not user:
            return jsonify({'message': 'If your email is registered, you will receive a verification link'}), 200
            
        if user.is_active:
            return jsonify({'message': 'This account is already verified'}), 400
            
        # Generate new verification token
        token = generate_verification_token()
        user.verification_token = token
        user.token_expiry = datetime.utcnow() + timedelta(hours=24)
        db.session.commit()
        
        # Send verification email
        success = send_verification_email(user.email, token)
        
        return jsonify({'message': 'If your email is registered, you will receive a verification link'}), 200
    except Exception as e:
        current_app.logger.error(f"Error during resend verification: {e}")
        return jsonify({'message': 'An error occurred during resend verification'}), 500
