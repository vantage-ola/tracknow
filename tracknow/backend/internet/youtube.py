# tweaked changes from https://github.com/youtube/api-samples/blob/master/python/search.py
# simracing, motorsport content from youtube

from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from datetime import datetime, timedelta
from decouple import config
import json

# Set DEVELOPER_KEY to the API key value from the APIs & auth > Registered apps
# tab of https://cloud.google.com/console
DEVELOPER_KEY = config('YOUTUBE_API_KEY')

YOUTUBE_API_SERVICE_NAME = 'youtube'
YOUTUBE_API_VERSION = 'v3'

def youtube_search(country='NG', page_token=None):
    youtube = build(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION,
                    developerKey=DEVELOPER_KEY)

   
    num_day_ago = datetime.now() - timedelta(days=1)
    # Format the date and time as a string in the format required by the API
    published_after = num_day_ago.strftime('%Y-%m-%dT%H:%M:%SZ')

    # Call the search.list method to retrieve results matching the specified
    # query term and published after the specified date and time.
    search_response = youtube.search().list(
        q='simracing motorsports',
        part='id,snippet',
        maxResults=50,
        publishedAfter=published_after,
        regionCode=country,
        pageToken=page_token
    ).execute()

    search_results = json.dumps(search_response, indent=4)

    return search_results
    
def youtube_results():
    all_results = []
    search_results = youtube_search()
    all_results.extend(json.loads(search_results)['items'])

    x = json.loads(search_results)
 
    while 'nextPageToken' in json.loads(search_results):
        next_page_token = json.loads(search_results)['nextPageToken']
        search_results = youtube_search(page_token=next_page_token)
        all_results.extend(json.loads(search_results)['items'])


    return all_results
