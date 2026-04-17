from contextlib import asynccontextmanager

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from core.config import settings
from routers import blog, contact, projects, visits


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Portfolio API starting up...")
    yield
    print("Portfolio API shutting down...")


app = FastAPI(
    title="Uwamwezi Phionah - Portfolio API",
    description="Backend API for the personal portfolio of Uwamwezi Phionah",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(contact.router, prefix="/api/contact", tags=["Contact"])
app.include_router(visits.router, prefix="/api/visits", tags=["Visits"])
app.include_router(projects.router, prefix="/api/projects", tags=["Projects"])
app.include_router(blog.router, prefix="/api/blog", tags=["Blog"])


@app.get("/", tags=["Health"])
async def root():
    return {
        "status": "online",
        "message": "Uwamwezi Phionah Portfolio API is running",
        "version": "1.0.0",
    }


@app.get("/health", tags=["Health"])
async def health_check():
    return {"status": "healthy"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
