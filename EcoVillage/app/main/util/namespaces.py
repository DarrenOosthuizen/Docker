from flask_restx import Namespace, fields

class SensorNS:
    api = Namespace('Sensor', path='/sensors', description='Sensors related operations')
    update_sensor = api.model('SensorUpdate', {
        'name': fields.String(description='Sensor name given', example="Kitchen sensor")
    })
    new_sensor = api.inherit('NewSensor', update_sensor, {
        'device_name': fields.String(description='Sensor name given by manufacturer', example="Buiten 1")
    })
    sensor = api.inherit('Sensor', new_sensor, {
        'id': fields.Integer(description='Sensor identifier'),
    })
    forecast = api.model('Forecast', {
        "time": fields.DateTime(required=True, description="Date and time of the forecasted value"),
        "forecast": fields.Float(required=True, description="The forecasted value"),
    })
    data = api.model("Data", {
        "date": fields.DateTime(required=True, description="Date and time of the forecasted value"),
        "temp": fields.Float(required=True),
        "hum": fields.Float(required=True),
        "pm": fields.Float(required=True),
        "tvoc": fields.Float(required=True),
        "co2": fields.Float(required=True),
        "co": fields.Float(required=True),
        "air": fields.Float(required=True),
        "ozone": fields.Float(required=True),
        "no2": fields.Float(required=True),
        "virus": fields.Float(required=True)
    })

class UserNS:
    api = Namespace('User', path='/user', description='User related operations')   
    new_user = api.model('NewUser', {
        'name': fields.String(description="User's name", example="Bob"),
        'email': fields.String(description='User email address', example="example@example.com"),
        'password': fields.String(description="User's password", example="password")
    })
    created_user = api.model('CreatedUser', {
        'id': fields.Integer(description='User identifier'),
        'name': fields.String(description="User's name"),
        'email': fields.String(description='User email address'),
    })
    user = api.inherit('User', created_user, {
        'sensors': fields.List(fields.Nested(SensorNS.sensor), description='Sensors of the user')
    })

class AuthNS:
    api = Namespace('Auth', path='/auth', description='Authentication related operations')
    login_data = api.model('Credentials', {
        'email': fields.String(description='User email address',  example="example@example.com"),
        'password': fields.String(description="User's password", hidden=True, example="password")
    })