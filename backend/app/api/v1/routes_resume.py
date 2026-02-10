from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Response
from sqlmodel import select, delete
from uuid import UUID

from app.api.deps import get_current_user_optional
from app.models.match import MatchResult
from app.models.resume import Resume, ResumeBase
from app.models.user import User
from app.core.database import SessionDep

resume_router = APIRouter()

@resume_router.post("/upload_resume", response_model=ResumeBase)
async def create_resume(
    session: SessionDep,
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user_optional)
):
    """
    Upload/Save a new resume.
    """
    file_content = await file.read()

    # 2. Save to DB
    new_resume = Resume(
        name=file.filename,
        file_data=file_content,
        user_id=current_user.id
    )
    session.add(new_resume)
    session.commit()
    session.refresh(new_resume)
    return new_resume

@resume_router.get("/resumes", response_model=list[ResumeBase])
def read_resumes(
    session: SessionDep,
    current_user: User = Depends(get_current_user_optional)
):
    """
    Get all resumes belonging to the current user.
    """
    statement = select(Resume).where(Resume.user_id == current_user.id, Resume.is_deleted == False)
    resumes = session.exec(statement).all()

    return resumes

@resume_router.get("/resume/{resume_id}/download")
def download_resume(
    resume_id: UUID,
    session: SessionDep,
    current_user = Depends(get_current_user_optional)
):
    resume = session.get(Resume, resume_id)
    if not resume or resume.user_id != current_user.id:
        raise HTTPException(404, "Resume not found")

    # Return the raw bytes with the correct PDF header
    return Response(
        content=resume.file_data,
        media_type="application/pdf",
        headers={"Content-Disposition": f"inline; filename={resume.name}"}
    )

@resume_router.delete("/resume/{resume_id}")
def delete_resume(
        session: SessionDep,
        resume_id: UUID,
        current_user: User = Depends(get_current_user_optional)
):
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated")

        # Find the resume
    resume = session.get(Resume, resume_id)

    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")

    # Ensure the user owns this record
    if resume.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this record")

    resume.is_deleted = True

    session.add(resume)
    session.commit()
    session.refresh(resume)

    return {"message": "Resume moved to trash (History preserved)"}