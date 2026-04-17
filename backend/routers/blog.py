from fastapi import APIRouter, HTTPException
from models.schemas import BlogPostCreate, BlogPostResponse
from core.supabase import get_supabase_admin
from typing import List, Optional

router = APIRouter()


@router.get("/", response_model=List[BlogPostResponse])
async def list_posts(published_only: bool = True):
    supabase = get_supabase_admin()
    query = (
        supabase.table("blog_posts")
        .select("*")
        .order("created_at", desc=True)
    )
    if published_only:
        query = query.eq("published", True)
    result = query.execute()
    return result.data or []


@router.get("/{slug}", response_model=BlogPostResponse)
async def get_post(slug: str):
    supabase = get_supabase_admin()
    result = (
        supabase.table("blog_posts")
        .select("*")
        .eq("slug", slug)
        .single()
        .execute()
    )
    if not result.data:
        raise HTTPException(status_code=404, detail="Post not found")
    return result.data


@router.post("/", response_model=BlogPostResponse, status_code=201)
async def create_post(payload: BlogPostCreate):
    supabase = get_supabase_admin()
    result = supabase.table("blog_posts").insert(payload.model_dump()).execute()
    if result.data:
        return result.data[0]
    raise HTTPException(status_code=500, detail="Failed to create post.")
