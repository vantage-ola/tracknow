from decouple import config

class Config:
    SQLALCHEMY_DATABASE_URI=config('PG')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY=config('SECRET_KEY')
    JWT_SECRET_KEY=config('JWT_SECRET_KEY')
    DEBUG = False
    TESTING = False
    # pool_pre_ping should help handle DB connection drops
    SQLALCHEMY_ENGINE_OPTIONS = {"pool_pre_ping": True}  

class TestConfig:
    SQLALCHEMY_DATABASE_URI=config('TESTING_PG')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY=config('TESTING_SECRET_KEY')
    JWT_SECRET_KEY=config('TESTING_JWT_SECRET_KEY')
    DEBUG = True
    TESTING = True
    # pool_pre_ping should help handle DB connection drops
    SQLALCHEMY_ENGINE_OPTIONS = {"pool_pre_ping": True}  