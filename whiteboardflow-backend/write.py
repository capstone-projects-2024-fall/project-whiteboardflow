# This is meant to be run as a standalone script.

import json
import config.firebase_config # Loads .env and initializes Firebase

from firebase_admin import firestore

db = firestore.client()
questions_ref = db.collection("questions")


def main():
    get_output_json_from_firebase("questions")
    write_input_json_to_firebase("questions", "input.json")
    pass


def get_output_json_from_firebase(collection_path):
    """Gets output from 'collection_path' in Firebase and stores it in
    'output.json'. 
    """
    # Specify your Firestore collection
    collection_ref = db.collection(collection_path)

    # Get all documents in the collection
    docs = collection_ref.stream()

    # Prepare a dictionary to store all documents
    data = {}

    # Iterate through the documents and store them in the dictionary
    for doc in docs:
        data[doc.id] = doc.to_dict()

    # Write the data to a JSON file
    with open("output.json", "w") as json_file:
        json.dump(data, json_file, indent=4)

    print("Documents written to output.json")


def write_input_json_to_firebase(collection_path: str, file_path: str):
    """Takes what's in 'input.json' and writes to Firebase at 'collection_path'.
    """
    with open(file_path, "r") as f:
        data_list = json.load(f)
        
    for data in data_list:
        doc_ref = db.collection(collection_path).add(data)
        print(f"Added question with ID: {doc_ref[1].id}")
        
    print("Data successfuly written to Firebase.")


if __name__ == "__main__":
    main()
