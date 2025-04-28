# from app import create_app, mail  # Import the app factory and mail instance
# from flask import request, current_app, render_template_string
# from flask_mail import Message

# # Create the Flask app using the factory pattern
# app = create_app()

# @app.route('/')
# def index():
#     return {"message": "Welcome to my website!"}

# @app.route('/send-verification-email', methods=['POST'])
# def send_verification_email():
#     """Endpoint to send verification email"""
#     email = request.json.get('email')  
#     token = "sample-verification-token"  
#     subject = "Verify Your Deliveroo Account"
#     verification_url = f"{request.host_url.rstrip('/')}/verify-email?token={token}"

#     # Generate email HTML content dynamically
#     html_content = render_template_string("""
#     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
#         <h2 style="color: #333;">Welcome to Deliveroo!</h2>
#         <p>Thank you for signing up. Please verify your email address by clicking the link below:</p>
#         <p><a href="{{ verification_url }}" style="display: inline-block; padding: 10px 20px; background-color: #00CCBC; color: white; text-decoration: none; border-radius: 5px;">Verify Email Address</a></p>
#         <p>If the button doesn't work, copy and paste this URL into your browser:</p>
#         <p>{{ verification_url }}</p>
#         <p>This link will expire in 24 hours.</p>
#         <p>Best regards,<br>The Deliveroo Team</p>
#     </div>
#     """, verification_url=verification_url)

#     # Send the email
#     try:
#         msg = Message(
#             subject=subject,
#             recipients=[email],
#             html=html_content,
#             sender=current_app.config.get('MAIL_DEFAULT_SENDER')
#         )
#         mail.send(msg)
#         current_app.logger.info(f"Verification email sent to {email}")
#         return {"message": "Verification email sent successfully!"}, 200
#     except Exception as e:
#         current_app.logger.error(f"Error sending verification email: {str(e)}")
#         return {"message": "Failed to send verification email."}, 500

# @app.route('/send-password-reset-email', methods=['POST'])
# def send_password_reset_email():
#     """Endpoint to send password reset email"""
#     email = request.json.get('email')  # Get recipient email from request body
#     token = "sample-password-reset-token"  # Generate or retrieve a real token
#     subject = "Reset Your Deliveroo Password"
#     reset_url = f"{request.host_url.rstrip('/')}/reset-password?token={token}"

#     # Generate email HTML content dynamically
#     html_content = render_template_string("""
#     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
#         <h2 style="color: #333;">Password Reset Request</h2>
#         <p>We received a request to reset your password. Click the link below to set a new password:</p>
#         <p><a href="{{ reset_url }}" style="display: inline-block; padding: 10px 20px; background-color: #00CCBC; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a></p>
#         <p>If the button doesn't work, copy and paste this URL into your browser:</p>
#         <p>{{ reset_url }}</p>
#         <p>This link will expire in 1 hour.</p>
#         <p>If you didn't request a password reset, you can ignore this email.</p>
#         <p>Best regards,<br>The Deliveroo Team</p>
#     </div>
#     """, reset_url=reset_url)

#     # Send the email
#     try:
#         msg = Message(
#             subject=subject,
#             recipients=[email],
#             html=html_content,
#             sender=current_app.config.get('MAIL_DEFAULT_SENDER')
#         )
#         mail.send(msg)
#         current_app.logger.info(f"Password reset email sent to {email}")
#         return {"message": "Password reset email sent successfully!"}, 200
#     except Exception as e:
#         current_app.logger.error(f"Error sending password reset email: {str(e)}")
#         return {"message": "Failed to send password reset email."}, 500

# if __name__ == '__main__':
#     app.run(debug=True)
