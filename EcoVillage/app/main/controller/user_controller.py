from flask import request, g
from flask_restx import Resource
from .controller import protected

from ..util.namespaces import UserNS
from ..service import user_service
api = UserNS.api

@api.route("")
class UserController(Resource):
    @api.doc(security='api_key')
    @api.marshal_with(UserNS.user)
    @protected
    def get(self):
        """Get user's information"""
        return g.user

    @api.doc(body=UserNS.new_user)
    def post(self):
        """Create a new user"""
        return user_service.create_new_user(request.json)

    @api.doc(security='api_key', body=UserNS.new_user)
    @protected
    def patch(self):
        """Update user's information"""
        return user_service.update_user(g.user, request.json)

    @api.doc(security='api_key')
    @protected
    def delete(self):
        """Delete user"""
        return user_service.delete_user(g.user)