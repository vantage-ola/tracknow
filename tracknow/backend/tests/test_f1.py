def test_get_driver_standings(test_client, init_database):
    response = test_client.get('/api/v1/f1/drivers',content_type='application/json')
    assert response.status_code == 200

def test_get_team_standings(test_client, init_database):
    response = test_client.get('/api/v1/f1/teams', content_type='application/json')
    assert response.status_code == 200
