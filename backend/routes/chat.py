from fastapi import APIRouter,Request
from src.db_connection.connection import collection_name
from langchain.messages import HumanMessage
from backend.schema.chat import ChatRequest
from backend.services.streaming import streaming_token

router = APIRouter()


# This endpoint will send SSE (server sent events) for each token to React frontend
@router.post("/chat")
async def chat_endpoint(req: Request, payload: ChatRequest):
    state = {
        "collection_name": collection_name,
        "messages": [HumanMessage(content=payload.message)],
    }
    return streaming_token(req,state)
  