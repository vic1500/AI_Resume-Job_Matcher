from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import select

from app.api.deps import get_current_user_optional
from app.core.database import SessionDep
from app.core.security import create_access_token, verify_password, ACCESS_TOKEN_EXPIRE_MINUTES, get_password_hash
from app.models.user import User
from app.schemas.password import ChangePasswordRequest
from app.schemas.token import Token
from app.schemas.user import UserRead, UserCreate

auth_router = APIRouter()


@auth_router.post("/login", response_model=Token)
def login_for_access_token(
        session: SessionDep,
        form_data: OAuth2PasswordRequestForm = Depends(),
):
    # 1. Find the user (OAuth2 form puts email in 'username' field)
    user = session.exec(select(User).where(User.email == form_data.username)).first()

    # 2. Check password
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # 3. Create Token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )

    return {"access_token": access_token, "token_type": "bearer"}


@auth_router.post("/signup", response_model=UserRead)
def register_new_user(
        user_in: UserCreate,
        session: SessionDep
):
    # 1. Check if user already exists
    statement = select(User).where(User.email == user_in.email)
    existing_user = session.exec(statement).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="A user with this email already exists."
        )

    # 2. Create the User DB Object
    # We map 'email' from the input, but we calculate 'hashed_password' manually
    user = User(
        username=user_in.username,
        email=user_in.email,
        hashed_password=get_password_hash(user_in.password)
    )

    # 3. Save to Database
    session.add(user)
    session.commit()
    session.refresh(user)  # Get the generated ID back

    return user


@auth_router.post("/change_password")
def change_password(
        payload: ChangePasswordRequest,
        session: SessionDep,
        current_user: User = Depends(get_current_user_optional)
):
    # Verify old password
    if not verify_password(payload.current_password, current_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect current password"
        )

    # Check if new password is same as old (optional but good practice)
    if payload.current_password == payload.new_password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="New password cannot be the same as the old password"
        )

    # Hash new password and save
    current_user.hashed_password = get_password_hash(payload.new_password)
    session.add(current_user)
    session.commit()
    session.refresh(current_user)

    return {"message": "Password updated successfully"}