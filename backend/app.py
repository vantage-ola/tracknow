from flask import Flask, request, Response
from pymongo import MongoClient
from decouple import config
from bson.json_util import dumps


app = Flask(__name__)

#mongo db config
MONGO_USERNAME = config('MONGO_USERNAME')
MONGO_PASSWORD = config('MONGO_PASSWORD')

client =MongoClient("mongodb+srv://{}:{}@cluster0.j1gr1sc.mongodb.net/?retryWrites=true&w=majority".format(MONGO_USERNAME,MONGO_PASSWORD))
db = client['track_now'] #Track Now DB




@app.route('/api/cars')
def get_cars():
    cars = list(db.cars.find())
    response = Response(response=dumps(cars), status=200, mimetype="application/json")

    return response
if __name__ == '__main__':
    app.run(debug = True)
