from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello, World'

@app.route('/api/cars')
def get_cars():
    cars =[{'id': 1, 'name': 'Mercedes-AMG One'}]
    return jsonify(cars)

@app.route('/api/tracks')
def get_tracks():
    tracks =[{'id': 1, 'name': 'Nürburgring Nordschleife', 'distance' : '12.8mi'}]
    return jsonify(tracks)

if __name__ == '__main__':
    app.run(debug = True)
