from typing import Any, Dict, List

from sqlalchemy import Column
from sqlalchemy.dialects.postgresql import JSONB
from sqlmodel import Field
from uuid import UUID

from app.models.Base import Base

class MatchResult(Base, table=True):
    __tablename__ = "matches"

    user_id: UUID = Field(foreign_key="users.id", index=True)
    resume_id: UUID = Field(foreign_key="resumes.id", index=True)
    job_filename: str   
    final_score: float
    match_info: dict[str, Any] = Field(sa_column=Column(JSONB))
    insights: str
