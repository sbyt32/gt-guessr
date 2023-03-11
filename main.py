from flask import Flask, render_template
from pathlib import Path
from .helpers import is_float_or_int
import json, os
from dotenv import load_dotenv

"""
FLASK INITIIALIZATION
"""
app = Flask(__name__)

BASE = Path(__file__).parent.resolve()
FRONT_END = BASE / 'front-end'

load_dotenv()

app.secret_key = os.getenv('secret_key')

"""
ROUTES AND LOGIC
"""
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/game')
def game():
    return render_template('game.html')

@app.get('/api/game_sequence')
def game_sequence():
    return {'lat_ids': [1, 2, 3, 4, 5]}, 200

@app.post('/api/answer/<lat>/<lgt>')
def game_answer(lat, lgt):
    if not is_float_or_int(lat) or not is_float_or_int(lgt):
        return {'messasge': 'Incorrect values for latitude or longitude'}, 400

    lat, lgt = float(lat), float(lgt)

    record = {'guess': {'lat':lat, 'lgt':lgt}, 'actual': {'lat':lat, 'lgt':lgt}, 'score': 100}
    print(record)
    return record, 201