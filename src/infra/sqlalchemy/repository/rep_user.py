from sqlalchemy import select, delete
from sqlalchemy.orm import Session
from src.schemas import schemas
from src.infra.sqlalchemy.models import models

class RepositoryUser():

    def __init__(self, db: Session):
        self.db = db

    def create(self, user: schemas.User):
        db_user = models.User(
            name = user.name,
            password = user.password,
            telephone = user.telephone
        )

        self.db.add(db_user)
        self.db.commit()
        self.db.refresh(db_user)
        return db_user
    # Listar
    def list(self):
        stmt = select(models.User)
        users = self.db.execute(stmt).scalars().all()
        return users
    # Selecionar
    def get(self, user_id: int):
        stmt = select(models.User).filter_by(id=user_id)
        user = self.db.execute(stmt).scalars().one()
        return user

    # Deletar
    def delete(self, user_id: int):
        stmt = delete(models.User).where(models.User.id == user_id)

        self.db.execute(stmt)
        self.db.commit()