from flask import Flask

def create_app():
    app = Flask(__name__)

    @app.route('/')
    def home():
        return "Hello, World!"  # ✅ Valid response

    return app  # ✅ Ensure you're returning the Flask app instance
