"""Verify Better Auth session cookies.

Better Auth sets `better-auth.session_token` to `<token>.<signature>`, URL
encoded, where the signature is base64(HMAC-SHA256(secret, token)). The API
checks the signature, then looks the token up in the `session` table.
"""

import base64
import hashlib
import hmac
from urllib.parse import unquote

COOKIE_NAMES = ("better-auth.session_token", "__Secure-better-auth.session_token")


def verify_cookie(value: str, secret: str) -> str | None:
    """Return the session token if the signature is valid, else None."""
    if not value or not secret:
        return None
    raw = unquote(value)
    token, sep, signature = raw.rpartition(".")
    if not sep or not token or not signature:
        return None
    digest = hmac.new(secret.encode(), token.encode(), hashlib.sha256).digest()
    expected = base64.b64encode(digest).decode()
    if not hmac.compare_digest(expected, signature):
        return None
    return token
