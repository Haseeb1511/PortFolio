from src.db_connection.connection import CONNECTION_STRING
import json
from fastapi import APIRouter,Request

#To stream tokens, you need to return a streaming response from FastAPI
from fastapi.responses import StreamingResponse
import asyncio

from fastapi import UploadFile, File
import tempfile,os
from src.audio.audio_pipeline import AudioToText
from backend.services.streaming import streaming_token
from src.db_connection.connection import collection_name
from langchain.messages import HumanMessage

router = APIRouter()


# audio transcripion llm
open_ai_api = os.environ.get("OPENAI_API_KEY")

# audio to text funciton we use to transcripe the audio
audio_to_text = AudioToText()


@router.post("/chat/audio")
async def chat_audio(
    req:Request,
    file: UploadFile = File(...),
                     ):
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

                if await req.is_disconnected():
                    print("Client disconnected during upload")
                    return


            # 1. Transcribe audio
            user_text = await asyncio.to_thread(audio_to_text.transcribe, audio_path)
            print("Transcribed text:", user_text)

            if await req.is_disconnected():
                    print("Client disconnected during upload")
                    return


            # Send transcription to frontend
            yield f"data: {json.dumps({'type': 'transcription', 'text': user_text})}\n\n"
            



            #inital state
            state = {
                "collection_name": collection_name,
                "messages": [HumanMessage(content=user_text)],
            }

            #forward graph token
            # by doing tis we are not returning streaming resposne as our streaming funciton return StreamingResponse but here we return our on streaming response
            # so using.body_iterator we are making sure thier is no streaming resposne
            async for chunk in streaming_token(req, state).body_iterator:
                if isinstance(chunk, bytes):
                    chunk = chunk.decode("utf-8")
                yield chunk


        
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
 


# return StreamingResponse(
#     event_generator(),
#     media_type="text/event-stream",  # This is SSE, don’t wait for completion
#     headers={
#         "Cache-Control": "no-cache",
#         "X-Accel-Buffering": "no",
#         "Connection": "keep-alive"
#     }
# )

# THis create a response object which exposes .body_iterator(async iterator yielding bytes)
# async for chunk in streaming_token(req, state).body_iterator:
#     yield chunk
# so by doing tis we are not returning streaming resposne