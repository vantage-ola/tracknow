from flask import Flask
from error_handle import *
from models import db
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_swagger_ui import get_swaggerui_blueprint
from routes import routes 
from flask_cors import CORS
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger
import atexit
import json
from datetime import datetime, timezone
from motorsport.formula_1 import get_driver_standings, get_team_standings
from internet.youtube import youtube_results
from config import redis_instance

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
    app.register_blueprint(routes)  # Register the routes blueprint

    scheduler = BackgroundScheduler()
    
    trigger = CronTrigger(day_of_week='*', hour=18, minute=0, timezone=timezone.utc)    
    scheduler.add_job(update_f1_standings, trigger)
    scheduler.add_job(update_youtube_data, trigger)

    # Start the scheduler
    scheduler.start()

    # Shut down the scheduler when exiting the app
    atexit.register(lambda: scheduler.shutdown())
    
    return app

def update_f1_standings():
    r = redis_instance()

    current_year = datetime.now().year

    team_data = get_team_standings()
    r.set(f"f1_constructors_{current_year}", json.dumps(team_data))

    driver_data = get_driver_standings()
    r.set(f"f1_drivers_{current_year}", json.dumps(driver_data))

def update_youtube_data():
    r = redis_instance()

    today_date = datetime.now().date()
    youtube_data = youtube_results()

    r.set(f"youtube_data_{today_date}", json.dumps(youtube_data))

app = create_app()


if __name__ == '__main__':
    app.run(debug=True)
