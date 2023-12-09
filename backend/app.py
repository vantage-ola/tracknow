from flask import Flask, request,jsonify
from pymongo import MongoClient
from decouple import config

from models import Car, Track


app = Flask(__name__)

#mongo db config
MONGO_USERNAME = config('MONGO_USERNAME')
MONGO_PASSWORD = config('MONGO_PASSWORD')

client =MongoClient("mongodb+srv://{}:{}@cluster0.j1gr1sc.mongodb.net/?retryWrites=true&w=majority".format(MONGO_USERNAME,MONGO_PASSWORD))
db = client['track_now'] #Track Now DB




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



if __name__ == '__main__':
    app.run(debug = True)
