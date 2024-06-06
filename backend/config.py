from decouple import config

class Config:
    SQLALCHEMY_DATABASE_URI=config('PG')
    SQLALCHEMY_TRACK_MODIFICATIONS = False