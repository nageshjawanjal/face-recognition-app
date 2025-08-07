from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api import users_router, face_router
from .database.connection import engine
from .models.user import Base

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Face Recognition API",
    description="A face recognition system for user management",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(face_router)
app.include_router(users_router)

@app.get("/")
async def root():
    return {
        "message": "Face Recognition API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
