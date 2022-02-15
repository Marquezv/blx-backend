from urllib import response
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

# Buscar por order_id
@router.get('/orders/{order_id}', response_model=Order)
def get(order_id: int, db: Session = Depends(get_db)):
    orders = RepositoryOrder(db).get(order_id)
    if not orders:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'Desculpe não encontrei nenhum pedido!' )
    return orders

# Meus Pedidos
@router.get('/orders/{user_id}/purchases', response_model=List[Order])
def get_for_user(user_id: int, db: Session = Depends(get_db)):
    order = RepositoryOrder(db).get_for_user(user_id)
    return order

# Minhas Vendas
@router.get('/orders/{product_id}/sold', response_model=List[Order])
def get_for_product(product_id: int, db:Session = Depends(get_db)):
    order = RepositoryOrder(db).get_for_product(product_id)
    return order