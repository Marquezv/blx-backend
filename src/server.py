from fastapi import FastAPI, Depends, status
from typing import List, Optional
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from src.infra.sqlalchemy.config.database import get_db, create_db
from src.schemas.schemas import Product, SimpleProduct,User
from src.infra.sqlalchemy.repository.rep_product import RepositoryProduct
from src.infra.sqlalchemy.repository.rep_user import RepositoryUser

origins = [
    "http://localhost:8080",
    "http://127.0.0.1:8000",
]
# create_db()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ================ USERS ================
# Listar Users
@app.get('/users', response_model=List[User])
def list_users(db: Session = Depends(get_db)):
    users = RepositoryUser(db).list()
    return users

# Seleciona Users
@app.get('/users/{user_id}', status_code=status.HTTP_200_OK, response_model=User)
def select_user(user_id: int, db: Session = Depends(get_db)):
    user = RepositoryUser(db).get(user_id)
    return user

# Criar Users
@app.post('/users', status_code=status.HTTP_201_CREATED, response_model=User)
def create_user(user: User, db: Session = Depends(get_db)):
    create_user = RepositoryUser(db).create(user)
    return create_user

# Atualizar Users
@app.put('/users/{id}')
def update_user():
    pass

# Deletar Users
@app.delete('/users/{user_id}', status_code=status.HTTP_200_OK)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = RepositoryUser(db).delete(user_id)
    return user
# ================ PRODUCTS ================
# Listar Produtos
@app.get('/products', status_code=status.HTTP_200_OK, response_model=List[Product])
def list_products(db: Session = Depends(get_db)):
    products = RepositoryProduct(db).list()
    return products

# Selecionar Produtos
@app.get('/products/{product_id}', response_model=Product) 
def select_product(product_id: int, db: Session = Depends(get_db)):
    product = RepositoryProduct(db).get(product_id)
    return product

# Criar Produtos
@app.post('/products', status_code=status.HTTP_201_CREATED, response_model=Product)
def create_products(product: Product, db: Session = Depends(get_db)):
    created_product = RepositoryProduct(db).create(product)
    return created_product

# Atualizar Produtos
@app.put('/products/{product_id}', status_code=status.HTTP_200_OK, response_model=SimpleProduct)
def update_products(product_id: int, product: Product, db: Session = Depends(get_db)):
    RepositoryProduct(db).update(product_id, product)
    product.id = product_id
    return product

# Deletar Produtos
@app.delete('/products/{product_id}')
def delete_products(product_id: int, db:Session = Depends(get_db)):
    delete_product = RepositoryProduct(db).delete(product_id)
    return delete_product

