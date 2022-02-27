from sqlalchemy import select, delete, update
from sqlalchemy.orm import Session
from src.schemas import schemas
from src.infra.sqlalchemy.models import models

class RepositoryProduct():
    
    def __init__(self, db: Session):
        self.db = db
        
    # Criar
    def create(self, product: schemas.Product, user_id):
        db_product = models.Product(
            name = product.name,
            details = product.details,
            price = product.price,
            available = product.available,
            user_id = user_id
        )

        self.db.add(db_product)
        self.db.commit()
        self.db.refresh(db_product)
        return db_product

    # Listar
    def list(self):
        products = self.db.query(models.Product).all()
        return products

    # Selecionar
    def get(self, product_id):
        stmt = select(models.Product).filter_by(id=product_id)
        product = self.db.execute(stmt).scalars().first()
        return product

    # Atualizar
    def update(self, id: int ,product: schemas.Product):
        stmt = update(models.Product).where(models.Product.id == id).values(
            name = product.name,
            details = product.details,
            price = product.price,
            available = product.available)

        self.db.execute(stmt)
        self.db.commit()

    # Deletar
    def delete(self, product_id):
        stmt = delete(models.Product).where(models.Product.id == product_id)

        self.db.execute(stmt)
        self.db.commit()
