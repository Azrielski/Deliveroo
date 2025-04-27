from flask import current_app, render_template_string, request
import requests
import json

def send_email(to_email, subject, html_content):
    """Send email using Linkmonk API"""
    linkmonk_api_url = current_app.config.get('LINKMONK_API_URL')
    linkmonk_api_key = current_app.config.get('LINKMONK_API_KEY')
    
    if not linkmonk_api_url or not linkmonk_api_key:
        current_app.logger.warning("Linkmonk API credentials not configured. Email not sent.")
        return False
    
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {linkmonk_api_key}'
    }
    
    payload = {
        'to': [to_email],
        'subject': subject,
        'content_type': 'html',
        'body': html_content,
        'from_email': current_app.config.get('EMAIL_SENDER')
    }
    
    try:
        response = requests.post(
            f"{linkmonk_api_url}/api/send",
            headers=headers,
            data=json.dumps(payload)
        )
        
        if response.status_code == 200:
            current_app.logger.info(f"Email sent to {to_email}, status code: {response.status_code}")
            return True
        else:
            current_app.logger.error(f"Linkmonk API error: {response.text}")
            return False
    except Exception as e:
        current_app.logger.error(f"Error sending email via Linkmonk: {str(e)}")
        return False

def send_verification_email(to_email, token):
    """Send email verification link"""
    subject = "Verify Your Deliveroo Account"
    verification_url = f"{request.host_url.rstrip('/')}/verify-email?token={token}"
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





