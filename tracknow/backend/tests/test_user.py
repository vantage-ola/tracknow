import json
from decouple import config

user = {
        'username': 'testuser',
        'password': 'testpassword'
    }

api_key = config("API_KEY")
header = {
        'x-api-key': api_key,
    }

def test_index(test_client):
    response = test_client.get('/api/v1/hello')
    assert response.status_code == 200
    assert response.json == {"msg": 'Track Now...'}

def test_create_user(test_client, init_database):
    response = test_client.post('/api/v1/users', data=json.dumps(user),headers=header, content_type='application/json')
    assert response.status_code == 201
    assert 'Location' in response.headers

def test_existing_user(test_client, init_database):
    response = test_client.post('/api/v1/users', data=json.dumps(user),headers=header, content_type='application/json')
    assert response.status_code == 400

def test_one_user(test_client, init_database):    
    login_response = test_client.post('/api/v1/login', data=json.dumps(user),headers=header, content_type='application/json')
    token = login_response.json['token']

    headers = {
        'x-api-key': api_key,
        'Authorization': f'Bearer {token}'
    }

    response = test_client.get('/api/v1/users/1', headers=headers, content_type='application/json')
    assert response.status_code == 200

def test_all_users(test_client, init_database):
    response = test_client.get('/api/v1/users',headers=header, content_type='application/json')
    assert response.status_code == 200

def test_login_user_jwt_success(test_client, init_database):
    response = test_client.post('/api/v1/login', data=json.dumps(user),headers=header, content_type='application/json')
    assert response.status_code == 200
    assert 'token' in response.json

def test_login_user_jwt_failure(test_client, init_database):
    login_user = {
        'username': 'testuser',
        'password': 'wrongpassword'
    }
    response = test_client.post('/api/v1/login', data=json.dumps(login_user),headers=header, content_type='application/json')
    assert response.status_code == 401
    assert response.json == {'msg': 'Login Failed'}

def test_update_user(test_client, init_database):
    # Login to get the JWT token
    login_response = test_client.post('/api/v1/login', data=json.dumps(user), headers=header, content_type='application/json')
    token = login_response.json['token']

    headers = {
        'x-api-key': api_key,
        'Authorization': f'Bearer {token}'
    }

    # Test updating nationality
    nationality = {"nationality": "Nigerian"}
    response = test_client.put('/api/v1/users/1/update', data=json.dumps(nationality), headers=headers, content_type='application/json')
    assert response.status_code == 200
    assert response.json['msg'] == 'User information updated successfully'
    assert response.json['user']['nationality'] == 'Nigerian'

    # Test updating username
    new_username = {"username": "new_username"}
    response = test_client.put('/api/v1/users/1/update', data=json.dumps(new_username), headers=headers, content_type='application/json')
    assert response.status_code == 200
    assert response.json['msg'] == 'User information updated successfully'
    assert response.json['user']['username'] == 'new_username'

    # Test updating password
    new_password = {"password": "new_password"}
    response = test_client.put('/api/v1/users/1/update', data=json.dumps(new_password), headers=headers, content_type='application/json')
    assert response.status_code == 200
    assert response.json['msg'] == 'User information updated successfully'

    # Test logging in with the new password
    login_response = test_client.post('/api/v1/login', data=json.dumps({"username": "new_username", "password": "new_password"}), headers=header, content_type='application/json')
    assert login_response.status_code == 200
    assert login_response.json['msg'] == 'Login Success'

updated_user = {
        'username': 'new_username',
        'password': 'new_password'
    }

def test_update_user_profile_picture(test_client, init_database):
    # Login to get the JWT token
    login_response = test_client.post('/api/v1/login', data=json.dumps(updated_user), headers=header, content_type='application/json')
    token = login_response.json['token']

    headers = {
        'x-api-key': api_key,
        'Authorization': f'Bearer {token}'
    }

    # Test updating profile picture
    profile_picture_url = {"profile_picture_url": "https://example.com/profile_picture.jpg"}
    response = test_client.put('/api/v1/users/1/profile_picture', data=json.dumps(profile_picture_url), headers=headers, content_type='application/json')
    assert response.status_code == 200
    assert response.json['msg'] == 'Profile picture updated successfully'
    assert response.json['user']['profile_picture'] == 'https://example.com/profile_picture.jpg'
