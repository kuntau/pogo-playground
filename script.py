import requests
import json
from pprint import pprint

url = "https://api.fastpokemap.se"
headers = { "origin": "https://fastpokemap.se", "accept": "application/json, text/javascript" }
coord_lat = 2.934983437479131
coord_lng = 101.68961405754091
params = { "lat": coord_lat, "lng": coord_lng, "ts": 0, "key": "allow-all" }

r = requests.get(url, headers=headers, params=params)
with open('dump.json', 'w') as f:
    json.dump(r, f)
# print r.text
# r.json()
