from bson.binary import Binary
import pymongo
import os
from dotenv import load_dotenv, find_dotenv
import certifi
import time
import json

def save_model_to_DB(model_file, client, db, collection, model_name, model_description):

    # create DB connection
    myclient = pymongo.MongoClient(client, tlsCAFile=ca)

    # connect to database
    mydb = myclient[db]

    # connect to collection
    mycol = mydb[collection]

    with open(model_file) as file:
        file_data = json.load(file)

    info = mycol.insert_one({
        "name" : model_name,
        "filename": model_description,
        "file": file_data,
    })

    print(info.inserted_id, "model successfully saved")

    details = {
        'inserted_id': info.inserted_id,
        'model_name' : model_name,
        'created_time' : time.time()
    }

    return details

ca = certifi.where()

load_dotenv(find_dotenv())

MONGO_URI = os.getenv('MONGO_URI')
MONGO_DB = "test"

model_file = os.getenv('MODEL_PATH')
collection = 'models'
model_name = "model_LSTM_CNN"
model_description = "LSTM stacked CNN Model"

details = save_model_to_DB(model_file, MONGO_URI, MONGO_DB, collection, model_name, model_description)

print(details)