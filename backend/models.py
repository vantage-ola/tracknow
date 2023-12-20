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


# Driver Model
class Driver:
    def __init__(self,id, name, nationality):
        self.id = id
        self.name = name
        self.nationality = nationality

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'nationality': self.nationality
        }

# Laptime Model
class Laptime(Car, Driver):
    
    # Inherits the Car id from Car and the driver Id from Driver
    def __init__(self, car_id, track_id, driver_id, time, date):
        # The contructor files form Car and Driver
        Car.__init__(self, id=car_id, name="", body="", car_class="", engine="", hp=0, layout="", racecar=False, transmission="")
        Driver.__init__(self, id=driver_id,  name="", nationality="")

        # Remaining attributes
        self.track_id = track_id
        self.time = time
        self.date = date

    def to_dict(self):
        dict_car = Car.to_dict(self)
        dict_Driver = Driver.to_dict(self)
        return {
            'car_id': dict_car['id'],
            'track_id': self.track_id,
            'driver_id':  dict_Driver['id'],
            'time': self.time,
            'date' : self.date
        }
    def only_tracks(self):
        return {
            'track_id': self.track_id
        }
    def only_drivers(self):
        return {
            'driver_id': self.Car.id
        }
    def only_cars(self):
        return {
            'car_id' : self.Driver.id
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