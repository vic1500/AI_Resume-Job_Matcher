from typing import Optional, TYPE_CHECKING

from sqlmodel import Field, Relationship
from sqlalchemy import LargeBinary, Column
from uuid import UUID

from app.models.Base import Base

if TYPE_CHECKING:
    from app.models.user import User

class ResumeBase(Base):
    name: str = Field(index=True)
    user_id: UUID = Field(foreign_key="users.id")



class Resume(ResumeBase, table=True):
    __tablename__ = "resumes"

    file_data: bytes = Field(sa_column=Column(LargeBinary))
    user: Optional["User"] = Relationship(back_populates="resume")
    is_deleted: bool = Field(default=False)