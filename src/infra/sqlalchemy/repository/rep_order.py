from sqlalchemy import select, delete, update
from sqlalchemy.orm import Session
from src.schemas import schemas
from src.infra.sqlalchemy.models import models

class RepositoryOrder():

    def __init__(self, db:Session):
        self.db = db
    
    # Criar
    def create(self, order: schemas.Order, user_id):
        db_order = models.Order(
            amount = order.amount,
            delivery_place = order.delivery_place,
            delivery_type = order.delivery_type,
            notes = order.notes,
            user_id = user_id,
            product_id = order.product_id   
        )

        self.db.add(db_order)
        self.db.commit()
        self.db.refresh(db_order)
        return db_order

     # buscar_por_id
    def get(self, order_id: int) -> models.Order:
        stmt = select(models.Order).filter_by(id=order_id)
        order = self.db.execute(stmt).scalars().first()
        return order
   
    # listar_meus_pedidos_por_usuario_id
    def get_for_user(self, user_id: int):
        stmt = select(models.Order) \
        .where(models.Order.user_id == user_id)
        orders = self.db.execute(stmt).scalars().all()
        return orders

    # listar_minhas_vendas_por_usuario_id
    def get_for_product(self, user_id: int):
        stmt = select(models.Order) \
        .join_from(models.Order, models.Product)\
        .where(models.Product.user_id == user_id)
        orders = self.db.execute(stmt).scalars().all()
        return orders
