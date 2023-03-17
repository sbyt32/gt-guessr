from gtguessr.game.router import router as game_router
from fastapi import APIRouter

api_router = APIRouter()

api_router.include_router(game_router, prefix="/api")
