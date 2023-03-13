from starlette.config import Config
config = Config(".env")

MAX_DIST = config("MAX_DIST", cast=int, default = 2500)
FACTOR = config("FACTOR", cast=int, default = 1.8)
SCORING = config("SCORING", cast=int, default = 1000)
PADDING = config("PADDING", cast=int, default = 80)