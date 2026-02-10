from sqlmodel import Field
from app.models.Base import Base

class JobDescription(Base, table=True):
    __tablename__ = "job_descriptions"

    user_id: int = Field(foreign_key="user.id")
    file_name: str
    text_content: str
