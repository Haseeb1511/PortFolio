from langchain_core.documents import Document
from langchain_postgres import PGVector
from sqlalchemy.pool import NullPool
from langchain.messages import AIMessage, HumanMessage

from src.graph.state import ChatState
from src.db_connection.connection import CONNECTION_STRING
from src.agent.model_loader import llm, embedding_model
from src.prompt.prompt import template


class Nodes:
    def __init__(self) -> None:
        pass

    def retriever(self,state: ChatState):     
        vectorstore = PGVector(
            connection=CONNECTION_STRING,
            collection_name=state["collection_name"],
            embeddings=embedding_model,
            use_jsonb=True
        ) #type:ignore

        retriever = vectorstore.as_retriever(
            search_type="similarity",
            search_kwargs={
                "k": 5
            }
        )

        humman_message = state["messages"][-1].content
        retrieved_docs = retriever.invoke(humman_message)  # type:ignore

        state["retrieved_docs"] = retrieved_docs
        return state

    def agent(self,state:ChatState):
        # 1 builld context
        retrieved_docs = state.get("context","")
        context = "\n\n".join([doc.page_content for doc in state["retrieved_docs"]])

        #2 get last humman message
        human_message = [m for m in state["messages"] if isinstance(m, HumanMessage)][-1].content

        #3 format prompt
        prompt = template.format(context=context, question=human_message)

        # call llm
        response = llm.invoke(prompt)

        return {
            "messages":state["messages"] + [AIMessage(content=response.content)],
            "answer": response.content,
            "context": context
        }
