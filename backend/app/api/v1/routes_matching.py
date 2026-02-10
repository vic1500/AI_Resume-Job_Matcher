from fastapi import APIRouter, UploadFile, File, Depends, Form, HTTPException
from uuid import UUID

from sqlmodel import desc, select

from app.api.deps import get_current_user_optional
from app.core.database import SessionDep
from app.models.resume import Resume
from app.models.user import User
from app.models.match import MatchResult
from app.services.match_service import compute_final_score
from app.schemas.match import MatchResponse

match_router = APIRouter()

@match_router.get("/health")
def health():
    return {"status": "ok"}

@match_router.post("/match", response_model=MatchResponse) # <--- ADD THIS
async def match_resume_to_job(
        # Make files Optional so we can use saved ID/Text instead
        session: SessionDep,
        resume: UploadFile | None = File(None),
        job_description: UploadFile | None = File(None),

        # New fields for Quick Match
        resume_id: UUID | None = Form(None),
        job_text: str | None = Form(None),  # In case they paste JD text

        current_user: User | None = Depends(get_current_user_optional),
):
    # ---------------------------------------------------------
    # PART 1: PREPARE RESUME BYTES (From File OR Database)
    # ---------------------------------------------------------
    resume_bytes = None
    resume_filename = "unknown_resume.pdf"

    if current_user and resume_id:
        # Case A: User selected a Saved Resume
        stored_resume = session.get(Resume, resume_id)
        if not stored_resume or stored_resume.user_id != current_user.id:
            raise HTTPException(404, "Saved resume not found")

        resume_bytes = stored_resume.file_data  # Load bytes from DB
        resume_filename = stored_resume.name

    elif resume:
        # Case B: User uploaded a new file
        resume_bytes = await resume.read()
        resume_filename = resume.filename

    else:
        raise HTTPException(400, "You must upload a resume OR select a saved one.")

    # ---------------------------------------------------------
    # PART 2: PREPARE JD BYTES (From File OR Pasted Text)
    # ---------------------------------------------------------
    jd_bytes = None
    jd_filename = "job_description.txt"

    if job_description:
        jd_bytes = await job_description.read()
        jd_filename = job_description.filename
    elif job_text:
        # If they pasted text, convert it to bytes so your function is happy
        jd_bytes = job_text.encode('utf-8')
    else:
        raise HTTPException(400, "You must provide a Job Description.")

    # ---------------------------------------------------------
    # PART 3: CALL YOUR ORIGINAL FUNCTION
    # ---------------------------------------------------------
    # We pass exactly what it expects: bytes and filenames
    final_score, match_info, insights = compute_final_score(
        resume_bytes=resume_bytes,
        resume_filename=resume_filename,
        jd_bytes=jd_bytes,
        jd_filename=jd_filename,
    )

    if current_user and resume_id:
        match_record = MatchResult(
            user_id=current_user.id,
            resume_id=resume_id,
            job_filename=jd_filename,
            final_score=final_score,
            match_info=match_info,
            insights=insights
        )

        session.add(match_record)
        session.commit()
        session.refresh(match_record)

    return {
        "final_score": final_score,
        "match_info": match_info,
        "insights": insights
    }


@match_router.get("/match/history", response_model=list[MatchResult])
def get_match_history(
    session: SessionDep,
    current_user: User = Depends(get_current_user_optional)
):
    if not current_user:
        raise HTTPException(status_code=401, detail="Not Authenticated")
    
    statement = select(MatchResult).where(MatchResult.user_id == current_user.id).order_by(desc(MatchResult.created_at))
    results = session.exec(statement).all()
    return results

@match_router.delete("/match/history/{match_id}")
def delete_history(
        session: SessionDep,
        match_id: UUID,
        current_user: User = Depends(get_current_user_optional)
):
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated")

        # Find the match
    match_record = session.get(MatchResult, match_id)

    if not match_record:
        raise HTTPException(status_code=404, detail="Match record not found")

    # Ensure the user owns this record
    if match_record.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this record")

    session.delete(match_record)
    session.commit()
    return None
    
