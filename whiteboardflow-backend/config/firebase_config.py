import firebase_admin

from config.settings import Config

cred = firebase_admin.credentials.Certificate(Config.FIREBASE_SERVICE_ACCOUNT_PATH)
firebase_app = firebase_admin.initialize_app(
    cred, {"storageBucket": Config.FIREBASE_STORAGE_BUCKET}
)
