# Verdict

**An AI pentester that finds it, proves it, and writes it up — on infrastructure you've proven you own.**

Verdict is a hosted, agentic penetration-testing workspace. It runs recon, maps the attack surface, scans for vulnerabilities across the common classes (access control, injection, SSRF/XXE, XSS/CSRF, auth/session, business-logic, API, infra), and then **confirms** the real ones with a non-destructive proof — so you get findings backed by evidence, not a wall of false positives.

> **Early days.** Verdict is being built in the open, milestone by milestone. Sign-in and the landing page work today. Recon, the scan engine, ownership verification and the validation runtime are next.

## How it works

Three tiers over one case, each needing more authorization than the last:

1. **Investigate** — passive, public-source collection into a connected entity graph. Every fact keeps its source, time, snapshot and hash.
2. **Scan** — active detection against an **ownership-verified** target, enriched with CVE / CISA-KEV / EPSS / CVSS and OWASP tags.
3. **Prove** — for findings you approve, an agent confirms each one with a **benign proof** (read `@@version` for SQLi, run `id` for command injection, hit a callback for SSRF) and attaches reproduction steps. Detected becomes confirmed.

## Where Verdict draws the line

Verdict is for operators testing systems they are authorized to test. By design it is **not** an autonomous attacker:

- **Authorization is enforced, not promised.** A target must pass ownership verification (DNS TXT / well-known file) *and* carry an explicit per-engagement authorization before any active request leaves the system. The API rejects anything else server-side.
- **Non-destructive, no post-exploitation.** Validation confirms a vulnerability with a harmless marker and stops. Nothing persists, pivots, exfiltrates real data, deletes, or degrades availability. The validation runtime is sandboxed with egress limited to the in-scope target and a callback.
- **The human approves the plan.** The agent proposes an attack path; a person approves each validation batch. No open-ended shell, no self-directed exploitation, no evasion features.

## Integration with Upzy

Verdict and [Upzy](https://upzy.codebyaadi.com) (continuous uptime and attack-surface monitoring) share an ownership-verification record and talk over a read-only MCP bridge: Verdict can pull a verified domain's current Upzy grade and scan history into a case as cited evidence, and any MCP client can query a Verdict case's confirmed findings with a scoped personal API token.

## Stack

Next.js 16 and shadcn/ui · Tailwind v4 · Better Auth · FastAPI, SQLAlchemy/Alembic and an agent orchestrator in Python · PostgreSQL · Docker validation sandbox · MCP · oxlint and oxfmt.

```
web/    Next.js app: landing page, sign-in, cases, findings, run viewer, reports
api/    FastAPI: verifies the Better Auth session cookie, the authorization policy gate, case/finding endpoints
mcp/    Read-only MCP server over case/finding data, and an Upzy-as-source collector
```

## Develop

Requires [Bun](https://bun.sh), Python 3.12+ and a local PostgreSQL (`docker compose up -d db`).

```bash
docker compose up -d db

cd web
cp .env.example .env     # set BETTER_AUTH_SECRET (openssl rand -base64 32)
bun install
bun run auth:migrate
bun run dev

cd ../api
python -m venv .venv && .venv/bin/pip install -e ".[dev]"
BETTER_AUTH_SECRET=<same secret> .venv/bin/uvicorn verdict.main:app --reload
```

Checks: `bun run lint`, `bun run format:check`, `bun run typecheck` in `web/`; `pytest` and `ruff check .` in `api/`.

## Licence

[MIT](LICENSE). Built by [codebyaadi](https://github.com/codebyaadi).
