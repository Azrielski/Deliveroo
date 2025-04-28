import os

class Config:
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:Marco2650@localhost:5432/deliveroo'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = 'bb7523de87660149c8e11db73e41bce56afbbe1ea1324a731c97c415b493911c'
    
    # SMTP Email configuration
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USE_SSL = False
    MAIL_USERNAME = os.getenv('MAIL_USERNAME', 'your-email@gmail.com')
    MAIL_PASSWORD = os.getenv('MAIL_PASSWORD', 'your-app-password')
    MAIL_DEFAULT_SENDER = os.getenv('MAIL_DEFAULT_SENDER', 'Deliveroo <your-email@gmail.com>')
