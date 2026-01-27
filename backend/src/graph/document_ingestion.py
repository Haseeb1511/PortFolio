from langchain_core.documents import Document
import json

from langchain_text_splitters import RecursiveCharacterTextSplitter
from sqlalchemy import NullPool
from src.db_connection.connection import supabase_client,SUPABASE_URL,collection_name,CONNECTION_STRING
from langchain_postgres import PGVector
from tqdm import tqdm
from src.agent.model_loader import embedding_model


class PGVectorStoreCreation:

    def __init__(self,embedding_model,connection_string,data_path,collection_name=collection_name):
        self.connection_string = connection_string
        self.collection_name = collection_name   
        self.embedding_model = embedding_model
        self.data_path =  data_path
        self.batch_size = 50


    def data_loader(self):
        with open(self.data_path,"r",encoding="utf-8") as f:
            json_data = json.load(f)

            documents = [Document(page_content=item["text"],
                        metadata={**item["metadata"],"id":item["id"]})
                        for item in json_data]
            
        return documents
        

    def text_splitter(self):
        splitter = RecursiveCharacterTextSplitter(
            chunk_size=500,
            chunk_overlap=50,
            separators=["\n\n", "\n", " ", ""]
        )
 
        #split documne texpect list
        all_chunk = []
        for doc in self.data_loader():
            # split the document into chunks
            chunks = splitter.split_documents([doc])

            for chunk in chunks:
                chunk.metadata.update({
                "id":doc.metadata.get("id","unknown"),
                "category":doc.metadata.get("category","unknown"),
                "topic":doc.metadata.get("topic","unknown")
                })
            all_chunk.extend(chunks)
        return all_chunk


    def create_vector_store(self,chunks):
        vectorstore = PGVector(
                embeddings=self.embedding_model,
                collection_name=self.collection_name,
                connection=self.connection_string,
                use_jsonb=True,
                engine_args={"poolclass": NullPool}  # disable pooling
            ) #type:ignore
        

        # uploading embedding to supbase
        for i in tqdm(range(0,len(chunks),self.batch_size),desc="Uploading Embedding Vectors..."):
            batch = chunks[i:i+self.batch_size]
            vectorstore.add_documents(batch)
    
        # inseting metadata in to supabase
        rows = [
            {
            "doc_id":self.collection_name,
            "chunk_index":i,
            "page":chunk.metadata.get("page"),
            "content":chunk.page_content,
        } for i,chunk in enumerate(chunks)
        ]

        if rows:
            supabase_client.table("portfolio").insert(rows).execute()
        print("Vector store created successfully")
        return vectorstore




if __name__=="__main__":
    creator = PGVectorStoreCreation(
    embedding_model=embedding_model,
    connection_string=CONNECTION_STRING,
    data_path="backend/data/chat.json"
) #type:ignore


chunks = creator.text_splitter()
vector_store = creator.create_vector_store(chunks)


#  uv run python -m backend.src.graph.document_ingestion