from datetime import timedelta
from numpy import maximum
import pandas as pd
import time
import sys

from statsmodels.iolib.smpickle import load_pickle
from ..config import config
from .. import db

from .model_factory import ModelFactory, Index

class Predictor:
    periods = config.MODEL_PERIODS
    factory = ModelFactory(save=True)

    def create_models(self, index: Index, sensor):
        models = dict()

        for period in self.periods:
            df = pd.read_sql('data', db.engine)
            df.query(f'sensor_id == {sensor.id}', inplace=True)
            df.index = pd.to_datetime(df['date'])
            df_val = df.drop(columns=['date'])

            for arg in index.args:
                df_val[arg] = df_val[arg].shift(periods=period)

            df_val = df_val.drop(df_val.index[:period])

            model = self.factory.create(self.factory.models[index.name], df_val, period, sensor.id)

            models[f"{period}"] = model

        return models

    def load_models(self, index: Index, sensor):
        """ Loads models to forecast values """
        models = dict()

        for period in self.periods:                
            model = load_pickle(f'{config.MODELS_PATH}/{period}_hour_models/{sensor.device_name}/{index.name}.pkl')
            models[f"{period}"] = model

        return models

    def load_data(self, amount):
        """ Loads additional data from the database """
        df = pd.read_sql('data', db.create_engine(config.SQLALCHEMY_DATABASE_URI,{}))
        df = df.tail(amount)
        df.index = pd.to_datetime(df['date'])
        df_val = df.drop(columns=['date'])
        df_val = df_val.resample('H').mean()

        return df_val

    def predict(self, index: Index, sensor):
        """ Returns prediction for the given index """
        start = time.time()

        # Load models
        models = self.load_models(index, sensor)
        # models = self.create_models(index, sensor)

        # Load data
        df = self.load_data(max(self.periods))
        df = df.drop(columns=[x for x in df.columns if x not in index.args])

        forecasts = []
        max_key = max([int(key) for key in models.keys()])

        model_index = 0
        model = list(models.values())[model_index]
        index = int(list(models.keys())[model_index])

        # Create forecast
        for i in range(1, max_key+1):
            if str(i-1) in models:
                model_index += 1
                model = list(models.values())[model_index]
                index = int(list(models.keys())[model_index])
                for j in range(int(i-1)):
                    exog = df.iloc[[-index + j]]
                    res = model.forecast(exog=exog)
                    exog.index = exog.index + timedelta(hours=index)
                    model = model.extend(pd.Series(res.values, index=[res.index[-1]]), exog=exog)                    

            exog = df.iloc[[-index + i - 1]]
            res = model.forecast(exog=exog)                
            forecasts.append({
                'forecast': res.values[-1],
                'time': res.index[-1]
            })
            exog.index = exog.index + timedelta(hours=index)
            model = model.extend(pd.Series(res.values, index=[res.index[-1]]), exog=exog)

        end = time.time()
        #print(f"{end - start:.2f}")

        return forecasts, end - start