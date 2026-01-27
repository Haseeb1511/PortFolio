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
            response = graph.invoke(state, config=config)   # type: ignore
            return {"messages": response.get("messages"),
                    "answer": response.get("answer")}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))




@app.get("/")
async def root():
    return {"message":"Hello, this is the RAG chatbot backend."}



if __name__=="__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)