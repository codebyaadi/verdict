# Casebook

**A case file for the open web, with the receipts to back it up.**

Casebook is a hosted investigation workspace with two halves that share one case: **Investigate**, passive open-source collection (a domain, a username, an organisation, a repository, an image pulled into a connected entity graph, every fact kept with its source, time, snapshot and hash), and **Verify**, a growing library of non-destructive checks you can run once a target's ownership is confirmed — exposed services, known-vulnerable versions, misconfigurations, scored against CVE/CISA-KEV/EPSS, each with the fix for your stack.

Casebook does not run an autonomous agent that exploits targets. Every active check detects a condition; none of them achieve code execution or chain into an automated attack, and every active check needs a verified owner and a human click to run. AI in this product explains and suggests; it never acts on its own. See [docs/PLAN.md](docs/PLAN.md) for the full plan and that boundary's rationale.

> **Early days.** Casebook is being built in the open, milestone by milestone. Sign-in and the landing page work today. Cases, collectors, ownership verification and the check engine are next.

## Principles

- **Passive investigation needs no verification; active checks always do.**
- **No exploitation, ever, in this product**, and **no autonomous action** — AI explains and suggests, a person runs everything.
- **Every case has a purpose and a scope**, and every collector and check run is audit-logged.
- **People lookups are limited to public profiles** the person chose to publish. No facial recognition.

## Integration with Upzy

Casebook and [Upzy](https://upzy.codebyaadi.com) (continuous uptime and attack-surface monitoring) share an ownership-verification record and talk over a read-only MCP bridge: Casebook can pull a verified domain's current Upzy grade and scan history into a case as cited evidence, and any MCP client can query a Casebook case's findings with a scoped personal API token. See [docs/PLAN.md §6](docs/PLAN.md#6-integration-with-upzy).

## Stack

Next.js 16 and shadcn/ui · Tailwind v4 · Better Auth · FastAPI, SQLAlchemy/Alembic and Python workers · PostgreSQL · MCP · oxlint and oxfmt.

```
web/    Next.js app: landing page, sign-in, cases (Better Auth owns sign-up and sessions)
api/    FastAPI: verifies the Better Auth session cookie, serves cases, entities, evidence and findings
mcp/    Read-only MCP server over case/finding data, and an Upzy-as-source collector
docs/   PLAN.md and STYLE_GUIDE.md
```

## Develop

Requires [Bun](https://bun.sh), Python 3.12+ and a local PostgreSQL (`docker compose up -d db` starts one for development).

```bash
docker compose up -d db

cd web
cp .env.example .env     # set BETTER_AUTH_SECRET (openssl rand -base64 32)
bun install
bun run auth:migrate
bun run dev

cd ../api
python -m venv .venv && .venv/bin/pip install -e ".[dev]"
BETTER_AUTH_SECRET=<same secret> .venv/bin/uvicorn casebook.main:app --reload
```

Checks: `bun run lint`, `bun run format:check`, `bun run typecheck` in `web/`; `pytest` and `ruff check .` in `api/`.

## Licence

[MIT](LICENSE). Built by [codebyaadi](https://github.com/codebyaadi).
