import pytest
from pymongo.server_api import ServerApi
from pymongo.mongo_client import MongoClient
from app import app as _app

from decouple import config


#config test
MONGO_USERNAME = config('MONGO_USERNAME')
MONGO_PASSWORD = config('MONGO_PASSWORD')
uri = "mongodb+srv://{}:{}@cluster0.j1gr1sc.mongodb.net/?retryWrites=true&w=majority".format(MONGO_USERNAME,MONGO_PASSWORD)

@pytest.fixture
def test_mongo():
    test_db = MongoClient(uri, server_api = ServerApi('1'))
    return test_db

@pytest.fixture
def app():
    return _app 

@pytest.fixture
def test_client(app):
    #test client for app
    return app.test_client()

