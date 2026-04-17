from fastapi import APIRouter, Request, HTTPException
from core.supabase import get_supabase_admin
from models.schemas import VisitResponse

router = APIRouter()


@router.post("/", response_model=VisitResponse)
async def record_visit(request: Request):
    """Increment visit counter and return total."""
    supabase = get_supabase_admin()
    try:
        # Use an upsert on a single-row counter table
        result = supabase.rpc("increment_visits").execute()
        total = result.data if isinstance(result.data, int) else 0
        return VisitResponse(total_visits=total)
    except Exception as e:
        # Fallback: try direct read
        try:
            r = supabase.table("visit_counter").select("count").eq("id", 1).single().execute()
            return VisitResponse(total_visits=r.data.get("count", 0))
        except Exception:
            raise HTTPException(status_code=500, detail=str(e))


@router.get("/", response_model=VisitResponse)
async def get_visits():
    """Get current visit count."""
    supabase = get_supabase_admin()
    try:
        r = supabase.table("visit_counter").select("count").eq("id", 1).single().execute()
        return VisitResponse(total_visits=r.data.get("count", 0))
    except Exception:
        return VisitResponse(total_visits=0)
