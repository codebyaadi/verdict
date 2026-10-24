from typing import Annotated

from fastapi import Depends, FastAPI, HTTPException, Request
from psycopg_pool import ConnectionPool

from verdict.config import settings
from verdict.session import COOKIE_NAMES, verify_cookie

app = FastAPI(title="Verdict API", version="0.1.0")

_pool: ConnectionPool | None = None


def pool() -> ConnectionPool:
    global _pool
    if _pool is None:
        _pool = ConnectionPool(settings.database_url, min_size=1, max_size=5, open=True)
    return _pool


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


def current_user(request: Request) -> dict[str, str]:
    cookie = next((request.cookies[n] for n in COOKIE_NAMES if n in request.cookies), "")
    token = verify_cookie(cookie, settings.better_auth_secret)
    if token is None:
        raise HTTPException(status_code=401, detail="Not signed in")
    with pool().connection() as conn:
        row = conn.execute(
            'SELECT u.id, u.email FROM "session" s JOIN "user" u ON u.id = s."userId" '
            'WHERE s.token = %s AND s."expiresAt" > now()',
            (token,),
        ).fetchone()
    if row is None:
        raise HTTPException(status_code=401, detail="Session expired")
    return {"id": row[0], "email": row[1]}


@app.get("/v1/me")
def me(user: Annotated[dict[str, str], Depends(current_user)]) -> dict[str, str]:
    return user
