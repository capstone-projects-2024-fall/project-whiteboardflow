from firebase_admin import storage


def get_firebase_image(user_id, session_id=None):
    """
    Retrieves an image file associated with the specified user from Firebase
    Storage.

    Args:
        user_id (str): The unique identifier for the user whose image is being
            retrieved.

    Returns:
        bytes: The image data as a byte array, downloaded from Firebase
            Storage.
    """
    if session_id:
        path = f"user-files/{user_id}/{session_id}/static.png"
    else:
        path = f"user-files/{user_id}/static.png"

    bucket = storage.bucket()
    blob = bucket.blob(path)
    image_data = blob.download_as_bytes()

    return image_data
