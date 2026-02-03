from fastapi.middleware.cors import CORSMiddleware
from src.graph.workflow import Agent
from src.agent.model_loader import llm
from src.db_connection.connection import CONNECTION_STRING
from fastapi import FastAPI

from prometheus_fastapi_instrumentator import Instrumentator

# app.state.graph = Agent(llm).build_graph()
# graph = Agent(llm).build_graph()

async def lifespan(app:FastAPI):
    app.state.graph = Agent(llm).build_graph()
    print("Graph loaded and assigned to app.state.graph")
    yield


app = FastAPI(title="Portfolio",lifespan=lifespan)


# prometeus  expose metrics for monitoring
Instrumentator().instrument(app).expose(app)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Bind the endpoint with the fastapi object
from backend.routes import audio,chat,contact_me
app.include_router(audio.router)
app.include_router(chat.router)
app.include_router(contact_me.router)


@app.get("/")
async def root():
    return {"message":"Hello, this is the RAG chatbot backend."}



# if __name__=="__main__":
#     uvicorn.run(app, host="127.0.0.1", port=8000)











# Sorry, something went wrong. Please try again.  --->    Grpah laoding issue if this error  or  Backend SSE format ≠ Frontend parser