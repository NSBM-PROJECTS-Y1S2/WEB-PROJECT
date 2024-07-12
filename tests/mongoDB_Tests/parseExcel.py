# NSBM-Y1S1-WEBPROJECT-TEST_PROGRAMS | EXCEL PARSER
import pandas as pd
from pymongo import MongoClient
from tqdm import tqdm

def display_medications(file_path):
    try:
        df = pd.read_excel(file_path)
        print("Medications List:")
        print(df.to_string())
        medications_list = df.to_dict(orient='records')
        
        mongo_url = 'mongodb://localhost:27017/'
        database_name = 'MEDIX'
        collection_name = 'Medications'
        
        client = MongoClient(mongo_url)
        db = client[database_name]
        collection = db[collection_name]
        
        for medication in tqdm(medications_list, desc="Uploading data to MongoDB"):
            collection.insert_one(medication)
        
        print(f"Data successfully inserted into the '{database_name}' database, '{collection_name}' collection.")
    
    except FileNotFoundError:
        print(f"Error: The file {file_path} was not found.")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
	file_path = 'tests\mongoDB_Tests\medicationsList.xlsx'
	display_medications(file_path)

