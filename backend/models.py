#TRACK_NOW mongo models
class Car:
    def __init__(self, id, name, body, car_class, engine, hp, layout, racecar, transmission):
        self.id = id
        self.name = name
        self.body = body
        self.car_class = car_class
        self.engine = engine
        self.hp = hp
        self.layout = layout
        self.racecar = racecar
        self.transmission = transmission

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'body': self.body,
            'car_class': self.car_class,
            'engine': self.engine,
            'hp': self.hp,
            'layout': self.layout,
            'racecar': self.racecar,
            'transmission': self.transmission
        }

# Laptime Model
class Laptime:
    def __init__(self, car_id, track_id, driver_name, time):
        self.car_id = car_id
        self.track_id = track_id
        self.driver_name = driver_name
        self.time = time

    def to_dict(self):
        return {
            'car_id': self.car_id,
            'track_id': self.track_id,
            'driver_name': self.driver_name,
            'time': self.time
        }

# Driver Model
class Driver:
    def __init__(self, name, nationality):
        self.name = name
        self.nationality = nationality

    def to_dict(self):
        return {
            'name': self.name,
            'nationality': self.nationality
        }

# Track Model
class Track:
    def __init__(self, id, name, location, grade, length):
        self.id = id
        self.name = name
        self.location = location
        self.grade = grade
        self.length = length

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'location': self.location,
            'grade': self.grade,
            'length': self.length
        }