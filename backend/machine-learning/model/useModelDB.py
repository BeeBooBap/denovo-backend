import pickle
import pymongo
import os
from dotenv import load_dotenv, find_dotenv
import certifi

ca = certifi.where()

load_dotenv(find_dotenv())

MONGO_URI = os.getenv('MONGO_URI')
MONGO_DB = "test"
collection = 'models'
model_name = "finalized_model_LR"

def load_saved_model_from_db(model_name, client, db, collection):

    myclient = pymongo.MongoClient(client, tlsCAFile=ca)
    mydb = myclient[db]
    mycol = mydb[collection]

    data = mycol.find_one({"name" : model_name})

    pickled_model = data['file']

    return pickle.loads(pickled_model)

lr = load_saved_model_from_db(model_name, MONGO_URI, MONGO_DB, collection)

print(lr)