import json
from datetime import datetime

# youtube test
def test_youtube_data(test_client, init_database):

    date = datetime.now().date()

    # Make a GET request to the API endpoint with the specified date
    response = test_client.get(f'/api/v1/internet/youtube?date={date}', content_type='application/json')
    
    assert response.status_code == 200