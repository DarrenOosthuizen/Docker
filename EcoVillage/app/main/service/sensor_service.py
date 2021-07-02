import os
import sys
import pandas as pd

from os import walk
from flask_restx import abort

from app.main import db
from app.main.model.user import User
from app.main.model.sensor import Sensor
from app.main.model.data import SensorData
from ..service.model_factory import indexes
from ..service.predictor import Predictor

predictor = Predictor()

def get_sensor(user, sensor_id):
    sensor = next((x for x in user.sensors if x.id == int(sensor_id)), None)
    if not sensor:
        abort(404, "Unknown sensor")
    else:
        return sensor, 200

def get_sensors(user):
    return user.sensors, 200

def update_sensor(user, sensor_id, data):
    if not data:
        response_object = {
            'message': 'Nothing to update'
        }
        return response_object, 200

    updated = False
    sensor, code = get_sensor(user, sensor_id)

    if "name" in data:
        sensor.name = data["name"]
        updated = True

    if updated:
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

def create_sensor(user, data):
    sensor = Sensor.query.filter_by(device_name=data['device_name']).first()
    last_index = len(Sensor.query.all()) + 1

    if not sensor:
        path = f"data/{data['device_name']}"
        if not os.path.exists(path):
            abort(400, "Unknown sensor")

        # TODO: Change to the proper connection with DB

        column_names = ['date', 'temp', 'hum', 'pm', 'tvoc', 'co2', 'co', 'air', 'ozone', 'no2', 'virus']
        (_, _, filenames) = next(walk(path))

        df = pd.DataFrame()
        for f in filenames:
            d = pd.read_csv(f'{path}/{f}', header=0)
            d.columns = column_names
            df = df.append(d)

        df = df.sort_values(by="date")
        df.index = pd.to_datetime(df['date'])
        df = df.resample('H').mean().bfill()

        new_sensor = Sensor(
            name=data["name"],
            device_name=data["device_name"]
        )        

        for index, row in df.iterrows():
            val = SensorData(
                sensor_id = last_index,
                date = index,
                temp = row["temp"],
                hum = row["hum"],
                pm = row["pm"],
                tvoc = row["tvoc"],
                co2 = row["co2"],
                co = row["co"],
                air = row["air"],
                ozone = row["ozone"],
                no2 = row["no2"],
                virus = row["virus"],
            )
            new_sensor.data.append(val)

        user.sensors.append(new_sensor)
        save_changes(user)
        
        # TODO: Create models as a background tasks

        response_object = {
            'message': 'Successfully registered the sensor'
        }
        return response_object, 201
    else:
        abort(409, "Sensor already exists")

def forecast(user, sensor_id, index):
    if index not in indexes.keys():
        abort(404, "Unknown index")

    try:
        sensor, _ = get_sensor(user, sensor_id)
        forecast, time = predictor.predict(indexes[index], sensor)
        return forecast, 200
    except:
        abort(500, "Something went wrong")

def get_all_data(user, sensor_id):
    sensor, code = get_sensor(user, sensor_id)
    return sensor.data

def get_last_data(user, sensor_id):
    sensor, _ = get_sensor(user, sensor_id)
    return sensor.data[-1]

def get_data(user, sensor_id, period):
    sensor, _ = get_sensor(user, sensor_id)
    df = pd.read_sql('data', db.engine)
    df.query(f'sensor_id == {sensor.id}', inplace=True)
    df.index = pd.to_datetime(df['date'])
    df = df.resample(period).mean().bfill()

    data = []
    for index, row in df.iterrows():
        val = SensorData(
            sensor_id = sensor.id,
            date = index,
            temp = row["temp"],
            hum = row["hum"],
            pm = row["pm"],
            tvoc = row["tvoc"],
            co2 = row["co2"],
            co = row["co"],
            air = row["air"],
            ozone = row["ozone"],
            no2 = row["no2"],
            virus = row["virus"],
        )
        data.append(val)

    #print(data, file=sys.stderr)
    return data

def delete_sensor(user, sensor_id):
    sensor, code = get_sensor(user, sensor_id)

    user.sensors.remove(sensor)
    db.session.delete(sensor)
    db.session.commit()

    response_object = {
        'message': 'Successfully deleted'
    }
    return response_object, 200

def save_changes(data):
    db.session.add(data)
    db.session.commit()