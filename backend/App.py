from flask import Flask

def create_app(*args, **kwargs):  
    """Application factory function"""
    app = Flask(__name__)

    @app.route('/')
    def home():
        return "Hello, World!" 

    return app  
