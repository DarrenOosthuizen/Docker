import os
import secrets
import click
import time

import pandas as pd

from os import walk
from flask import Blueprint
from dotenv import load_dotenv

from .service.model_factory import ModelFactory
from . import db, config

load_dotenv()
commands_bp = Blueprint('init', __name__)

models_path = config.MODELS_PATH

@commands_bp.cli.command("db")
def seed_db():
    '''Creates sqlite database folder'''
    dir = "database"
    if not os.path.isdir(dir):
        os.mkdir(dir)

    lines = []
    with open(".env", 'r+') as f:
        lines = f.readlines()
        lines = [x.replace('\n', '') for x in lines]

    with open(".env", 'w') as f:
        line = [lines.index(x) for x in lines if "APP_ENV=" in x][0]
        lines[line] = f"APP_ENV="
        lines = "\n".join(lines)
        f.write(lines)

@commands_bp.cli.command("models")
def seed_models():
    '''Creates models based on all data'''
    start = time.time()
    factory = ModelFactory(True)

    path = "data"

    column_names = ['date', 'temp', 'hum', 'pm', 'tvoc', 'co2', 'co', 'air', 'ozone', 'no2', 'virus']
    (_, dirnames, _) = next(walk(path))

    for dir in dirnames:
        df = pd.DataFrame()
        print(dir)
        (_, _, filenames) = next(walk(f"{path}/{dir}"))
        for f in filenames:
            data = pd.read_csv(f'{path}/{dir}/{f}', header=0)
            data.columns = column_names
            df = df.append(data)

        df = df.sort_values(by="date")
        df.index = pd.to_datetime(df['date'])
        df = df.resample('H').mean().bfill()

        factory.create_all(df, dir)

    print(f"\nFinished in: {time.time() - start:.2f}")

@commands_bp.cli.command("key")
def seed_key():
    '''Creates secret key for the application'''
    lines = []
    with open(".env", 'r+') as f:
        lines = f.readlines()
        lines = [x.replace('\n', '') for x in lines]

    with open(".env", 'w') as f:
        line = [lines.index(x) for x in lines if "SECRET_KEY=" in x][0]
        lines[line] = f"SECRET_KEY={secrets.token_hex(32)}"
        lines = "\n".join(lines)
        f.write(lines)