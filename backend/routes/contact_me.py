from fastapi import APIRouter,HTTPException
from backend.schema.contact import ContactRequest
from src.db_connection.connection import supabase_client

router = APIRouter()


# ======================= Contact endpoint =======================
# router is like a mini-app where you can define multiple endpoints together.
# Later, you attach the router to your main app:



@router.post("/contact")
async def contact_endpoint(request: ContactRequest):
    try:
        response = supabase_client.table("contact_me").insert({
            "name": request.name,
            "email": request.email,
            "subject": request.subject,
            "message": request.message
        }).execute() 
        return {
            "success": True,
            "message": "Message sent Successfully"
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to save message: {str(e)}"
        )