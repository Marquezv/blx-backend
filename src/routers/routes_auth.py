from os import access
from urllib import response
from fastapi import APIRouter, Depends, status, HTTPException
from typing import List
from sqlalchemy.orm import Session

from src.schemas.schemas import User, SimpleUser, LoginData, LoginSucess
from src.infra.sqlalchemy.config.database import get_db
from src.infra.sqlalchemy.repository.rep_user import RepositoryUser
from src.infra.providers.hash_provider import get_password, verify_password
from src.infra.providers.token_provider import create_acess_token, verify_acess_token
from src.routers.auth_utils import get_logged_user
router = APIRouter()

# SingUp
@router.post('/signup', status_code=status.HTTP_201_CREATED, response_model=User)
def create_user(user: User, db: Session = Depends(get_db)):
    # Verificar se existe 
    user_located = RepositoryUser(db).get_for_telephone(user.telephone)
    if user_located:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Desculpa alguem já esta usando esté número' )
    # Criar Users
   
    user.password = get_password(user.password)
    create_user = RepositoryUser(db).create(user)
    return create_user

#SingIn
@router.post('/token', status_code=status.HTTP_200_OK, response_model=LoginSucess   )
def login_user(login_data: LoginData, db: Session = Depends(get_db)):
    telephone = login_data.telephone
    password = login_data.password 
    # Verifica Nome ou NUmero
    user_located = RepositoryUser(db).get_for_telephone(telephone)
    exception = HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Telefone ou Senha Incorreto!')
    if not user_located:
        raise exception
    
    valid_password = verify_password(password, user_located.password)
    if not valid_password:
        raise exception
    # Gerar Token JWT
    token = create_acess_token({'sub':user_located.telephone,})
    return LoginSucess(user = user_located, access_token= token)

# Meu Perfil
@router.get('/me', response_model=SimpleUser)
def me(user: User = Depends(get_logged_user)):
    # Decoficar o Token, Pegar telephone, Buscar Usuario
    return user


# Meus Produtos
@router.get('/me/products')
def get_my_products( user: User = Depends(get_logged_user), db:Session = Depends(get_db)):
    my_products = RepositoryUser(db).get_my_products(user.id)
    print(user.id)
    return my_products
