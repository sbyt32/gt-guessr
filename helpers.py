import json
import random

class Dataset:
    def __init__(self, json_file) -> None:
        pass



def is_float_or_int(value):
    return str(value).isnumeric() or is_float(value)

def is_float(value):
    try:
        float(value)
        return True
    except ValueError:
        return False
