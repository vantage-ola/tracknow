import json

laptime_data = {
    "car": "Formula 1 2020",
    "track": "Bathurst",
    "time": "1.08.034",
    "simracing": True,
    "platform": "ACC",
    "youtube_link": "https://youtube.com/Y94573H383",
    "comment": "fast af boi"
}
user = {
        
        'username': 'xtestuser',
        'password': 'xtestpassword'
    }



def test_logged_in_user_add_laptime(test_client, init_database):
    
    # since the test_laptime runs first for some reason
    # we have to create a new user... freaking pytest
    test_client.post('/api/v1/users', data=json.dumps(user), content_type='application/json')

    login_response = test_client.post('/api/v1/login', data=json.dumps(user), content_type='application/json')
    token = login_response.json['token']
    headers = {
        'Authorization': f'Bearer {token}'
    }

    response = test_client.post('/api/v1/user/laptimes', data=json.dumps(laptime_data), headers=headers, content_type='application/json')
    assert response.status_code == 201
    assert 'Laptime Added Successfully' in response.json
    

def test_logged_in_user_laptimes(test_client, init_database):
    
 
    login_response = test_client.post('/api/v1/login', data=json.dumps(user), content_type='application/json')
    
    token = login_response.json['token']
    headers = {
        'Authorization': f'Bearer {token}'
    }

    response = test_client.get('/api/v1/laptimes', headers=headers, content_type='application/json')
    assert response.status_code == 200
    assert len(response.json) > 0

def test_logged_in_user_laptime(test_client, init_database):
    

    login_response = test_client.post('/api/v1/login', data=json.dumps(user), content_type='application/json')
    
    token = login_response.json['token']
    headers = {
        'Authorization': f'Bearer {token}'
    }

    response = test_client.get('/api/v1/laptimes/1', headers=headers, content_type='application/json')
    assert response.status_code == 200

def test_get_all_laptimes(test_client, init_database):
    response = test_client.get('/api/v1/laptimes', content_type='application/json')
    assert response.status_code == 200
    assert len(response.json) == 1

def test_get_one_laptime(test_client, init_database):
    response = test_client.get('/api/v1/laptimes', content_type='application/json')
    assert response.status_code == 200
    assert "simracing" in response.json[0]