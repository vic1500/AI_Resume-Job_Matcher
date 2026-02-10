from fastapi import APIRouter, Depends
from app.schemas.user import UserRead
from app.models.user import User
from app.api.deps import get_current_user_optional # Assuming you have a dependency to decode token

user_router = APIRouter()

@user_router.get("/me", response_model=UserRead)
def read_user_me(current_user: User = Depends(get_current_user_optional)):
    """
    Get current user.
    """
    return current_user