from pydantic import BaseModel,EmailStr

class ContactRequest(BaseModel):
    name:str
    email:EmailStr
    subject:str | None=None
    message: str