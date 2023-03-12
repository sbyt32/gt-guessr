from exif import Image
import getimgs
import json
from io import StringIO
import os

imglist = getimgs.getimglist()

def decimal_coords(coords, ref):
    decimal_degrees = coords[0] + coords[1] / 60 + coords[2] / 3600
    if ref == "S" or ref == "W":
        decimal_degrees = -decimal_degrees
    return decimal_degrees

def image_coordinates(img_path):
    with open(img_path, 'rb') as src:
        img = Image(src)
    if img.has_exif:
        try:
            img.gps_longitude
            lng = decimal_coords(img.gps_longitude,
                    img.gps_longitude_ref)
            lat = decimal_coords(img.gps_latitude,
                    img.gps_latitude_ref)
        except AttributeError:
            print ("No coordinates")
    else:
        print ("the image has no EXIF information")
    print("")
    imgname = src.name
    my_json = {
        "image_name" : imgname,
        "lng" : lng,
        "lat" : lat
    }
    print(("\"" + os.path.splitext(src.name)[0] + "\": ") + (json.dumps(my_json, indent=4) + ","))



for img_path in imglist:
    with open(img_path, 'rb') as src:
        img = Image(src)

    if img.has_exif:
        info = f" has the EXIF {img.exif_version}"
    else:
        info = "does not contain any EXIF information"
        print(f"Image {src.name}: {info}")

    # Read again photo with exif info
    with open(img_path, "rb") as src:
        img = Image(src)

    image_coordinates(img_path)