from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from langgraph.checkpoint.postgres import PostgresSaver
from src.graph.workflow import Agent
from src.agent.model_loader import llm
from src.graph.workflow import Agent
from src.db_connection.connection import CONNECTION_STRING,collection_name,create_client
import uvicorn
import logging
from langchain.messages import HumanMessage
from pydantic import BaseModel
from prometheus_fastapi_instrumentator import Instrumentator

app = FastAPI()

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

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    try:
        with PostgresSaver.from_conn_string(CONNECTION_STRING) as checkpointer:
            checkpointer.setup()
            config = {"configurable":{"thread_id":"1"}}
            state = {
                "collection_name":collection_name,
                "messages":[HumanMessage(content=request.message)],
            }

            # using ainvoke
            if hasattr(graph,"ainvoke"):
                response = await graph.ainvoke(state, config=config)   #type:ignore
                print("Used ainvoke method")
            else:
                response = await graph.abulk_update_stateinvoke(state, config=config)   #type:ignore

            return {"messages": response.get("messages"),
                    "answer": response.get("answer")}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))




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
    audio_path = None
    try:
        suffix = os.path.splitext(file.filename)[-1]
        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
            tmp.write(await file.read())
            audio_path = tmp.name

        # 1 Transcribe
        user_text = await asyncio.to_thread(audio_to_text.transcribe,audio_path)
        user_text = audio_to_text.transcribe(audio_path)
        print("Transcribed text:", user_text)

        # 2 RAG pipeline
        with PostgresSaver.from_conn_string(CONNECTION_STRING) as checkpointer:
            checkpointer.setup()
            config = {"configurable": {"thread_id": "audio"}}
            state = {
                "collection_name": collection_name,
                "messages": [HumanMessage(content=user_text)],
            }


            # using ainvoke 
            if hasattr(graph,"ainvoke"):
                response = await graph.ainvoke(state, config=config)   #type:ignore
                print("Used ainvoke method")
            else:
                response = await graph.abulk_update_stateinvoke(state, config=config)   #type:ignore


        return {
            "input_type": "audio",
            "transcription": user_text,
            "answer": response.get("answer", "No answer returned."),
            "messages": response.get("messages", []),
        }

    except Exception as e:
        print("Chat audio endpoint error:", e)
        return {
            "error": str(e),
            "transcription": "[Failed]",
            "answer": "[Failed]",
            "messages": [],
        }
    finally:
        if audio_path and os.path.exists(audio_path):
            os.remove(audio_path)









@app.get("/")
async def root():
    return {"message":"Hello, this is the RAG chatbot backend."}



if __name__=="__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)