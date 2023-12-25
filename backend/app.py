from flask import Flask, request,jsonify
from pymongo import MongoClient
from decouple import config
from models import Car, Track, Laptime ,Driver
from bson import ObjectId
from extensions import db
# from function_modules.validitor import to_jsonify


app = Flask(__name__)



#mongo db config
# MONGO_USERNAME = config('MONGO_USERNAME')
# MONGO_PASSWORD = config('MONGO_PASSWORD')

# client =MongoClient("mongodb+srv://{}:{}@cluster0.j1gr1sc.mongodb.net/?retryWrites=true&w=majority".format(MONGO_USERNAME,MONGO_PASSWORD))
# db = client['track_now'] #Track Now DB


# missing error handling* (404, 500, 200...)

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

        car = db.cars.find_one({'id': car_id}, {'_id': False})

        if car:
            return jsonify(car)
        else:
            return jsonify({'message': 'Car not found'}), 404
        
@app.route('/api/tracks/<track_id>', methods=['GET'])
def handle_single_track(track_id):

    track_id = str(track_id) #id json is in string form lol {..."id": "1"}

    if request.method == 'GET':

        track = db.tracks.find_one({'id': track_id}, {'_id': False})

        if track:
            return jsonify(track)
        else:
            return jsonify({'message': 'Track not found'}), 404
        
@app.route('/api/drivers/<driver_id>', methods=['GET'])
def handle_single_driver(driver_id):

    driver_id = int(driver_id)

    if request.method == 'GET':

        driver = db.drivers.find_one({'id': driver_id}, {'_id': False})

        if driver:
            return jsonify(driver)
        else:
            return jsonify({'message': 'Driver not found'}), 404

#`api/collection/<collection_id>/collections` routes GET all entries`
@app.route('/api/cars/<car_id>/tracks', methods=['GET'])
def get_tracks_for_car(car_id):
    
    car_id = int(car_id)

    if request.method == 'GET':
        #find <car_id> in Laptimes
        car_laptimes = db.laptimes.find({'car_id': car_id}, {'_id': False})
        
        #Laptime only contains the references
        car_laptime_objects = [Laptime(**car_laptime) for car_laptime in car_laptimes]

        #return only track_id
        tracks_laptime_dicts = [laptime.only_tracks() for laptime in car_laptime_objects]

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

        car_laptimes = db.laptimes.find({'car_id': car_id}, {'_id': False})
        
        car_laptime_objects = [Laptime(**car_laptime) for car_laptime in car_laptimes]

        driver_laptime_dicts = [laptime.only_drivers() for laptime in car_laptime_objects]
        
        if driver_laptime_dicts:
            list_of_drivers_id= [laptime_dict.get('driver_id') for laptime_dict in driver_laptime_dicts]

            drivers = db.drivers.find({'id': {'$in': list_of_drivers_id}}, {'_id': False})
            driver_dicts = [driver for driver in drivers]

            return jsonify(driver_dicts)
        else:
            return jsonify({'message': 'Record not found!'}), 404

@app.route('/api/drivers/<driver_id>/cars', methods=['GET'])
def get_cars_for_drivers(driver_id):

    driver_id = int(driver_id)

    if request.method == 'GET':

        driver_laptimes = db.laptimes.find({'driver_id': driver_id}, {'_id': False})

        driver_laptime_objects = [Laptime(**driver_laptime) for driver_laptime in driver_laptimes]

        cars_laptime_dicts = [laptime.only_cars() for laptime in driver_laptime_objects]

        if cars_laptime_dicts:
            list_of_cars_id = [laptime_dict.get('car_id') for laptime_dict in cars_laptime_dicts]

            cars = db.cars.find({'id': {'$in': list_of_cars_id}}, {'_id': False})
            car_dicts = [car for car in cars]

            return jsonify(car_dicts)        
        else:       
            return jsonify({'message': 'Record not found!'}), 404


@app.route('/api/drivers/<driver_id>/tracks', methods=['GET'])
def get_tracks_for_drivers(driver_id):
        
    driver_id = int(driver_id)

    if request.method == 'GET':

        driver_laptimes = db.laptimes.find({'driver_id': driver_id}, {'_id': False})

        driver_laptime_objects = [Laptime(**driver_laptime) for driver_laptime in driver_laptimes]

        tracks_laptime_dicts = [laptime.only_tracks() for laptime in driver_laptime_objects]

     

        if tracks_laptime_dicts:
        #print(tracks_laptime_dicts)
            list_of_tracks_id = [str(laptime_dict.get('track_id')) for laptime_dict in tracks_laptime_dicts]
            print("List of IDs: ", list_of_tracks_id)
            tracks = db.tracks.find({'id': {'$in': list_of_tracks_id}}, {'_id': False})
            track_dicts = [track for track in tracks]
            return jsonify(track_dicts)
        else:
            return jsonify({'message': 'Record not found!'}), 404 


if __name__ == '__main__':
    app.run(debug = True)
