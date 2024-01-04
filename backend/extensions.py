from pymongo import MongoClient
from decouple import config

# mongo db config
MONGO_USERNAME = config('MONGO_USERNAME')
MONGO_PASSWORD = config('MONGO_PASSWORD')
MONGO_URI = config('MONGO_URI')

client =MongoClient(MONGO_URI.format(MONGO_USERNAME,MONGO_PASSWORD))
db = client['track_now'] #Track Now DB