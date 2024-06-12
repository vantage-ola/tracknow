from flask import Flask, abort, request,jsonify,  url_for
from error_handle import *
from models import db, User
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity


def create_app(config_class='config.Config'):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    db.init_app(app)
    migrate = Migrate(app, db)
    jwt = JWTManager(app)

    with app.app_context():
        db.create_all()

    app.register_error_handler(400, handle_bad_request)
    app.register_error_handler(401, handle_unauthorized)
    app.register_error_handler(403, handle_forbidden)
    app.register_error_handler(404, handle_not_found)
    app.register_error_handler(405, handle_method_not_allowed)
    app.register_error_handler(500, handle_internal_server_error)
    app.register_error_handler(503, handle_service_unavailable)

    # Hello :)
    @app.route('/api/v1', methods=['GET'])
    def index():
        return jsonify({"msg": 'Track Now...'})

    # Create a new user with username and password.
    @app.route('/api/v1/users', methods=['POST'])
    def new_user():
        new_user = request.get_json()
        # { "username" : "your_username",
        #   "password" :  "your_password"}  
        if new_user['username'] is None or new_user['password'] is None:
            abort(400)
            # TODO return missing  parameters json
        if User.query.filter_by(username=new_user['username']).first() is not None:
            abort(400)
            # TODO return existing user json

        user = User(username=new_user['username'])
        user.hash_password(new_user['password'])

        db.session.add(user)
        db.session.commit()

        return (jsonify({'username': user.username}), 201,
                {'Location': url_for('get_user', id=user.id, _external=True)})
    
    # Login to tracknow with username and password.
    @app.route('/api/v1/login', methods=['POST'])
    def login_user():
        login_user = request.get_json()
        user = User.query.filter_by(username=login_user['username']).first()
        # check if user and correct password exists, create a jwt token if successful
        if user and user.verify_password(login_user['password']):
            access_token = create_access_token(identity=user.id)
            return jsonify({'msg': 'Login Sucesss', 'token': access_token})
        else:
            return jsonify({'msg': 'Login Failed'}), 401

    # Route to check if you exist on the database.   
    @app.route('/api/v1/users/<int:id>')
    def get_user(id):
        user = User.query.get(id)
        if not user:
            abort(400)
        return jsonify({'username': user.username})

    # Route to check if we are logged in with our unique jwt token 
    @app.route('/api/v1/protected', methods=['GET'])
    # Include bearer token from login_user() to  verify we are logged in and are in session
    @jwt_required()
    def get_identity():
        user_id = get_jwt_identity()
        user = User.query.filter_by(id=user_id).first()

        # Check if user exists
        if user:
            return jsonify({'message': 'User found', 'name': user.username})
        else:
            return jsonify({'message': 'User not found'}), 404
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug = True)
