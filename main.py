from flask import Flask, render_template, url_for
from pathlib import Path
from .helpers import is_float_or_int
from geopy.distance import geodesic
import json, os
from dotenv import load_dotenv
import secrets
import random

"""
FLASK INITIIALIZATION
"""
app = Flask(__name__)

BASE = Path(__file__).parent.resolve()
FRONT_END = BASE / 'front-end'

load_dotenv(BASE / '.env')
secret = os.getenv('secret_key')
app.secret_key = secret


# turn json file into python dict
with open(BASE / 'locations.json') as json_file:
    imgdict = json.load(json_file)

padding = 40
scoring = 1000
factor = 2

"""
HTML ROUTES
"""
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/game/')
def game():
    return render_template('game.html')


'''
API ROUTES
'''

# get 5 unique random locations
@app.get('/api/game_sequence')
def game_sequence():
    loc_id_list = [key for key in imgdict]
    random_loc_ids = random.sample(loc_id_list, k=5)
    return {'loc_ids': random_loc_ids}, 200

# return static file based off loc id
@app.get('/api/image_loc/<loc_id>')
def get_image_for_loc(loc_id):
    return {'url':url_for('static', filename= 'images/' + imgdict[loc_id]['image_name'])}, 200

# compare user guess to right answer, compute score based on user guess
@app.post('/api/answer/<loc_id>/<lat>/<lgt>')
def game_answer(loc_id, lat, lgt):
    if not is_float_or_int(lat) or not is_float_or_int(lgt):
        return {'messasge': 'Incorrect values for latitude or longitude'}, 400

    guess_coords = (float(lat), float(lgt))
    actual_coords = ((imgdict[loc_id]['lat']), (imgdict[loc_id]['lng']))

    distance = geodesic(guess_coords, actual_coords).feet

    maxdist = 2000
    score = (((maxdist - distance) + padding) / maxdist)
    if score < 0:
        score = 0
    if score > 1:
        score = 1

    score = score ** factor

    record = {
        'guess':{'lat':float(lat),'lng':float(lgt)},
        'actual':{'lat':imgdict[loc_id]['lat'],'lng':imgdict[loc_id]['lng']},
        'score': int(score * scoring),
        'distance': distance
    }
    return record, 200