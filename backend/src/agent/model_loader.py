
from langchain_openai import ChatOpenAI,OpenAIEmbeddings

# caht model
llm = ChatOpenAI(model="gpt-4o-mini",temperature=0,streaming=True)

# llm model
embedding_model = OpenAIEmbeddings(model="text-embedding-3-small")