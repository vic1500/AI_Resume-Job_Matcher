from pydantic import BaseModel
from typing import List, Dict, Any


# 1. Detailed component schemas (Optional but recommended)
class MatchDetails(BaseModel):
    matched_skills: List[str]
    absent_skills: List[str]
    score: float


# 2. The Main Response Schema
class MatchResponse(BaseModel):
    final_score: float
    match_info: MatchDetails | Dict[str, Any]
    insights: List[str] | Dict[str, Any] | str