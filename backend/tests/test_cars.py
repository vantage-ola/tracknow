#TEST CARS ROUTES
from flask import json

def test_get_all_cars(test_client):
    response = test_client.get('/api/cars')
    assert response.status_code == 200

def test_get_single_car(test_client):
    response = test_client.get('/api/cars/1')
    data = json.loads(response.get_data(as_text=True))

    assert data['id'] == 1
    assert response.status_code == 200

def test_get_nonexistent_car(test_client):
    # check a car that does not exist
    response = test_client.get('/api/cars/9999')
    assert response.status_code == 404

def test_get_cars_drivers(test_client):
    response = test_client.get('/api/cars/1/drivers') #Mercedes AMG-ONE 'first' driver record in db
    data = json.loads(response.get_data(as_text=True))

    assert data[0]['name'] == 'Maro Engel'
    assert response.status_code == 200

def test_get_cars_tracks(test_client):
    response = test_client.get('/api/cars/1/tracks') #Mercedes AMG-ONE  'first' track record in db
    data = json.loads(response.get_data(as_text=True))

    assert data[0]['name'] == 'NÜRBURGRING GRAND PRIX'
    assert response.status_code == 200

# No tests for POST currently, we may need to use mocktests for that
