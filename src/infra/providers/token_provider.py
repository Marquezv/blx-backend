from datetime import datetime, timedelta
from hashlib import algorithms_available
from lib2to3.pgen2 import token
from tokenize import Token
from jose import jwt, JWTError

# CONFIG
SECRET_KEY = '0f983e7bc8389a6f8006f1b2f80bc8254c94b4178626e091926c85ae314d78d9'
ALGORITHM = 'HS256'
EXPIRES_IN_MIN = 3000

def create_acess_token(personal_data: dict):
    data = personal_data.copy()
    expiration = datetime.utcnow() + timedelta(minutes=EXPIRES_IN_MIN)
    data.update({'exp': expiration})

    token_jwt = jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)
    return token_jwt

def verify_acess_token(token: str):
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    return payload.get('sub')
