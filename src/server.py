from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routers import routes_auth, routes_orders, routes_products

origins = [
    "http://localhost:8080",
    "http://127.0.0.1:8000",
]


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ================ AUTH ================
app.include_router(routes_auth.router, prefix='/auth')
# ================ PRODUCTS ================
app.include_router(routes_products.router)
# ================ ORDERS ================
app.include_router(routes_orders.router)