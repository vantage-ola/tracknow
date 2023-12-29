import pytest
from app import app as _app

@pytest.fixture
def app():
    return _app 

@pytest.fixture
def test_client(app):
    #test client for app
    return app.test_client()

