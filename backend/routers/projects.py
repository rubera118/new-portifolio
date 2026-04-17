from fastapi import APIRouter, HTTPException
from models.schemas import ProjectCreate, ProjectResponse
from core.supabase import get_supabase_admin
from typing import List

router = APIRouter()


@router.get("/", response_model=List[ProjectResponse])
async def list_projects(featured: bool = False):
    supabase = get_supabase_admin()
    query = supabase.table("projects").select("*").order("order", desc=False)
    if featured:
        query = query.eq("featured", True)
    result = query.execute()
    return result.data or []


@router.get("/{project_id}", response_model=ProjectResponse)
async def get_project(project_id: str):
    supabase = get_supabase_admin()
    result = (
        supabase.table("projects")
        .select("*")
        .eq("id", project_id)
        .single()
        .execute()
    )
    if not result.data:
        raise HTTPException(status_code=404, detail="Project not found")
    return result.data


@router.post("/", response_model=ProjectResponse, status_code=201)
async def create_project(payload: ProjectCreate):
    """Admin: seed projects."""
    supabase = get_supabase_admin()
    result = supabase.table("projects").insert(payload.model_dump()).execute()
    if result.data:
        return result.data[0]
    raise HTTPException(status_code=500, detail="Failed to create project.")
