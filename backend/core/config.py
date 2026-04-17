from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    # Supabase
    SUPABASE_URL: str = "https://your-project-id.supabase.co"
    SUPABASE_KEY: str = "your-supabase-anon-key"
    SUPABASE_SERVICE_KEY: str = "your-supabase-service-role-key"

    # Email (for contact form — optional Resend/SendGrid)
    RESEND_API_KEY: str = ""
    CONTACT_EMAIL: str = "uwaphiona11@gmail.com"

    # CORS
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:5173",
        "https://uwamwezi-phionah.vercel.app",  # Update with your deployed URL
    ]

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
