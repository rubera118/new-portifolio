from fastapi import APIRouter, HTTPException, BackgroundTasks
from models.schemas import ContactCreate, ContactResponse
from core.supabase import get_supabase_admin
from core.config import settings
import httpx

router = APIRouter()


async def send_email_notification(name: str, email: str, message: str, subject: str = ""):
    """Send email notification via Resend (optional). Fails silently."""
    if not settings.RESEND_API_KEY:
        return
    try:
        async with httpx.AsyncClient() as client:
            await client.post(
                "https://api.resend.com/emails",
                headers={"Authorization": f"Bearer {settings.RESEND_API_KEY}"},
                json={
                    "from": "Portfolio Contact <noreply@yourdomain.com>",
                    "to": [settings.CONTACT_EMAIL],
                    "subject": f"New Contact: {subject or 'Portfolio Message'} from {name}",
                    "html": f"""
                        <h2>New message from your portfolio</h2>
                        <p><strong>Name:</strong> {name}</p>
                        <p><strong>Email:</strong> {email}</p>
                        <p><strong>Subject:</strong> {subject or 'N/A'}</p>
                        <p><strong>Message:</strong></p>
                        <p>{message}</p>
                    """,
                },
                timeout=10,
            )
    except Exception:
        pass  # Email is non-critical


@router.post("/", response_model=dict, status_code=201)
async def send_contact_message(
    payload: ContactCreate,
    background_tasks: BackgroundTasks,
):
    supabase = get_supabase_admin()
    try:
        result = (
            supabase.table("contact_messages")
            .insert(
                {
                    "name": payload.name,
                    "email": payload.email,
                    "subject": payload.subject,
                    "message": payload.message,
                }
            )
            .execute()
        )
        if result.data:
            background_tasks.add_task(
                send_email_notification,
                payload.name,
                payload.email,
                payload.message,
                payload.subject or "",
            )
            return {
                "success": True,
                "message": "Your message has been received! I'll get back to you soon. 🚀",
            }
        raise HTTPException(status_code=500, detail="Failed to save message.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/", response_model=list[ContactResponse])
async def list_messages():
    """Admin endpoint — protect this with auth in production."""
    supabase = get_supabase_admin()
    result = (
        supabase.table("contact_messages")
        .select("*")
        .order("created_at", desc=True)
        .execute()
    )
    return result.data or []
