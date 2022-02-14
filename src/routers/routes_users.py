from fastapi import APIRouter, Depends, status
from typing import List
from sqlalchemy.orm import Session

from src.schemas.schemas import User, SimpleUser
from src.infra.sqlalchemy.config.database import get_db
from src.infra.sqlalchemy.repository.rep_user import RepositoryUser

router = APIRouter()

# Listar Users
@router.get('/users', response_model=List[User])
def list_users(db: Session = Depends(get_db)):
    users = RepositoryUser(db).list()
    return users

# Seleciona Users
@router.get('/users/{user_id}', status_code=status.HTTP_200_OK, response_model=User)
def select_user(user_id: int, db: Session = Depends(get_db)):
    user = RepositoryUser(db).get(user_id)
    return user

# Criar Users
@router.post('/users', status_code=status.HTTP_201_CREATED, response_model=User)
def create_user(user: User, db: Session = Depends(get_db)):
    create_user = RepositoryUser(db).create(user)
    return create_user

# Atualizar Users
@router.put('/users/{id}')
def update_user():
    pass

# Deletar Users
@router.delete('/users/{user_id}', status_code=status.HTTP_200_OK)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = RepositoryUser(db).delete(user_id)
    return user