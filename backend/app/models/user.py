from typing import List, Optional, TYPE_CHECKING

from sqlmodel import Field, Relationship

from app.models.Base import Base


if TYPE_CHECKING:
    from app.models.resume import Resume

class User(Base, table=True):
    __tablename__ = "users"

    username: str
    email: str = Field(unique=True, index=True)
    hashed_password: str
    resume: list["Resume"] = Relationship(back_populates="user")
