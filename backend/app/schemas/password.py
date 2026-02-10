from pydantic import BaseModel, Field

# 1. Create the Schema (Request Body)
class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str = Field(..., min_length=5)