import sys
sys.path.append("backend")

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail
from flask_migrate import Migrate
from backend.config import Config
from backend.models import db

# Initialize extensions
mail = Mail()
migrate = Migrate()

def create_app(*args, **kwargs):
    """Application factory function"""
    app = Flask(__name__)

    @app.route('/')
    def index():
        return {"message": "Welcome!"}, 200

    # Load configuration
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    mail.init_app(app)
    migrate.init_app(app, db)

    with app.app_context():
        # Register blueprints
        from app.routes.auth import auth_bp
        app.register_blueprint(auth_bp)

        # Register error handlers
        register_error_handlers(app)

    return app

def register_error_handlers(app):
    """Register error handlers for common HTTP errors"""
    @app.errorhandler(404)
    def not_found_error(error):
        return {'message': 'Resource not found'}, 404

    @app.errorhandler(500)
    def internal_error(error):
        db.session.rollback()
        return {'message': 'Internal server error'}, 500
