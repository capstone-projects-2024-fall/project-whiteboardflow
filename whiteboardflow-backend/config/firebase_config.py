import firebase_admin

from config.settings import Config
from firebase_admin import credentials, firestore

# Global variables for Firebase app and database client
firebase_app = None
db = None


def initialize_firebase():
    global firebase_app, db
    if not firebase_admin._apps:  # If Firebase app not already initialized
        cred = credentials.Certificate(Config.FIREBASE_SERVICE_ACCOUNT_PATH)
        firebase_app = firebase_admin.initialize_app(
            cred, {"storageBucket": Config.FIREBASE_STORAGE_BUCKET}
        )
        db = firestore.client()


# Run initialization when this file is imported
initialize_firebase()
