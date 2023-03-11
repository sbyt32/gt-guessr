from flask import Flask, render_template
from pathlib import Path
import os

app = Flask(__name__)

BASE = Path(__file__).parent.resolve()
FRONT_END = BASE / 'front-end'

@app.route('/')
def hello_world():
    return render_template('index.html')