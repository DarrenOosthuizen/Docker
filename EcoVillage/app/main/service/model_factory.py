import os
import pandas as pd
from typing import NamedTuple

from statsmodels.tsa.statespace.sarimax import SARIMAX
from patsy import dmatrices

from ..config import config

class Index(NamedTuple):
    name: str
    args: tuple

indexes = {        
    'air': Index('air', ('hum', 'temp', 'pm', 'tvoc', 'co2')),
    'co2': Index('co2', ('hum', 'temp', 'pm')),
    'humidity': Index('humidity', ('temp', 'pm', 'tvoc', 'co2', 'air', 'ozone', 'no2')),
    'no2': Index('no2', ('ozone',)),
    'ozone': Index('ozone', ('no2', 'virus', 'temp')),
    'pm': Index('pm', ('hum', 'co2', 'air')),
    'temperature': Index('temperature', ('hum', 'pm', 'tvoc', 'co2', 'air', 'ozone', 'no2')),
    'tvoc': Index('tvoc', ('co2', 'no2')),
    'virus': Index('virus', ('hum', 'temp', 'pm', 'co2')),
}

class Model(NamedTuple):
    name: str
    expr: str
    order: tuple
    seasonal_order: tuple
    trend: str

class ModelFactory():
    
    periods = config.MODEL_PERIODS

    def __init__(self, save=False):
        self.models = {        
            'air': Model('air', f"air ~ {' + '.join(indexes['air'].args)}", (0,0,0), (0,1,0,24), 'n'),
            'co2': Model('co2', f"co2 ~ {' + '.join(indexes['co2'].args)}", (1,0,0), (1,1,0,24), 'n'),
            'humidity': Model('humidity', f"hum ~ {' + '.join(indexes['humidity'].args)}", (1,0,0), (1,1,0,24), 'n'),
            'no2': Model('no2', f"no2 ~ {' + '.join(indexes['no2'].args)}", (1,0,0), (1,0,1,24), 'n'),
            'ozone': Model('ozone', f"ozone ~ {' + '.join(indexes['ozone'].args)}", (0,0,1), (1,1,0,24), 'n'),
            'pm': Model('pm', f"pm ~ {' + '.join(indexes['pm'].args)}", (1,0,0), (1,1,0,24), 'n'),
            'temperature': Model('temperature', f"temp ~ {' + '.join(indexes['temperature'].args)}", (0,0,0), (0,1,0,24), 'n'),
            'tvoc': Model('tvoc', f"tvoc ~ {' + '.join(indexes['tvoc'].args)}", (1,0,0), (1,1,0,24), 'n'),
            'virus': Model('virus', f"virus ~ {' + '.join(indexes['virus'].args)}", (0,0,1), (1,1,0,24), 'n'),
        }
        self.models_path = config.MODELS_PATH
        self.save = save

    def create_folders(self):
        """ Create folders for models """

        if not os.path.isdir(self.models_path):
            os.mkdir(self.models_path)

        for period in self.periods:
            folder = f"{self.models_path}/{period}_hour_models"
            if not os.path.isdir(folder):
                os.mkdir(folder)

    def create(self, model: Model, df: pd.DataFrame, steps: int, sensor_name):
        y_train, X_train = dmatrices(model.expr, df, return_type='dataframe')

        X_train_minus_intercept = X_train.drop('Intercept', axis=1)
        X_train_minus_intercept = X_train_minus_intercept.asfreq('H')
        y_train = y_train.asfreq('H')

        sarimax_model = SARIMAX(endog=y_train,
                        exog=X_train_minus_intercept,
                        order=model.order, 
                        seasonal_order=model.seasonal_order,
                        trend=model.trend)

        sarimax_model = sarimax_model.fit(disp=False)

        if self.save:
            self.create_folders()
            dir = f'{self.models_path}/{steps}_hour_models/{sensor_name}'
            if not os.path.isdir(dir):
                os.mkdir(dir)

            sarimax_model.save(f'{dir}/{model.name}.pkl')

        print(f"Created {steps} hour(s) {model.name} model.")

        return sarimax_model

    def create_all(self, df: pd.DataFrame, sensor_name):
        
        for model in self.models.values():
            for period in self.periods: 
                df_val = df.copy()
                
                for arg in indexes[model.name].args:
                    df_val[arg] = df_val[arg].shift(periods=period)

                df_val = df_val.drop(df_val.index[:period])

                self.create(model, df_val, period, sensor_name)