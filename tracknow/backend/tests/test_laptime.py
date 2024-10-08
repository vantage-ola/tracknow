import json
from decouple import config

laptime_data = {
    "title": "Test Laptime",
    "car": "Formula 1 2020",
    "track": "Bathurst",
    "time": "1.08.034",
    "simracing": True,
    "platform": "ACC",
    "youtube_link": "https://youtube.com/Y94573H383",
    "comment": "fast af boi",
    "image": "https://example.com/image.jpg"
}
user = {
        
        'username': 'xtestuser',
        'password': 'xtestpassword'
    }

api_key = config("API_KEY")
header = {
        'x-api-key': api_key,
    }

def test_logged_in_user_add_laptime(test_client, init_database):
    test_client.post('/api/v1/users', data=json.dumps(user), headers=header, content_type='application/json')

    login_response = test_client.post('/api/v1/login', data=json.dumps(user), headers=header, content_type='application/json')
    token = login_response.json['token']
    headers = {
        'x-api-key': api_key,
        'Authorization': f'Bearer {token}'
    }

    response = test_client.post('/api/v1/user/laptimes', data=json.dumps(laptime_data), headers=headers, content_type='application/json')
    assert response.status_code == 201
    assert 'Laptime Added Successfully' in response.json
    assert response.json['Laptime Added Successfully']['title'] == 'Test Laptime'
    

def test_logged_in_user_laptimes(test_client, init_database):
    
 
    login_response = test_client.post('/api/v1/login', data=json.dumps(user), headers=header, content_type='application/json')
    
    token = login_response.json['token']
    headers = {
        'x-api-key': api_key,
        'Authorization': f'Bearer {token}'
    }

    response = test_client.get('/api/v1/laptimes', headers=headers, content_type='application/json')
    assert response.status_code == 200
    assert len(response.json) > 0

def test_logged_in_user_laptime(test_client, init_database):
    

    login_response = test_client.post('/api/v1/login', data=json.dumps(user),headers=header,  content_type='application/json')
    
    token = login_response.json['token']
    headers = {
        'x-api-key': api_key,
        'Authorization': f'Bearer {token}'
    }

    response = test_client.get('/api/v1/user/laptimes/1', headers=headers, content_type='application/json')
    assert response.status_code == 200

def test_get_all_laptimes(test_client, init_database):
    login_response = test_client.post('/api/v1/login', data=json.dumps(user),headers=header,  content_type='application/json')
    
    token = login_response.json['token']
    headers = {
        'x-api-key': api_key,
        'Authorization': f'Bearer {token}'
    }
    # Create additional laptimes
    for i in range(2, 14):
        new_data = {
            "title": f"Test Laptime {i}",
            "car": "Formula 1 2020",
            "track": "Bathurst",
            "time": "1.08.034",
            "simracing": True,
            "platform": "ACC",
            "youtube_link": "https://youtube.com/Y94573H383",
            "comment": "fast af boi"
        }
        test_client.post('/api/v1/user/laptimes', data=json.dumps(new_data), headers=headers, content_type='application/json')

    # Get the first page of laptimes
    response1 = test_client.get('/api/v1/laptimes?page=1', headers=headers, content_type='application/json')
    assert response1.status_code == 200
    assert len(response1.json) == 5

    # Get the second page of laptimes
    response2 = test_client.get('/api/v1/laptimes?page=2', headers=headers, content_type='application/json')
    assert response2.status_code == 200
    assert len(response2.json) == 5

    # Check that the laptimes are not duplicated
    #checks the intersection of the two sets is empty, 
    laptimes_page_1 = set(lt['id'] for lt in response1.json)
    laptimes_page_2 = set(lt['id'] for lt in response2.json)
    
    # there are no duplicates between the two pages of results.
    assert len(laptimes_page_1 & laptimes_page_2) == 0

def test_get_one_laptime(test_client, init_database):
    login_response = test_client.post('/api/v1/login', data=json.dumps(user),headers=header,  content_type='application/json')
    
    token = login_response.json['token']
    headers = {
        'x-api-key': api_key,
        'Authorization': f'Bearer {token}'
    }

    response = test_client.get('/api/v1/users/1/laptimes/1', headers=headers, content_type='application/json')
    assert response.status_code == 200

def test_user_laptimes(test_client, init_database):
    login_response = test_client.post('/api/v1/login', data=json.dumps(user),headers=header,  content_type='application/json')
    
    token = login_response.json['token']
    headers = {
        'x-api-key': api_key,
        'Authorization': f'Bearer {token}'
    }

    response = test_client.get('/api/v1/users/1/laptimes?page=4', headers=headers, content_type='appication/json')


def test_edit_laptime(test_client, init_database):
    
    login_response = test_client.post('/api/v1/login', data=json.dumps(user), headers=header, content_type='application/json')
    token = login_response.json['token']
    headers = {
        'x-api-key': api_key,
        'Authorization': f'Bearer {token}'
    }

    response = test_client.post('/api/v1/user/laptimes', data=json.dumps(laptime_data), headers=headers, content_type='application/json')
    assert response.status_code == 201
    laptime_id = response.json['Laptime Added Successfully']['id']

    edit_data = {
        "title": "Updated Test Laptime",
        "time": "1.07.999",
        "comment": "even faster af boi"
    }
    edit_response = test_client.put(f'/api/v1/user/laptime/edit/{laptime_id}', data=json.dumps(edit_data), headers=headers, content_type='application/json')
    
    assert edit_response.status_code == 200
    assert edit_response.json['msg'] == 'Laptime updated successfully'
    assert edit_response.json['laptime']['title'] == "Updated Test Laptime"
    assert edit_response.json['laptime']['time'] == "1.07.999"
    assert edit_response.json['laptime']['comment'] == "even faster af boi"

    # Verify that unchanged fields remain the same
    assert edit_response.json['laptime']['car'] == "Formula 1 2020"
    assert edit_response.json['laptime']['track'] == "Bathurst"

def test_delete_laptime(test_client, init_database):
    
    login_response = test_client.post('/api/v1/login', data=json.dumps(user), headers=header, content_type='application/json')
    token = login_response.json['token']
    headers = {
        'x-api-key': api_key,
        'Authorization': f'Bearer {token}'
    }

    
    response = test_client.post('/api/v1/user/laptimes', data=json.dumps(laptime_data), headers=headers, content_type='application/json')
    assert response.status_code == 201
    laptime_id = response.json['Laptime Added Successfully']['id']

    
    delete_response = test_client.delete(f'/api/v1/user/laptime/delete/{laptime_id}', headers=headers, content_type='application/json')
    
    assert delete_response.status_code == 200
    assert delete_response.json['msg'] == 'Laptime deleted successfully'

    # Verify that the laptime has been deleted by attempting to retrieve it
    get_response = test_client.get(f'/api/v1/user/laptimes/{laptime_id}', headers=headers, content_type='application/json')
    assert get_response.status_code == 404
    assert 'msg' in get_response.json
    assert get_response.json['msg'] == 'Laptime not found'