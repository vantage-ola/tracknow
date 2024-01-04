from flask import json

def test_get_all_laptimes(test_client):
    response = test_client.get('/api/laptimes')
    data = json.loads(response.get_data(as_text=True))
    
    assert response.status_code == 200
    #test the second specific laptime
    assert data[1]['car_id'] == 7
    assert data[1]['driver_id'] == 5
    assert data[1]['track_id'] == 33

def test_get_nonexistent_laptime(test_client):
    response = test_client.get('/api/laptimes/999')
    assert response.status_code == 404


# No tests for POST currently, we may need to use mocktests for that
    