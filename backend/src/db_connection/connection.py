from supabase import create_client
import os

from dotenv import load_dotenv
load_dotenv()


CONNECTION_STRING = os.environ.get("CONNECTION_STRING","")
SUPERBASE_SERVICE_ROLE_KEY = os.environ.get("SUPERBASE_SERVICE_ROLE_KEY","")
SUPABASE_URL = os.environ.get("SUPABASE_URL","")




supabase_client = create_client(SUPABASE_URL,SUPERBASE_SERVICE_ROLE_KEY)
collection_name = "haseeb_portfolio"
print("Succefully coonectd to Supabase client")