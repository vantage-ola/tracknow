from flask import Flask, request, jsonify, url_for
from error_handle import *
from models import db, User, Laptime
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from flask_swagger_ui import get_swaggerui_blueprint
from flask_cors import CORS

# swagger setup
SWAGGER_URL="/api/v1/docs"
API_URL="/static/swagger.json"

swagger_ui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={
        'app_name': 'Track Now API v1'
    }
)

def create_app(config_class='config.Config'):
    app = Flask(__name__)
    CORS(app)
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
    app.register_blueprint(swagger_ui_blueprint, url_prefix=SWAGGER_URL)

    # Hello :)
    @app.route('/api/v1/hello', methods=['GET'])
    def index():
        return jsonify({"msg": 'Track Now...'})

    # Create a new user with username and password.
    @app.route('/api/v1/users', methods=['POST'])
    def new_user():
        new_user = request.get_json()
        # { "username" : "your_username",
        #   "password" :  "your_password"}  
        if new_user['username'] is None or new_user['password'] is None:
            return jsonify({"msg" : "Missing requiring fields"}), 400
        
        if User.query.filter_by(username=new_user['username']).first() is not None:
            return jsonify({"msg" : "User Exists"}), 400

        user = User(username=new_user['username']) #  nationality=new_user['nationality']
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

    # Route to check someone on the database.   
    @app.route('/api/v1/users/<int:id>', methods=['GET'])
    @jwt_required()
    def get_user(id):
        user = User.query.get(id)
        if not user:
            return jsonify({'msg': "User does not exist."})
        return jsonify({'username': user.username})
    
    # Route to list all users
    @app.route('/api/v1/users', methods=['GET'])
    def get_users():
        users = User.query.filter_by().all()
        return jsonify([u.to_dict() for u in users]), 200

    # Route to check if we are logged in with our unique jwt token.
    @app.route('/api/v1/protected', methods=['GET'])
    # Include bearer token from login_user() to  verify we are logged in and are in session.
    @jwt_required()
    def get_identity():
        user_id = get_jwt_identity()
        user = User.query.filter_by(id=user_id).first()

        # Check if user exists
        if user:
            return jsonify({'message': 'User found', 'name': user.username})
        else:
            return jsonify({'message': 'User not found'}), 404
    
    # Logged in user adds laptime.
    @app.route('/api/v1/user/laptimes', methods=['POST'])
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

    # Logged in user gets all the laptimes they posted on tracknow.
    @app.route('/api/v1/user/laptimes', methods=['GET'])
    @jwt_required()
    def get_user_laptimes():
        user_id = get_jwt_identity()
        laptimes = Laptime.query.filter_by(user_id=user_id).all()
        
        return jsonify([lt.to_dict() for lt in laptimes]), 200

    # Logged in user gets one laptime they selected.
    @app.route('/api/v1/user/laptimes/<id>', methods=['GET'])
    @jwt_required()
    def get_user_laptime(id):
        user_id = get_jwt_identity()
        laptime = Laptime.query.filter_by(id=id, user_id=user_id).first()
        return jsonify(laptime.to_dict()), 200
    
    # Global - get all laptimes posted around the world.
    @app.route('/api/v1/laptimes', methods=['GET'])
    def get_laptimes():

        laptimes = Laptime.query.filter_by().all()
        
        return jsonify([lt.to_dict() for lt in laptimes]), 200

    # Global - get one laptime selected.
    @app.route('/api/v1/laptimes/<id>', methods=['GET'])
    @jwt_required()
    def get_laptime(id):

        laptime = Laptime.query.filter_by(id=id).first()
        return jsonify(laptime.to_dict()), 200
    

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug = True)
