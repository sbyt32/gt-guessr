import os
from PIL import Image

root = 'static/images/'
images = os.listdir(root)


for image in images:
    print('running for', image)

    im = Image.open(root+image)

    ratio = im.width / im.height

    max_height = 1400

    new_size = (int(ratio*max_height), max_height)

    im = im.resize(new_size)

    im.save(root+image)