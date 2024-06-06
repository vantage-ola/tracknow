from flask import Flask, request,jsonify
from error_handle import *



app = Flask(__name__)


#error_handling

app.register_error_handler(400, handle_bad_request)
app.register_error_handler(401, handle_unauthorized)
app.register_error_handler(403, handle_forbidden)
app.register_error_handler(404, handle_not_found)
app.register_error_handler(405, handle_method_not_allowed)
app.register_error_handler(500, handle_internal_server_error)
app.register_error_handler(503, handle_service_unavailable)



#`api/collections` routes GET&POST all entries`
@app.route('/api/cars', methods=['GET', 'POST'])
def handle_cars():
    pass


@app.route('/api/tracks', methods=['GET', 'POST'])
def handle_tracks():
    pass


@app.route('/api/drivers', methods=['GET', 'POST'])
def handle_drivers():
    pass

@app.route('/api/laptimes', methods=['GET', 'POST'])
def handle_laptimes():
    pass

#`api/collection/<collection_id>` routes GET all entries`

@app.route('/api/cars/<car_id>', methods=['GET'])
def handle_single_car(car_id):
    pass

@app.route('/api/tracks/<track_id>', methods=['GET'])
def handle_single_track(track_id):
    pass
        
@app.route('/api/drivers/<driver_id>', methods=['GET'])
def handle_single_driver(driver_id):
    pass

#`api/collection/<collection_id>/collections` routes GET all entries`
# cars/<car_id>/*
@app.route('/api/cars/<car_id>/tracks', methods=['GET'])
def get_tracks_for_car(car_id):
    pass

@app.route('/api/cars/<car_id>/drivers', methods=['GET'])
def get_drivers_for_car(car_id):
    pass

# drivers/driver_id/*
@app.route('/api/drivers/<driver_id>/cars', methods=['GET'])
def get_cars_for_drivers(driver_id):
    pass

@app.route('/api/drivers/<driver_id>/tracks', methods=['GET'])
def get_tracks_for_drivers(driver_id):
    pass

# tracks/track_id/*
@app.route('/api/tracks/<track_id>/cars', methods=['GET'])
def get_cars_for_tracks(track_id):
    pass

@app.route('/api/tracks/<track_id>/drivers', methods=['GET'])
def get_drivers_for_tracks(track_id):
    pass


if __name__ == '__main__':
    app.run(debug = True)
