from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from langgraph.checkpoint.postgres import PostgresSaver
from src.graph.workflow import Agent
from src.agent.model_loader import llm
from src.db_connection.connection import CONNECTION_STRING,collection_name,create_client
import uvicorn,json
import logging
from langchain.messages import HumanMessage
from prometheus_fastapi_instrumentator import Instrumentator

#To stream tokens, you need to return a streaming response from FastAPI
from fastapi.responses import StreamingResponse
import asyncio

# contact me
from src.db_connection.connection import supabase_client
from pydantic import BaseModel,EmailStr
from fastapi import APIRouter,HTTPException



# ======================= Contact endpoint =======================
# router is like a mini-app where you can define multiple endpoints together.
# Later, you attach the router to your main app:
router = APIRouter()

class ContactRequest(BaseModel):
    name:str
    email:EmailStr
    subject:str | None=None
    message: str

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
    

app = FastAPI()
# we attach our router to main fast api app
app.include_router(router)


# prometeus  expose metrics for monitoring
Instrumentator().instrument(app).expose(app)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
graph = Agent(llm).build_graph()


class ChatRequest(BaseModel):
    message: str



# This endpoint will send SSE (server sent events) for each token to React frontend
@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    state = {
        "collection_name": collection_name,
        "messages": [HumanMessage(content=request.message)],
    }
    # event_base_execution ===> Tell me EVERYTHING that happens inside the graph, including each token
    async def event_generator():
        try:
            with PostgresSaver.from_conn_string(CONNECTION_STRING) as checkpointer:
                checkpointer.setup()
                config = {"configurable": {"thread_id": "1"}}

                # Use astream_events for token-level streaming
                # we first check if the langgraph support event base streaming
                if hasattr(graph, "astream_events"):
                    print("token level streaming is being used")  #debugggg
                    async for event in graph.astream_events(
                        state, 
                        config=config,
                        version="v2"
                    ):
                        # Filter for LLM token events
                        #This event(on_chat_model_stream) fires every time the LLM produces a token.
                        if event["event"] == "on_chat_model_stream":
                            chunk = event.get("data", {}).get("chunk", None)
                            if chunk and hasattr(chunk, "content"):
                                token = chunk.content
                                if token:  # Only send non-empty tokens
                                    yield f"data: {json.dumps({'token': token})}\n\n"
                                    # prvent blocking we add delay 
                                    await asyncio.sleep(0)
                
                # Final fallback to non-streaming
                else:
                    response = await graph.ainvoke(state, config=config)
                    answer_text = response.get("answer", "")
                    for word in answer_text.split():
                        yield f"data: {json.dumps({'token': word + ' '})}\n\n"
                        await asyncio.sleep(0.01)
                        
        except Exception as e:
            error_msg = f"Error: {str(e)}"
            yield f"data: {json.dumps({'token': error_msg})}\n\n"

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",  # This is SSE, don’t wait for completion
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",
            "Connection": "keep-alive"
        }
    )



# event = {
#   "event": "on_chat_model_stream",
#   "name": "ChatOpenAI",
#   "data": {
#       "chunk": AIMessageChunk(content="Hel")
#   },
#   "tags": ["llm"],
#   "metadata": {...}
# }

# langgraph has many kind of event
# Event name	   ===> Meaning
# on_chain_start	===> A chain/node started
# on_chain_end	===> A chain/node finished
# on_chat_model_start ===>	LLM started
# on_chat_model_stream ===>	LLM produced a token
# on_chat_model_end  ===>	LLM finished
# on_tool_start	 ===> Tool execution started
# on_tool_end ===>	Tool execution finished



# ============= audio endpoint ==============


from fastapi import UploadFile, File
import openai
import tempfile,os
from pydub import AudioSegment
from src.audio.audio_pipeline import AudioToText



# audio transcripion llm
open_ai_api = os.environ.get("OPENAI_API_KEY")

# sam as above just the input is audio(transcripn)
audio_to_text = AudioToText()

@app.post("/chat/audio")
async def chat_audio(file: UploadFile = File(...)):
    """
    Audio endpoint with streaming response
    Returns SSE stream with transcription first, then answer tokens
    """
    audio_path = None
    
    async def audio_event_generator():
        nonlocal audio_path
        try:
            # Save uploaded file
            suffix = os.path.splitext(file.filename)[-1]
            with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
                tmp.write(await file.read())
                audio_path = tmp.name

            # 1. Transcribe audio
            user_text = await asyncio.to_thread(audio_to_text.transcribe, audio_path)
            print("Transcribed text:", user_text)

            # Send transcription to frontend
            yield f"data: {json.dumps({'type': 'transcription', 'text': user_text})}\n\n"
            await asyncio.sleep(0.05)  # Small delay for UX

            # 2. Stream RAG pipeline response
            with PostgresSaver.from_conn_string(CONNECTION_STRING) as checkpointer:
                
                checkpointer.setup()
                config = {"configurable": {"thread_id": "audio"}}
                state = {
                    "collection_name": collection_name,
                    "messages": [HumanMessage(content=user_text)],
                }

                # Use astream_events for token-level streaming
                if hasattr(graph, "astream_events"):
                    print("token level streaming is being used")  #debugggg
                    async for event in graph.astream_events(
                        state,
                        config=config,
                        version="v2"
                    ):
                        # Filter for LLM token events
                        if event["event"] == "on_chat_model_stream":
                            chunk = event.get("data", {}).get("chunk", None)
                            if chunk and hasattr(chunk, "content"):
                                token = chunk.content
                                if token:
                                    yield f"data: {json.dumps({'type': 'token', 'token': token})}\n\n"
                                    await asyncio.sleep(0)
                
                # Final fallback
                else:
                    response = await graph.ainvoke(state, config=config)
                    answer_text = response.get("answer", "")
                    for word in answer_text.split():
                        yield f"data: {json.dumps({'type': 'token', 'token': word + ' '})}\n\n"
                        await asyncio.sleep(0.01)

        except Exception as e:
            error_msg = f"Error: {str(e)}"
            print("Chat audio endpoint error:", e)
            yield f"data: {json.dumps({'type': 'error', 'message': error_msg})}\n\n"
        
        finally:
            # Cleanup audio file
            if audio_path and os.path.exists(audio_path):
                os.remove(audio_path)

    return StreamingResponse(
        audio_event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",
            "Connection": "keep-alive"
        }
    )








@app.get("/")
async def root():
    return {"message":"Hello, this is the RAG chatbot backend."}



if __name__=="__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)