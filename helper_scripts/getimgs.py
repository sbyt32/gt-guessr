import os

def getimglist():
    # folder path
    dir_path = os.listdir()

    # list to store files
    res = []

    # Iterate directory
    for path in os.listdir(dir_path):
        # check if current path is a file
        if os.path.isfile(os.path.join(dir_path, path)):
            if path.endswith('.JPG'):
                res.append(path)
    return res