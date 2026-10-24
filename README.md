# Casebook

**A case file for the open web.** Collect public data, connect it, and prove where every fact came from.

Casebook is a hosted OSINT investigation workspace. You open a case, add seeds (a domain, a username, an organisation, a repository, an image), and collectors pull public data into an entity graph. Every fact keeps its evidence: the source, the time it was fetched, a snapshot, and a hash. Export a report when you are done.

> **Early days.** Casebook is being built in the open, milestone by milestone. Sign-in works today. Cases, collectors, the graph and reports are next. See [docs/PLAN.md](docs/PLAN.md) for the roadmap.

## Principles

- **Passive and public only.** No port scanning, no exploitation, no logging in to third-party sites, no leaked-database dumps.
- **Every case has a purpose and a scope**, and every collector run is audit-logged.
- **People lookups are limited to public profiles** the person chose to publish. No facial recognition.
- **AI explains and suggests, it never acts.** It is opt-in and only sees data already in the case.

## Stack

Next.js 16 and shadcn/ui · Tailwind v4 · Better Auth · FastAPI and Python workers · PostgreSQL · oxlint and oxfmt.

```
web/    Next.js app: landing page, sign-in, cases (Better Auth owns sign-up and sessions)
api/    FastAPI: verifies the Better Auth session cookie, serves cases, entities and evidence
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
