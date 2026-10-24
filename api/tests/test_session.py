import base64
import hashlib
import hmac
from urllib.parse import quote

from fastapi.testclient import TestClient

from casebook.main import app
from casebook.session import verify_cookie

SECRET = "s3cret-for-tests"


def sign(token: str, secret: str = SECRET) -> str:
    digest = hmac.new(secret.encode(), token.encode(), hashlib.sha256).digest()
    return quote(f"{token}.{base64.b64encode(digest).decode()}", safe="")


def test_valid_cookie_returns_token():
    assert verify_cookie(sign("abc123"), SECRET) == "abc123"


def test_wrong_secret_is_rejected():
    assert verify_cookie(sign("abc123", "other"), SECRET) is None


def test_tampered_token_is_rejected():
    cookie = sign("abc123").replace("abc123", "abc124")
    assert verify_cookie(cookie, SECRET) is None


def test_garbage_and_empty_are_rejected():
    assert verify_cookie("", SECRET) is None
    assert verify_cookie("nodots", SECRET) is None
    assert verify_cookie(sign("abc123"), "") is None


def test_health():
    assert TestClient(app).get("/health").json() == {"status": "ok"}


def test_me_requires_cookie():
    assert TestClient(app).get("/v1/me").status_code == 401
