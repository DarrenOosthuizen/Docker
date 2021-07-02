from .. import db

class SensorData(db.Model):
    """ Sensor Data Model to store data received from sensors """
    __tablename__ = "data"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    sensor_id = db.Column(db.Integer, db.ForeignKey('sensor.id'), nullable=False)
    date = db.Column(db.DateTime)
    temp = db.Column(db.Float)
    hum = db.Column(db.Float)
    pm = db.Column(db.Float)
    tvoc = db.Column(db.Float)
    co2 = db.Column(db.Float)
    co = db.Column(db.Float)
    air = db.Column(db.Float)
    ozone = db.Column(db.Float)
    no2 = db.Column(db.Float)
    virus = db.Column(db.Float)