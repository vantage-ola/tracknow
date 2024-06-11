from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    laptimes = db.relationship('Laptime', backref='user', lazy=True)

    def __repr__(self):
        return f'<User {self.username}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username    
        }
    def hash_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

class Car(db.Model):

    __tablename__ = 'cars'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    car_class = db.Column(db.String(50), nullable=False)
    laptimes = db.relationship('Laptime', backref='car', lazy=True)

    def __repr__(self):
        return f'<Car {self.name}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'car_class': self.car_class    
        }

class Driver(db.Model):

    __tablename__ = 'drivers'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    nationality = db.Column(db.String(50), nullable=False)
    laptimes = db.relationship('Laptime', backref='driver', lazy=True)

    def __repr__(self):
        return f'<Driver {self.name}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'nationality': self.nationality
        }


class Track(db.Model):

    __tablename__ = 'tracks'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    laptimes = db.relationship('Laptime', backref='track', lazy=True)

    def __repr__(self):
        return f'<Track {self.name}>'

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }

class Laptime(db.Model):

    __tablename__ = 'laptimes'

    id = db.Column(db.Integer, primary_key=True)

    car_id = db.Column(db.Integer, db.ForeignKey('cars.id'), nullable=False)
    track_id = db.Column(db.Integer, db.ForeignKey('tracks.id'), nullable=False)
    driver_id = db.Column(db.Integer, db.ForeignKey('drivers.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    time = db.Column(db.Float, nullable=False) #Laptime
    simracing = db.Column(db.Boolean, nullable=False)  # True for simracing, False for real life
    youtube_link = db.Column(db.String(255), nullable=True) # youtube link or evidence.

    def __repr__(self):
        return f'<Laptime {self.time}>'

    def to_dict(self):
        return {
            'id': self.id,
            'car_id': self.car_id,
            'track_id': self.track_id,
            'driver_id': self.driver_id,
            'user_id': self.user_id,
            'time': self.time,
            'simracing': self.simracing,
            'youtube_link': self.youtube_link
        }