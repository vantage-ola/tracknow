from flask import Blueprint, request, jsonify, url_for
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity
from models import db, User, Laptime

routes = Blueprint('routes', __name__)

@routes.route('/api/v1/hello', methods=['GET'])
def index():
    return jsonify({"msg": 'Track Now...'})

@routes.route('/api/v1/users', methods=['POST'])
def new_user():
    new_user = request.get_json()
    if new_user['username'] is None or new_user['password'] is None:
        return jsonify({"msg": "Missing required fields"}), 400

    if User.query.filter_by(username=new_user['username']).first() is not None:
        return jsonify({"msg": "User Exists"}), 400

    user = User(username=new_user['username'])
    user.hash_password(new_user['password'])

    db.session.add(user)
    db.session.commit()

    return (jsonify({'username': user.username}), 201,
            {'Location': url_for('routes.get_user', id=user.id, _external=True)})

@routes.route('/api/v1/login', methods=['POST'])
def login_user():
    login_user = request.get_json()
    user = User.query.filter_by(username=login_user['username']).first()
    if user and user.verify_password(login_user['password']):
        access_token = create_access_token(identity=user.id)
        return jsonify({'msg': 'Login Success', 'token': access_token})
    else:
        return jsonify({'msg': 'Login Failed'}), 401

@routes.route('/api/v1/users/<int:id>', methods=['GET'])
@jwt_required()
def get_user(id):
    user = User.query.get(id)
    if not user:
        return jsonify({'msg': "User does not exist."})
    return jsonify({'username': user.username})

@routes.route('/api/v1/users', methods=['GET'])
def get_users():
    users = User.query.filter_by().all()
    return jsonify([u.to_dict() for u in users]), 200

@routes.route('/api/v1/protected', methods=['GET'])
@jwt_required()
def get_identity():
    user_id = get_jwt_identity()
    user = User.query.filter_by(id=user_id).first()
    if user:
        return jsonify({'message': 'User found', 'name': user.username})
    else:
        return jsonify({'message': 'User not found'}), 404

@routes.route('/api/v1/user/laptimes', methods=['POST'])
@jwt_required()
def add_laptime():
    user_id = get_jwt_identity()
    loggedin_user = User.query.filter_by(id=user_id).first()
    
    laptime_data = request.get_json()

    car = laptime_data['car']
    track = laptime_data['track']
    time = laptime_data['time']
    simracing = laptime_data['simracing']
    platform = laptime_data['platform']
    youtube_link = laptime_data['youtube_link']
    comment = laptime_data['comment']

    if not car or not track or not time:
        return jsonify({'msg': 'Missing required fields'}), 400

    laptime = Laptime(
        user_id=user_id,
        car=car,
        track=track,
        time=time,
        simracing=simracing,
        platform=platform,
        youtube_link=youtube_link,
        comment=comment
    )

    db.session.add(laptime)
    db.session.commit()

    return jsonify({"Laptime Added Successfully": laptime.to_dict(), "by": loggedin_user.username}), 201

@routes.route('/api/v1/user/laptimes', methods=['GET'])
@jwt_required()
def get_user_laptimes():
    user_id = get_jwt_identity()
    laptimes = Laptime.query.filter_by(user_id=user_id).all()
    
    return jsonify([lt.to_dict() for lt in laptimes]), 200

@routes.route('/api/v1/user/laptimes/<id>', methods=['GET'])
@jwt_required()
def get_user_laptime(id):
    user_id = get_jwt_identity()
    laptime = Laptime.query.filter_by(id=id, user_id=user_id).first()
    return jsonify(laptime.to_dict()), 200

@routes.route('/api/v1/laptimes', methods=['GET'])
def get_laptimes():
    laptimes = Laptime.query.filter_by().all()
    return jsonify([lt.to_dict() for lt in laptimes]), 200

@routes.route('/api/v1/laptimes/<id>', methods=['GET'])
@jwt_required()
def get_laptime(id):
    laptime = Laptime.query.filter_by(id=id).first()
    return jsonify(laptime.to_dict()), 200
