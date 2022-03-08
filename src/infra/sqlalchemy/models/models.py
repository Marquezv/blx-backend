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
    order = relationship('Order', back_populates='user')



class Order(Base):
    __tablename__ = 'order'

    id = Column(Integer, primary_key=True, index=True)
    amount = Column(Integer)
    delivery_place = Column(String)
    delivery_type = Column(String)
    notes = Column(String)

    user_id = Column(Integer, ForeignKey('user.id', name='fk_order_user'))
    product_id = Column(Integer, ForeignKey('product.id', name='fk_order_product'))
    # Quem fez o pedido
    user = relationship('User', back_populates='order')
    # O que pediu
    product = relationship('Product')
