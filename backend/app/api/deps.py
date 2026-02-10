from typing import Optional

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlmodel import select
from app.core.database import SessionDep
from app.core.security import SECRET_KEY, ALGORITHM
from app.models.user import User
from app.schemas.token import TokenPayload

# This tells FastAPI that the route to get a token is "/api/v1/auth/login"
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/login", auto_error=False)


def get_current_user_optional(
        session: SessionDep,
        token: Optional[str] = Depends(oauth2_scheme),
) -> User | None:
    if token:
        credentials_exception = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            email: str = payload.get("sub")
            if email is None:
                raise credentials_exception
            token_data = TokenPayload(sub=email)
        except JWTError:
            raise credentials_exception

        user = session.exec(select(User).where(User.email == token_data.sub)).first()
        if user is None:
            raise credentials_exception
        return user
    else:
        return None