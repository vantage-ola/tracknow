from flask import Flask, request,jsonify
from models import Car, Track, Laptime ,Driver
from extensions import db
from function_modules.controllers import to_jsonify, to_jsonify_one
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

    if request.method == 'GET':
        cars =  db.cars.find({}, {'_id': False})
        car_objects = [Car(**car) for car in cars]
        car_dicts = [car.to_dict() for car in car_objects]
        return jsonify(car_dicts)
    
    elif request.method == 'POST':
        data = request.json

        #if inserting multiple data
        if isinstance(data, list):
            # Insert multiple cars
            new_cars = [Car(**car) for car in data]
            result = db.cars.insert_many([car.to_dict() for car in new_cars])
            return jsonify({'message': f'{len(result.inserted_ids)} Cars added successfully!'})

        #only one data
        else:

            new_car = Car(
                id=data['id'],
                name=data['name'],
                body=data['body'],
                car_class=data['car_class'],
                engine=data['engine'],
                hp=data['hp'],
                layout=data['layout'],
                racecar=data['racecar'],
                transmission=data['transmission']
            )
            db.cars.insert_one(new_car.to_dict())
            return jsonify({'message': 'Car added successfully!'})


@app.route('/api/tracks', methods=['GET', 'POST'])
def handle_tracks():

    if request.method == 'GET':
        tracks = db.tracks.find({}, {'_id': False})
        track_objects = [Track(**track) for track in tracks]
        track_dicts = [track.to_dict() for track in track_objects]
        return jsonify(track_dicts)
    
    elif request.method == 'POST':
        
        data = request.json
        
        if isinstance(data, list):
            new_tracks = [Track(**track) for track in data]
            result = db.tracks.insert_many([track.to_dict() for track in new_tracks])
            
            return jsonify({'message': f'{len(result.inserted_ids)} Tracks added successfully!'})

        else:            
            new_track = Track(
                id=data['id'],
                name=data['name'],
                location=data['location'],
                grade=data['grade'],
                length=data['length']
            )
            db.tracks.insert_one(new_track.to_dict())
            return jsonify({'message': 'Track added successfully!'})



@app.route('/api/drivers', methods=['GET', 'POST'])
def handle_drivers():

    if request.method == 'GET':
        drivers = db.drivers.find({}, {'_id': False})
        driver_objects = [Driver(**driver) for driver in drivers]
        driver_dicts = [driver.to_dict() for driver in driver_objects]
        return jsonify(driver_dicts)
    
    elif request.method == 'POST':
        data = request.json
        
        if isinstance(data, list):
            new_drivers = [Driver(**driver) for driver in data]
            result = db.drivers.insert_many([driver.to_dict() for driver in new_drivers])
            
            return jsonify({'message': f'{len(result.inserted_ids)} Drivers added successfully!'})

        else:            
            new_driver = Driver(
                id=data['id'],
                name=data['name'],
                nationality=data['nationality']
            )
            db.drivers.insert_one(new_driver.to_dict())
            return jsonify({'message': 'Driver added successfully!'})


@app.route('/api/laptimes', methods=['GET', 'POST'])
def handle_laptimes():

    if request.method == 'GET':
        laptimes = db.laptimes.find({}, {'_id': False})
        laptime_objects = [Laptime(**laptime) for laptime in laptimes]
        laptime_dicts = [laptime.to_dict() for laptime in laptime_objects]
        return jsonify(laptime_dicts)
    
    elif request.method == 'POST':
        data = request.json
        
        if isinstance(data, list):
            new_laptimes = [Laptime(**laptime) for laptime in data]
            result = db.laptimes.insert_many([laptime.to_dict() for laptime in new_laptimes])
            
            return jsonify({'message': f'{len(result.inserted_ids)} Laptimes added successfully!'})

        else:            
            new_laptime = Laptime(
                car_id=data['car_id'],
                track_id=data['track_id'],
                driver_id=data['driver_id'],
                time=data['time'],
                date=data['date']
            )
            db.laptimes.insert_one(new_laptime.to_dict())
            return jsonify({'message': 'Laptime added successfully!'})

#`api/collection/<collection_id>` routes GET all entries`

@app.route('/api/cars/<car_id>', methods=['GET'])
def handle_single_car(car_id):
    car_id = int(car_id)

    if request.method == 'GET':
        car = to_jsonify_one(car_id, db.cars, 'id', 'Car')

        return car
        
@app.route('/api/tracks/<track_id>', methods=['GET'])
def handle_single_track(track_id):

    track_id = str(track_id) #id json is in string form lol {..."id": "1"}

    if request.method == 'GET':

        track = to_jsonify_one(track_id, db.tracks, 'id', 'Track')

        return track
        
