from flask import json

def test_get_all_tracks(test_client):
    response = test_client.get('/api/tracks')
    assert response.status_code == 200

def test_get_single_track(test_client):
    response = test_client.get('/api/tracks/1')
    data = json.loads(response.get_data(as_text=True))

    assert data['id'] == '1' #id is stored as string in db silly me :{
    assert response.status_code == 200

def test_get_nonexistent_track(test_client):
    response = test_client.get('/api/tracks/999')
    assert response.status_code == 404

def test_get_tracks_cars(test_client):
    response = test_client.get('/api/tracks/33/cars') #NÜRBURGRING GRAND PRIX ' first' car record in db
    data = json.loads(response.get_data(as_text=True))

    assert data[0]['name'] == 'Mercedes Benz W11 EQ'
    assert response.status_code == 200

def test_get_tracks_drivers(test_client):
    response = test_client.get('api/tracks/33/drivers') #Maro Engel first track record
    data = json.loads(response.get_data(as_text=True))

    assert data[0]['name'] == 'Maro Engel'
    assert response.status_code == 200

# No tests for POST currently, we may need to use mocktests for that
