class Config:
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:Marco2650@localhost:5432/deliveroo'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = 'bb7523de87660149c8e11db73e41bce56afbbe1ea1324a731c97c415b493911c'

    # Email configuration
    EMAIL_SENDER = 'your_email@example.com'

    # Linkmonk API configuration
    LINKMONK_API_URL = 'https://your-linkmonk-instance.com'
    LINKMONK_API_KEY = 'your_linkmonk_api_key'

    # Keep Flask-Mail configuration for backward compatibility if needed
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USE_SSL = False
    MAIL_USERNAME = 'your_email@gmail.com'
    MAIL_PASSWORD = 'your_email_password'
    MAIL_DEFAULT_SENDER = 'your_email@gmail.com'