import datetime
from decouple import config
import requests

current_year = datetime.datetime.now().year


#https://rapidapi.com/sportcontentapi/api/f1-live-motorsport-data
#api_url = 'https://f1-live-motorsport-data.p.rapidapi.com'
"""headers = {
    "x-rapidapi-key": config('FORMULA_1_KEY'),
    "x-rapidapi-host": "f1-live-motorsport-data.p.rapidapi.com"
}"""


api_url = 'https://ergast.com/api/f1/current'
team_standings = f"{api_url}/constructorStandings.json"
driver_standings =  f"{api_url}/driverStandings.json"


def get_team_standings():
    response = requests.get(team_standings)
    team = response.json()
    return team

def get_driver_standings():
    response = requests.get(driver_standings)
    driver = response.json()
    return driver
