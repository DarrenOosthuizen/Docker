from flask import request
from flask_restx import Resource
from .controller import protected

from ..util.namespaces import AuthNS
from ..service.auth_service import Auth

api = AuthNS.api

@api.route("/login")
class Login(Resource):
    @api.doc(body=AuthNS.login_data)
    def post(self):
        """Login user"""
        return Auth.login_user(request.json)
    
@api.route("/logout")
class Logout(Resource):
    @api.doc(security='api_key')
    @protected
    def post(self):
        """Logout user"""
        return Auth.logout_user(request.headers["Authorization"])