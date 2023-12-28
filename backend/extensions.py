from pymongo import MongoClient
from decouple import config

# mongo db config
MONGO_USERNAME = config('MONGO_USERNAME')
MONGO_PASSWORD = config('MONGO_PASSWORD')

client =MongoClient("mongodb+srv://{}:{}@cluster0.j1gr1sc.mongodb.net/?retryWrites=true&w=majority".format(MONGO_USERNAME,MONGO_PASSWORD))
db = client['track_now'] #Track Now DB