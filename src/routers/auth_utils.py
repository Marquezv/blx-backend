from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from src.infra.sqlalchemy.config.database import get_db
from src.infra.providers.token_provider import create_acess_token, verify_acess_token
from jose import JWTError
from src.infra.sqlalchemy.repository.rep_user import RepositoryUser

oauth2_schema = OAuth2PasswordBearer(tokenUrl='token')

def get_logged_user(token:str = Depends(oauth2_schema),
                    db: Session = Depends(get_db)):
    exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Token inválido!')

    try:
        telephone = verify_acess_token(token)
    except JWTError:
        raise exception
    
    if not telephone:
        raise exception

    user = RepositoryUser(db).get_for_telephone(telephone)

    if not user:
        return user

    return user