@app.route('/api/drivers/<driver_id>', methods=['GET'])
def handle_single_driver(driver_id):

    driver_id = int(driver_id)

    if request.method == 'GET':

        driver = to_jsonify_one(driver_id, db.drivers, 'id', 'Driver')

        return driver

#`api/collection/<collection_id>/collections` routes GET all entries`
# cars/<car_id>/*
@app.route('/api/cars/<car_id>/tracks', methods=['GET'])
def get_tracks_for_car(car_id):

    car_id = int(car_id)

    if request.method == 'GET':
        #find <car_id> in Laptimes
        tracks_laptime_dicts = to_jsonify(car_id, db.laptimes, Laptime, 'car_id', 'track_id')
        if tracks_laptime_dicts:
        #convert the gotten track_ids to str, {"id" : "33"}
            list_of_tracks_id= [str(laptime_dict.get('track_id')) for laptime_dict in tracks_laptime_dicts]
        # Use $in to find tracks with matching track_ids
            tracks = db.tracks.find({'id': {'$in': list_of_tracks_id}}, {'_id': False})
            track_dicts = [track for track in tracks]
        # Convert the result to a list of dictionaries
            return jsonify(track_dicts)
        else:
             return jsonify({'message': 'Record not found!'}), 404

@app.route('/api/cars/<car_id>/drivers', methods=['GET'])
def get_drivers_for_car(car_id):

    car_id = int(car_id)

    if request.method == 'GET':

        driver_car_dicts = to_jsonify(car_id, db.laptimes, Laptime, 'car_id', 'driver_id')
        
        if driver_car_dicts:
            list_of_drivers_id= [laptime_dict.get('driver_id') for laptime_dict in driver_car_dicts]

            drivers = db.drivers.find({'id': {'$in': list_of_drivers_id}}, {'_id': False})
            driver_dicts = [driver for driver in drivers]

            return jsonify(driver_dicts)
        else:
            return jsonify({'message': 'Record not found!'}), 404

# drivers/driver_id/*
@app.route('/api/drivers/<driver_id>/cars', methods=['GET'])
def get_cars_for_drivers(driver_id):

    driver_id = int(driver_id)

    if request.method == 'GET':
        car_dicts = to_jsonify(driver_id, db.laptimes, Laptime, 'driver_id', 'car_id')

        if car_dicts:
            list_of_cars_id = [laptime_dict.get('car_id') for laptime_dict in car_dicts]

            cars = db.cars.find({'id': {'$in': list_of_cars_id}}, {'_id': False})
            car_dicts = [car for car in cars]

            return jsonify(car_dicts)        
        else:       
            return jsonify({'message': 'Record not found!'}), 404

@app.route('/api/drivers/<driver_id>/tracks', methods=['GET'])
def get_tracks_for_drivers(driver_id):

    driver_id = int(driver_id)

    if request.method == 'GET':

        track_driver_dicts = to_jsonify(driver_id, db.laptimes, Laptime, 'driver_id', 'track_id')

     

        if track_driver_dicts:
            list_of_tracks_id = [str(laptime_dict.get('track_id')) for laptime_dict in track_driver_dicts]
            print("List of IDs: ", list_of_tracks_id)
            tracks = db.tracks.find({'id': {'$in': list_of_tracks_id}}, {'_id': False})
            track_dicts = [track for track in tracks]
            return jsonify(track_dicts)
        else:
            return jsonify({'message': 'Record not found!'}), 404

# tracks/track_id/*
@app.route('/api/tracks/<track_id>/cars', methods=['GET'])
def get_cars_for_tracks(track_id):

    track_id = int(track_id)
    
    if request.method == 'GET':
        car_track_dicts = to_jsonify(track_id, db.laptimes, Laptime, 'track_id', 'car_id')

        if car_track_dicts:
            list_of_cars_id = [laptime_dict.get('car_id') for laptime_dict in car_track_dicts]

            cars = db.cars.find({'id': {'$in': list_of_cars_id}}, {'_id' : False})
            cars_dict = [car for car in cars]

            return jsonify(cars_dict)
        else:
            return jsonify({'message': 'Record not found!'}), 404

@app.route('/api/tracks/<track_id>/drivers', methods=['GET'])
def get_drivers_for_tracks(track_id):

    track_id = int(track_id)
    
    if request.method == 'GET':
        driver_track_dicts = to_jsonify(track_id, db.laptimes, Laptime, 'track_id', 'driver_id')

        if driver_track_dicts:
            list_of_drivers_id = [laptime_dict.get('driver_id') for laptime_dict in driver_track_dicts]

            drivers = db.drivers.find({'id': {'$in': list_of_drivers_id}}, {'_id' : False})
            drivers_dict = [driver for driver in drivers]

            return jsonify(drivers_dict)
        else:
            return jsonify({'message': 'Record not found!'}), 404


if __name__ == '__main__':
    app.run(debug = True)
