from fastapi import APIRouter, Depends, status, HTTPException
from typing import List
from sqlalchemy.orm import Session

from src.schemas.schemas import Product, SimpleProduct
from src.infra.sqlalchemy.config.database import get_db
from src.infra.sqlalchemy.repository.rep_product import RepositoryProduct

router = APIRouter()

# ================ PRODUCTS ================
# Listar Produtos
@router.get('/products', status_code=status.HTTP_200_OK, response_model=List[Product])
def list_products(db: Session = Depends(get_db)):
    products = RepositoryProduct(db).list()
    return products


# Selecionar Produtos
@router.get('/products/{product_id}', response_model=Product) 
def select_product(product_id: int, db: Session = Depends(get_db)):
    product = RepositoryProduct(db).get(product_id)
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'Desculpe não encontrei este produto, id = {product_id}' )
    return product

# Criar Produtos
@router.post('/products', status_code=status.HTTP_201_CREATED, response_model=Product)
def create_products(product: Product, db: Session = Depends(get_db)):
    created_product = RepositoryProduct(db).create(product)
    return created_product

# Atualizar Produtos
@router.put('/products/{product_id}', status_code=status.HTTP_200_OK, response_model=SimpleProduct)
def update_products(product_id: int, product: Product, db: Session = Depends(get_db)):
    RepositoryProduct(db).update(product_id, product)
    product.id = product_id
    return product

# Deletar Produtos
@router.delete('/products/{product_id}')
def delete_products(product_id: int, db:Session = Depends(get_db)):
    delete_product = RepositoryProduct(db).delete(product_id)
    return delete_product
