# This is meant to be run as a standalone script.

import json
import config.firebase_config  # Loads .env and initializes Firebase

from firebase_admin import firestore
from google.cloud.firestore_v1.base_query import FieldFilter

db = firestore.client()


def main():
    # get_output_json_from_firebase("questions")
    # write_input_json_to_firebase("questions", "input.json")
    pass


def get_output_json_from_firebase(collection_name):
    """
    Gets output from 'collection_name' in Firebase and stores it in
    'output.json'.
    """

    # Specify your Firestore collection
    collection_ref = db.collection(collection_name)

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


def write_input_json_to_firebase(collection_name: str, file_path: str):
    """Takes what's in 'input.json' and writes to Firebase at 'collection_name'."""
    collection_ref = db.collection(collection_name)

    with open(file_path, "r") as f:
        data_list = json.load(f)

    for doc_id, data in data_list.items():
        """
        if data ID exists:
            print(f"Question with ID {id} already exists)
            continue
        if data same question already exists:
            printf("Question with text {question_text} already exists")
        """

        # Create a reference to the doc
        #
        # Documents with empty string keys ("") will have their doc_id
        # auto-generated
        if doc_id == "":
            doc_ref = collection_ref.document()  # Auto-generated here
        else:
            doc_ref = collection_ref.document(doc_id)

        # Same question ID check
        if doc_ref.get().exists:
            doc_ref.update(data)
            print(f"Question updated: {doc_ref.id}")
            # print(f"Question with ID {doc_ref.id} already exists")
            continue

        if "question_text" not in data:
            print(f"Question with ID {doc_ref.id} has no question_text field")
            continue

        query = collection_ref.where(
            filter=FieldFilter("question_text", "==", data["question_text"])
        )
        repeat_question = query.get()
        if repeat_question:
            print(
                f"Question {repeat_question[0].id} with text\n\t\"{data['question_text']}\"\nalready exists"
            )
            continue

        print(f"Question added: {doc_ref.id}: {data['question_text']}")

        doc_ref.set(data)


if __name__ == "__main__":
    main()
