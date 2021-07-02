from flask_restx import Api
from flask import Blueprint, request, abort

from .main.controller.user_controller import api as user_ns
from .main.controller.sensor_controller import api as sensor_ns
from .main.controller.auth_controller import api as auth_ns

from .main.config import config

blueprint = Blueprint('api', __name__)

authorizations = {
    'api_key' : {
        'type' : 'apiKey',
        'in' : 'header',
        'name' : 'Authorization'
    }
}

api = Api(authorizations=authorizations)
# api = Api()
api.init_app(
    blueprint,
    title='Ecovillage API',
    version='1.0',
    description='API for EcoVillage Project',
    authorizations=authorizations,
    security = 'api_key',
    add_specs=config.ALLOW_SWAGGER
)

api.add_namespace(auth_ns)
api.add_namespace(user_ns)
api.add_namespace(sensor_ns)