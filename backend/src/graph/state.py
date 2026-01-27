from typing import List, TypedDict
from langchain_core.messages import BaseMessage
from typing_extensions import Annotated
from langgraph.graph.message import add_messages
from langchain_core.documents import Document

class ChatState(TypedDict):
    # question: str
    context: str
    answer: str
    messages: Annotated[list[BaseMessage], add_messages]
    collection_name: str
    retrieved_docs: List[Document]
