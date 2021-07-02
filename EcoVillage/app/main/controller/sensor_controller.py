from .controller import protected

from flask import request, g
from flask_restx import Resource

from ..util.namespaces import SensorNS
from ..service import sensor_service

api = SensorNS.api

@api.route("")
class SensorController(Resource):
    @api.doc(security='api_key')
    @api.marshal_list_with(SensorNS.sensor)
    @protected
    def get(self):
        """Returns information about all sensors"""     
        sensors, code = sensor_service.get_sensors(g.user)    
        return list(sensors), code

    @api.doc(security='api_key', body=SensorNS.new_sensor)
    @protected
    def post(self):
        """Create a new sensor"""        
        return sensor_service.create_sensor(g.user, request.json)

@api.route("/<sensor_id>")
@api.doc(
    security='api_key',
    params={
        'sensor_id': 'Sensor id',
})
class IndividualSensorController(Resource):
    @api.marshal_with(SensorNS.sensor)
    @protected
    def get(self, sensor_id):
        """Get sensor information"""
        sensor, code = sensor_service.get_sensor(g.user, sensor_id)
        sensor.data = []
        return sensor, code

    @api.doc(security='api_key', body=SensorNS.update_sensor)
    @protected
    def patch(self, sensor_id):
        """Update user's information"""
        return sensor_service.update_sensor(g.user, sensor_id, request.json)

    @protected
    def delete(self, sensor_id):
        """Delete sensor"""
        return sensor_service.delete_sensor(g.user, sensor_id)

@api.route("/<sensor_id>/data")
@api.doc(
    params={
        'sensor_id': 'Sensor id',
    },
    security='api_key'
)
class SensorDataController(Resource):
    @api.marshal_list_with(SensorNS.data)
    @protected
    def get(self, sensor_id):
        """Get all data from the sensor"""
        return sensor_service.get_all_data(g.user, sensor_id)

@api.route("/<sensor_id>/data/last")
@api.doc(
    params={
        'sensor_id': 'Sensor id',
    },
    security='api_key'
)
class SensorDataLastController(Resource):
    @api.marshal_with(SensorNS.data)
    @protected
    def get(self, sensor_id):
        """Get last data from the sensor"""
        return sensor_service.get_last_data(g.user, sensor_id)

@api.route("/<sensor_id>/data/daily")
@api.doc(
    params={
        'sensor_id': 'Sensor id',
    },
    security='api_key'
)
class SensorDataGetDayController(Resource):
    @api.marshal_with(SensorNS.data)
    @protected
    def get(self, sensor_id):
        """Get daily data from the sensor"""
        return sensor_service.get_data(g.user, sensor_id, '1D')

@api.route("/<sensor_id>/data/weekly")
@api.doc(
    params={
        'sensor_id': 'Sensor id',
    },
    security='api_key'
)
class SensorDataGetWeeklyController(Resource):
    @api.marshal_with(SensorNS.data)
    @protected
    def get(self, sensor_id):
        """Get weekly data from the sensor"""
        return sensor_service.get_data(g.user, sensor_id, 'W-Mon')

@api.route("/<sensor_id>/data/monthly")
@api.doc(
    params={
        'sensor_id': 'Sensor id',
    },
    security='api_key'
)
class SensorDataGetMonthController(Resource):
    @api.marshal_with(SensorNS.data)
    @protected
    def get(self, sensor_id):
        """Get monthly data from the sensor"""
        return sensor_service.get_data(g.user, sensor_id, '1M')

@api.route("/<sensor_id>/forecast/<index>")
class ForecastController(Resource):
    @api.doc(
        params={
            'sensor_id': 'Sensor id',
            'index': 'One of the following: ["temperature", "humidity", "air", "co2", "no2", "ozone", "pm", "tvoc", "virus"]'   
        },
        security='api_key'
    )
    @api.marshal_list_with(SensorNS.forecast, envelope='forecasts')
    @protected
    def get(self, sensor_id, index):
        """Returns forecasted atmospheric value"""        
        return sensor_service.forecast(g.user, sensor_id, index)