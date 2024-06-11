from decouple import config

class Config:
    SQLALCHEMY_DATABASE_URI=config('PG')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY=config('SECRET_KEY')
    JWT_SECRET_KEY=config('JWT_SECRET_KEY')
