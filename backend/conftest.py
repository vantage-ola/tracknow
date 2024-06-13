# TODO set up pytest config.
import pytest
from app import create_app
from models import db, User

@pytest.fixture(scope='module')
def test_app():
    # Set up the Flask app configured for testing
    app = create_app('config.TestConfig')
    
    # Establish an application context before running the tests
    with app.app_context():
        yield app

@pytest.fixture(scope='module')
def test_client(test_app):
    # Create a test client for making HTTP requests
    return test_app.test_client()

@pytest.fixture(scope='module')
def init_database(test_app):
    # Create the database and the database table(s)
    db.create_all()
    
    yield db  # this is where the testing happens
    db.session.remove()
    db.drop_all()