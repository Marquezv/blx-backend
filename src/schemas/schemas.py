from pydantic import BaseModel 
from typing import Optional, List

class SimpleUser(BaseModel):
    id: Optional[int] = None
    name: str
    telephone: str
    class Config:
        orm_mode = True


class SimpleProduct(BaseModel):
    id: Optional[int] = None    
    name: str
    details: str
    price: float
    available: bool 
    # user: Optional[SimpleUser]
    class Config:
        orm_mode = True

class User(BaseModel):
    id: Optional[int] = None
    name: str
    password: str
    telephone: str
    product: List[SimpleProduct] = []
    # my_sale: List[Order]
    # my_order: List[Order]
    class Config:
        orm_mode = True


class Product(BaseModel):
    id: Optional[int] = None
    name: str
    details: str
    price: float
    available: bool 
    user_id: Optional[int]
    user: Optional[SimpleUser]

    class Config:
        orm_mode = True


class Order(BaseModel):
    id: Optional[int] = None
    amount: int
    delivery_place: Optional[str]
    delivery_type: str
    notes: Optional[str] = 'Sem Observações'
    
    user_id: Optional[int]
    product_id: Optional[int]

    user: Optional[SimpleUser]
    product: Optional[SimpleProduct]

    class Config:
        orm_mode = True