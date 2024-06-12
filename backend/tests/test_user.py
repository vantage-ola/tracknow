from flask import json


def test_index(test_client):
    response = test_client.get('/api/v1')
    assert response.status_code == 200
    assert response.json == {"msg": 'Track Now...'}

def test_create_user(test_client, init_database):
    # TODO test cases: create user, existing user,missing parameters.
    new_user = {
        'username': 'testuser',
        'password': 'testpassword'
    }
    response = test_client.post('/api/v1/users', data=json.dumps(new_user), content_type='application/json')
    assert response.status_code == 201
    assert 'Location' in response.headers

def test_existing_user(test_client, init_database):
    existing_user = {
        'username': 'testuser',
        'password': 'testpassword'
    }
    response = test_client.post('/api/v1/users', data=json.dumps(existing_user), content_type='application/json')
    assert response.status_code == 400

def test_login_user_jwt_success(test_client, init_database):
    login_user = {
        'username': 'testuser',
        'password': 'testpassword'
    }
    response = test_client.post('/api/v1/login', data=json.dumps(login_user), content_type='application/json')
    assert response.status_code == 200
    assert 'token' in response.json

def test_login_user_failure(test_client, init_database):
    login_user = {
        'username': 'testuser',
        'password': 'wrongpassword'
    }
    response = test_client.post('/api/v1/login', data=json.dumps(login_user), content_type='application/json')
    assert response.status_code == 401
    assert response.json == {'msg': 'Login Failed'}
