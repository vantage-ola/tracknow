## BACKEND DOCUMENTATION

I am assuming you have python3 installed and are in this directory. ```tracknow/backend```

### 1. Setup a virtual environment in this directory.
``` shell 
    pip install virtualenv # assuming virtualenv is not installed
    python3 -m venv <virtual-environment-name> # python3 -m venv .venv
```
### 2. Activate virtual environment and install dependencies.
``` shell
    source <virtual-environment-name>/bin/activate # -> (mac/linux) different for windows os. check google :)
    pip install requirements.txt
```
### 3. Environment variables.
``` shell
    touch .env # Create environment file .env 
```
Fill in the environment variables
``` shell
    PG=postgres://username:password@hostname:port/databasename
    JWT_SECRET_KEY=xxxxxxxxxxx7544b278e10f5e44e8d861
    SECRET_KEY=xxxxxxxxxxxxxxxxxxx0ddd7861e9c0697513
    TESTING_PG=postgres://username:password@hostname:port/testdatabasename #dont use the same database, create a new one for testing !
    TESTING_JWT_SECRET_KEY=xxxxxxxxx9612c6808732
    TESTING_SECRET_KEY=xxxxxxxx104af944ae4f60
```
### 4. Create the database and start the server.
``` shell
    flask shell 
    db.create_all()
    quit()
```
Create a migrations script, so changes to models.py will automatically changed in the database.
``` shell
    flask db init
    flask db migrate -m "after every change to the db schema"
    flask db upgrade
```
Start the server
``` shell
    flask run # or python3 app.py 
```
### 5. Swagger Documentation for the TrackNow API
After the server is running, check this route for more detailed documentation for the API endpoints.
```localhost:5000/api/v1/docs```