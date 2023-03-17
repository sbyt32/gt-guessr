from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.routing import Mount
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
from .api import api_router

routes = [
    Mount(
        "/game",
        app=StaticFiles(directory="./gtguessr/static/gt-guessr/dist", html=True),
    )
]

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "*",
]

app = FastAPI(title="GTGuessr", routes=routes)
app.include_router(api_router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
