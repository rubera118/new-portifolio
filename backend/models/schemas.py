from pydantic import BaseModel, EmailStr, field_validator
from typing import Optional, List
from datetime import datetime


# ─── Contact ────────────────────────────────────────────────
class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    subject: Optional[str] = None
    message: str

    @field_validator("name")
    @classmethod
    def name_not_empty(cls, v: str) -> str:
        v = v.strip()
        if len(v) < 2:
            raise ValueError("Name must be at least 2 characters.")
        return v

    @field_validator("message")
    @classmethod
    def message_not_empty(cls, v: str) -> str:
        v = v.strip()
        if len(v) < 10:
            raise ValueError("Message must be at least 10 characters.")
        return v


class ContactResponse(BaseModel):
    id: str
    name: str
    email: str
    subject: Optional[str]
    message: str
    created_at: datetime


# ─── Visit Counter ──────────────────────────────────────────
class VisitResponse(BaseModel):
    total_visits: int


# ─── Projects ───────────────────────────────────────────────
class ProjectBase(BaseModel):
    title: str
    description: str
    description_fr: Optional[str] = None
    description_rw: Optional[str] = None
    image_url: Optional[str] = None
    live_url: Optional[str] = None
    github_url: Optional[str] = None
    tags: Optional[List[str]] = []
    featured: bool = False
    order: int = 0


class ProjectCreate(ProjectBase):
    pass


class ProjectResponse(ProjectBase):
    id: str
    created_at: datetime


# ─── Blog ───────────────────────────────────────────────────
class BlogPostBase(BaseModel):
    title: str
    title_fr: Optional[str] = None
    title_rw: Optional[str] = None
    excerpt: str
    excerpt_fr: Optional[str] = None
    excerpt_rw: Optional[str] = None
    content: Optional[str] = None
    cover_image: Optional[str] = None
    tags: Optional[List[str]] = []
    published: bool = False
    slug: str


class BlogPostCreate(BlogPostBase):
    pass


class BlogPostResponse(BlogPostBase):
    id: str
    created_at: datetime
    updated_at: Optional[datetime]
