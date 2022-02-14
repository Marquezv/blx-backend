from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routers import routes_users, routes_products

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

# ================ USERS ================
app.include_router(routes_users.router)
# ================ PRODUCTS ================
app.include_router(routes_products.router)