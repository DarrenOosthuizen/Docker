from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS

from .config import config
from flask.app import Flask

db = SQLAlchemy()
flask_bcrypt = Bcrypt()

def create_app():
    app = Flask(__name__)
    app.config.from_object(config)
    CORS(app)
    db.init_app(app)
    flask_bcrypt.init_app(app)

    return app
