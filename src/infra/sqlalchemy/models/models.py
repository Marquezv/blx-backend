from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from src.infra.sqlalchemy.config.database import Base

class Product(Base):
    
    __tablename__ = 'product'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    price = Column(Float)
    details = Column(String)
    size = Column(String)
    available = Column(Boolean)

    user_id = Column(Integer, ForeignKey('user.id', name='fk_user'))
    user = relationship('User', back_populates='product')

class User(Base):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    password = Column(String)
    telephone = Column(String)
    
    product = relationship('Product', back_populates='user')

