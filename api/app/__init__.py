from flask import Flask, Response, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Controllers
# from .opportunity.routes import opportunity
# add more here that map to the tables

load_dotenv()

def init_app():
    app = Flask(__name__)
    CORS(app)

    # Register route blueprints
    # app.register_blueprint(opportunity, url_prefix="/mail")
    # @app.route("/mail")
    #     return jsonify(
    #         email="lucascullen@protonmail.com",
    #         id=1
    #     )


    # Register base route
    @app.route("/")
    def base():
        return "Hello"

    return app


app = init_app()

