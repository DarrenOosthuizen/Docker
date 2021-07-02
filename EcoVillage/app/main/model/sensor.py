from .. import db
from flask_restx import fields

class Sensor(db.Model, fields.Raw):
    __tablename__ = 'sensor'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    device_name = db.Column(db.String(254), nullable=False)
    name = db.Column(db.String(254), nullable=False)
    data = db.relationship('SensorData', backref='sensor', lazy=True,  
                            cascade="all, delete, delete-orphan")
