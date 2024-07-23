import datetime
from decouple import config
import requests

current_year = datetime.datetime.now().year


api_url = 'https://f1-live-motorsport-data.p.rapidapi.com'

team_standings = f"{api_url}/constructors/standings/{current_year}"
driver_standings =  f"{api_url}/drivers/standings/{current_year}"

headers = {
    "x-rapidapi-key": config('FORMULA_1_KEY'),
    "x-rapidapi-host": "f1-live-motorsport-data.p.rapidapi.com"
}

def get_team_standings():
    response = requests.get(team_standings, headers=headers)
    team = response.json()
    return team

def get_driver_standings():
    response = requests.get(driver_standings, headers=headers)
    driver = response.json()
    return driver
