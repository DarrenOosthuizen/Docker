from functools import wraps
from flask import request, g
from flask_restx import abort
from app.main.model.user import User

def protected(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if "Authorization" not in request.headers:
            abort(403,'Not enough permissions')
        else:
            try:
                id = User.decode_auth_token(request.headers["Authorization"])
                if not isinstance(id, int):
                    raise Exception()
            except:
                abort(403, id)

        g.user = User.query.filter_by(id=id).first()
        if not g.user:
            abort(404, "User not found")

        return f(*args, **kwargs)
    return decorated_function