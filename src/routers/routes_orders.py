from fastapi import APIRouter, Depends, status, HTTPException
from typing import List
from sqlalchemy.orm import Session
from src.infra.sqlalchemy.repository.rep_order import RepositoryOrder
from src.schemas.schemas import Order
from src.infra.sqlalchemy.config.database import get_db


router = APIRouter()

# ================ PRODUCTS ================
# Criar Orders
@router.post('/orders', status_code=status.HTTP_201_CREATED, response_model=Order)
def create_products(order: Order, db: Session = Depends(get_db)):
    created_order = RepositoryOrder(db).create(order)
    return created_order
# Listar Orders

@router.get('/orders/{order_id}')
def get(order_id: int, db: Session = Depends(get_db)):
    orders = RepositoryOrder(db).get()
    return orders

# Selecionar Produtos
@router.get('/orders/{order_id}')
def get_for_user(order_id: int, db: Session = Depends(get_db)):
    order = RepositoryOrder(db).get_for_user(order_id)
    if not order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'Desculpe não encontrei nenhum pedido!' )
    return order

# Minhas Vendas
@router.post('/orders/{product_id}')
def get_for_product(product_id: int, db:Session = Depends(get_db)):
    order = RepositoryOrder(db).get_for_product(product_id)
    return order