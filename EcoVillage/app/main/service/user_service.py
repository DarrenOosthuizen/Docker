import datetime

from validate_email import validate_email
from flask_restx import abort

from app.main import db
from app.main.model.user import User

def create_new_user(data):
    user = User.query.filter_by(email=data['email']).first()
    if not user:
        is_valid = validate_email(email_address=data['email'],
                                check_dns=False, check_smtp=False)
        if not is_valid:
            abort(400, 'Invalid email format')

        new_user = User(
            email=data['email'],
            name=data['name'],
            password=data['password'],
            created_at=datetime.datetime.utcnow()
        )
        save_changes(new_user)
        response_object = {
            'message': 'Successfully registered'
        }
        return response_object, 201
    else:
        abort(409, 'User already exists')

def update_user(user, data):
    if not data:
        response_object = {
            'message': 'Nothing to update'
        }
        return response_object, 200

    updated = False

    if "name" in data:
        user.name = data["name"]
        updated = True

    if "email" in data:
        is_valid = validate_email(email_address=data['email'],
                                     check_dns=False, check_smtp=False)
        if not is_valid:
            abort(400, "Invalid email")

        u = User.query.filter_by(email=data["email"]).first()
        if not u:
            user.email = data["email"]
            updated = True
        else:
            abort(409, "Email is taken")
    
    if "password" in data:
        user.password = data["password"]
        updated = True
    
    if updated:
        user.updated_at = datetime.datetime.utcnow()
        response_object = {
            'message': 'Successfully modified',
        }
        db.session.commit()
        return response_object, 200
    else:
        response_object = {
            'message': 'Nothing to update',
        }
        return response_object, 200 

def delete_user(user):
    db.session.delete(user)
    db.session.commit()

def save_changes(data):
    db.session.add(data)
    db.session.commit()