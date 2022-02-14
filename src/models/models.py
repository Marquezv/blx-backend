from pydantic import BaseModel 
from typing import Optional, List

class User(BaseModel):
    id: Optional[str] = None
    name: str
    telephone: str
    my_sales: List[Order]
    my_orders: List[Order]

class Product(BaseModel):
    id: Optional[str] = None
    name: str
    details: str
    price: float
    available: bool = False

class Order(BaseModel):
    id: Optional[str] = None
    user: User
    product: Product 
    amount: int
    delivery: bool = True
    address: str
    comments: Optional[str] = 'Sem Observações'
