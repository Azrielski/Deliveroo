from flask import Flask

def create_app(*args, **kwargs):  
    """Application factory function"""
    app = Flask(__name__)

    @app.route('/')
    def home():
        return "Hello, World!"  # ✅ Correct response

    return app  # ✅ Ensure Flask app instance is properly returned
