from pydantic import BaseModel 
from typing import Optional, List



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


