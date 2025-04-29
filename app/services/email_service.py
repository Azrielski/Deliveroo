from flask import current_app, render_template_string, request
from flask_mail import Mail, Message
from flask import url_for
# Initialize Flask-Mail
mail = Mail()

def send_email(to_email, subject, html_content):
    """Send email using Flask-Mail (SMTP)"""
    try:
        msg = Message(
            subject=subject,
            recipients=[to_email],
            html=html_content,
            sender=current_app.config.get('MAIL_DEFAULT_SENDER')
        )
        mail.send(msg)
        current_app.logger.info(f"Email sent to {to_email}")
        return True
    except Exception as e:
        current_app.logger.error(f"Error sending email via SMTP: {str(e)}")
        return False



def send_verification_email(to_email, token):
    """Send email verification link"""
    subject = "Verify Your Deliveroo Account"
    # Generate the correct URL for the verification route
    verification_url = url_for('auth.verify_email', token=token, _external=True)
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
    return send_email(to_email, subject, html_content)


def send_password_reset_email(to_email, token):
    """Send password reset link"""
    subject = "Reset Your Deliveroo Password"
    reset_url = f"{request.host_url.rstrip('/')}/reset-password?token={token}"
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
    return send_email(to_email, subject, html_content)


