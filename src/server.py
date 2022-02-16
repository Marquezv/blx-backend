import time
from fastapi import FastAPI, Request
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

# Middlewares
@app.middleware("http")
async def process_time(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers['X-Process-Time'] = str(process_time)
    return response


# ================ AUTH ================
app.include_router(routes_auth.router, prefix='/auth')
# ================ PRODUCTS ================
app.include_router(routes_products.router)
# ================ ORDERS ================
app.include_router(routes_orders.router)