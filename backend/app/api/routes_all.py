from fastapi import APIRouter

from app.api.v1.routes_auth import auth_router
from app.api.v1.routes_matching import match_router
from app.api.v1.routes_resume import resume_router
from app.api.v1.routes_user import user_router

router = APIRouter(prefix="/api/v1")

router.include_router(auth_router)
router.include_router(match_router)
router.include_router(user_router, prefix="/users")

router.include_router(resume_router)