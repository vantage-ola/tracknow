from flask import json

def test_get_all_drivers(test_client):
    response = test_client.get('/api/drivers')
    assert response.status_code == 200

def test_get_single_driver(test_client):
    response = test_client.get('/api/drivers/1')
    data = json.loads(response.get_data(as_text=True))

    assert data['id'] == 1
    assert response.status_code == 200

def test_get_nonexistent_driver(test_client):
    response = test_client.get('/api/drivers/999')
    assert response.status_code == 404
    assert response.json == {'message': 'Driver not found'}

def test_get_drivers_cars(test_client):
    response = test_client.get('/api/drivers/1/cars') #Maro Engel ' first' car record in db
    data = json.loads(response.get_data(as_text=True))

    assert data[0]['name'] == 'Mercedes-AMG One'
    assert response.status_code == 200

def test_get_drivers_tracks(test_client):
    response = test_client.get('/api/drivers/1/tracks') #Maro Engel first track record
    data = json.loads(response.get_data(as_text=True))

    assert data[0]['name'] == 'NÜRBURGRING GRAND PRIX'
    assert response.status_code == 200
    
# No tests for POST currently, we may need to use mocktests for that
