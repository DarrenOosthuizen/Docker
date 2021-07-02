import os
from dotenv import load_dotenv

basedir = os.path.abspath(os.path.dirname(__file__))
sqlite = 'sqlite:///' + os.path.join(basedir.replace("\\app\\main", ""), "database", 'ecovillage_main.db')
load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'my_secret_key')
    DEBUG = False
    MODELS_PATH = 'models'
    MODEL_PERIODS = [8]
    ERROR_404_HELP = False
    ALLOW_SWAGGER = True
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', sqlite) 
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    if SQLALCHEMY_DATABASE_URI == '':
        SQLALCHEMY_DATABASE_URI = sqlite

    if SECRET_KEY == '':
        SECRET_KEY = "my_secret_key"

class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class TestingConfig(Config):
    DEBUG = True
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'ecovillage_test.db')
    PRESERVE_CONTEXT_ON_EXCEPTION = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class ProductionConfig(Config):
    DEBUG = False
    ALLOW_SWAGGER = False
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')

config_by_name = dict(
    dev=DevelopmentConfig,
    test=TestingConfig,
    prod=ProductionConfig
)

key = Config.SECRET_KEY

# Import this
config = config_by_name[os.getenv('APP_ENV') or 'dev']