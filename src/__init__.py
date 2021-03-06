import time
from fastapi import FastAPI, Request, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from src.routers import routes_auth, routes_orders, routes_products
from src.jobs.write_notification import write_notification



app = FastAPI()
origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:5500",
    "http://localhost:8000",
    "http://127.0.0.1:5500",
    "http://127.0.0.1:5501",
    "https://blx-front.herokuapp.com"
]


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,  
    allow_methods=["POST", "GET"],    
    allow_headers=["*"],
)

# ================ AUTH ================
app.include_router(routes_auth.router, prefix='/auth')
# ================ PRODUCTS ================
app.include_router(routes_products.router)
# ================ ORDERS ================
app.include_router(routes_orders.router)

# Background Task
@app.post('/send_email/{email}')
def send_email(email: str, background: BackgroundTasks):
    background.add_task(write_notification, email, 'olá')
    return {'OK': 'Mensagem enviada!'}
# Middlewares
@app.middleware("http")
async def process_time(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers['X-Process-Time'] = str(process_time)
    return response

