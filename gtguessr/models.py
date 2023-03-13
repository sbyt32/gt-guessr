from pydantic import BaseModel, validator, root_validator
from .config import MAX_DIST, FACTOR, SCORING, PADDING

class GamePoint(BaseModel):
    lat: float
    long: float

    # # # TODO: Validators
    # @root_validator(pre=True)
    # def parseFloat(cls, values):
    #     for field in values:
    #         assert values(field).isnumeric()
    #         assert float(values(field))

class GameRecord(BaseModel):
    guess: GamePoint
    actual: GamePoint
    score: int
    distance: float

class GameScore(BaseModel):
    score: float

    @validator('score')
    # https://docs.pydantic.dev/usage/validators/
    def check_overflow(cls, v):
        if v < 0:
            v = 0
        if v > 1:
            v = 1
        return v

                        # score = (((MAX_DIST - dist) + PADDING) / MAX_DIST)
