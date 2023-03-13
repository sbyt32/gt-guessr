from fastapi import APIRouter, Response, Depends
from functools import lru_cache
from fastapi.responses import FileResponse
from geopy.distance import geodesic
from gtguessr.models import GameScore, GameRecord, GamePoint

import json
import random

MAX_DIST = 2500
FACTOR = 1.8
SCORING = 1000
PADDING = 80

router = APIRouter()

@lru_cache
def get_images():
    with open('./locations.json') as loc_fp:
        imgdict = json.load(loc_fp)
    return imgdict

@router.get(
    '/game_sequence/',
    description="Get 5 unique random locations"
)
def game_sequence(imgdict = Depends(get_images)):

    loc_id_list = [key for key in imgdict]
    random_loc_ids = random.sample(loc_id_list, k=5)
    return {'loc_ids': random_loc_ids}

@router.get(
    path='/image_loc/{loc_id}',
    description="Return image based on loc id",
    response_class=FileResponse)
def get_img_loc(loc_id):
    return f'./images/{loc_id}.JPG'

@router.post(
    path='/answer/{loc_id}/{lat}/{long}',
    description="Compute User vs Answer, parse score based on distance."
)
async def parse_answer(loc_id:str, lat, long, imgdict = Depends(get_images)):


    guess = (float(lat), float(long))
    answer = (imgdict[loc_id]['lat'],imgdict[loc_id]['lng'])

    dist = geodesic(guess, answer).feet

    score = (((MAX_DIST - dist) + PADDING) / MAX_DIST)
    if score < 0:
        score = 0
    if score > 1:
        score = 1
    
    score = score ** FACTOR

    return GameRecord(
        guess=GamePoint(lat=float(lat), long=float(long)),
        actual=GamePoint(lat=imgdict[loc_id]['lat'],long=imgdict[loc_id]['lng']),
        score=int(score * SCORING),
        distance=dist
    ).dict()

    # score = GameScore(
    #     score = (((MAX_DIST - dist) + PADDING) / MAX_DIST)
    #     )

