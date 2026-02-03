import json
from fastapi.responses import StreamingResponse
import asyncio
from fastapi import Request



def streaming_token(
        request: Request,
        state:dict
        ):
    async def event_generator():
        graph = request.app.state.graph
        try:
            config = {"configurable": {"thread_id": "1"}}  # even if we dont add this nothing happen 

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
                                yield f"data: {json.dumps({'type': 'token', 'token': token})}\n\n"
                                # prvent blocking we add delay 
                                await asyncio.sleep(0)
                
            # Final fallback to non-streaming
            else:
                response = await graph.ainvoke(state, config=config)
                answer_text = response.get("answer", "")

                for word in answer_text.split():
                    yield f"data: {json.dumps({'type': 'token', 'token': word + ' '})}\n\n"
                    await asyncio.sleep(0.01)
                        
        except Exception as e:
            error_msg = f"Error: {str(e)}"
            yield f"data: {json.dumps({'type': 'error', 'message': error_msg})}\n\n"



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