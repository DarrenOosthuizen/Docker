from flask_restx import abort

from app.main import db
from app.main.model.user import User
from ..model.blacklisted import BlacklistToken

class Auth:

    @staticmethod
    def login_user(data):
        user = User.query.filter_by(email=data.get('email')).first()
        if user and user.check_password(data.get('password')):
            auth_token = user.encode_auth_token(user.id)
            if auth_token:
                response_object = {
                    'token': auth_token
                }
                return response_object, 200
        else:
            abort(401, "Email or password does not match")


    @staticmethod
    def logout_user(data):
        if data:
            auth_token = data
        else:
            auth_token = ''
        if auth_token:
            resp = User.decode_auth_token(auth_token)
            if not isinstance(resp, str):
                # mark the token as blacklisted
                return Auth.blacklist(token=auth_token)
            else:
                abort(401, resp)
        else:
            abort(403, "Provide a valid auth token")

    @staticmethod
    def blacklist(token):
        blacklist_token = BlacklistToken(token=token)
        try:
            # insert the token
            db.session.add(blacklist_token)
            db.session.commit()
            response_object = {
                'message': 'Successfully logged out'
            }
            return response_object, 200
        except Exception as e:
            abort(400, e)