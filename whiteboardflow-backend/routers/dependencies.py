from fastapi import HTTPException, Security
from fastapi.security import HTTPBearer
from firebase_admin import auth

security = HTTPBearer()

async def get_current_user(token: str = Security(security)):
    try:
        decoded_token = auth.verify_id_token(token.credentials)
        user = auth.get_user(decoded_token['uid'])
        return user
    except:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
