from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timezone

db = SQLAlchemy()

class User(db.Model):

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    nationality = db.Column(db.String(40), nullable=True)
    profile_picture = db.Column(db.String(256), nullable=True)

    laptimes = db.relationship('Laptime', backref='user', lazy=True)
    
    def __repr__(self):
        return f'<User {self.username}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'nationality': self.nationality,
            'profile_picture': self.profile_picture    
        }
    def hash_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    def update_username(self, new_username):
        if User.query.filter_by(username=new_username).first() is not None:
            return False
        self.username = new_username
        db.session.commit()
        return True

    def update_password(self, new_password):
        self.hash_password(new_password)
        db.session.commit()

    def update_nationality(self, new_nationality):
        self.nationality = new_nationality
        db.session.commit()

    def update_profile_picture(self, new_profile_picture_url):
        self.profile_picture = new_profile_picture_url
        db.session.commit()
        
class Laptime(db.Model):

    __tablename__ = 'laptimes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    title = db.Column(db.String(100), nullable=False)
    car = db.Column(db.String(100), nullable=True)
    track = db.Column(db.String(100), nullable=True)

    time = db.Column(db.String(24), nullable=True) #Laptime : string(db cant understand 1.34.4 as float)
    simracing = db.Column(db.Boolean, nullable=False)  # True for simracing, False for real life
    platform = db.Column(db.String(100), nullable=True) # if simracing is true, what simracing title do you set that laptime.
    youtube_link = db.Column(db.String(255), nullable=True) # youtube link or evidence.
    comment = db.Column(db.String(500), nullable=True) # sort of like text body after title
    date_created = db.Column(db.DateTime, nullable=False, default=datetime.now(timezone.utc))
    
    def __repr__(self):
        return f'<Laptime {self.time}>'

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'car': self.car,
            'track': self.track,
            'time': self.time,
            'simracing': self.simracing,
            'platform': self.platform,
            'youtube_link': self.youtube_link,
            'comment': self.comment,
            'date_created': self.date_created.isoformat(),
            'by': self.user.username if self.user else None
        }