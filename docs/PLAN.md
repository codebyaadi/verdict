# Casebook: OSINT investigation workspace (bookit rework) - plan v0.3

Status: draft for review. Nothing has been changed in the bookit repo yet.

## 1. What it is

A hosted workspace (open-source code, MIT) for **passive** open-source intelligence. You open a **case**, add seeds (a domain, a username, an organisation, a repo, an image), and collectors pull public data into a typed **entity graph**. Every fact keeps its **evidence** (source, time, raw snapshot, hash). You pivot from one entity to the next, then export a report.

Different from Upzy: Upzy is defensive monitoring for your own sites. This is an investigator's notebook: cases, graph, evidence, reports.

One line for the README: *"A case file for the open web: collect public data, connect it, and prove where every fact came from."*

## 2. Principles and guardrails

These go in the README and are enforced in code, not just stated.

1. **Passive and public only.** No port scanning, no exploitation, no logins to third-party sites, no stealer logs, no leaked-database dumps.
2. **A case needs a stated purpose and scope.** Examples: "attack-surface review of my own company", "journalism", "CTF". Collectors refuse seeds outside the case scope when a scope is set.
3. **People module is limited to public profiles** the person chose to publish. No facial recognition, no home-address aggregation, no data-broker sources.
4. **Audit log** of every collector run, who ran it and why.
5. **SSRF guard and rate limits** on all outbound fetches, reusing the approach from Upzy and Lookfar (resolve and pin the address at connect time, refuse private ranges).
6. **Source terms respected.** Each collector declares its source, rate limit and whether it needs a key. Collectors that would break a site's terms are not shipped.

## 3. Scope by subject (all four, phased)

| Phase | Subject | Examples of collectors |
|---|---|---|
| A | Domains and infrastructure | WHOIS/RDAP, DNS records and history, certificate transparency, ASN and IP ownership, web technologies, Wayback snapshots |
| B | Code and leaks | Public GitHub users and orgs, repos, commit emails, secret-pattern scan of public repos, npm and PyPI maintainers, public paste search |
| C | Organisations and people (public profiles) | Username presence across public sites, company registries, public social profiles, breach-*exposure* checks via a legal API (counts only) |
| D | Images and geolocation | EXIF, perceptual hash and reverse-image links, map correlation of coordinates |

Start with A and B because the data is cleaner and the legal risk is lowest. C ships with the full guardrails above. D comes last because it is the heaviest.

## 4. Architecture

```
web/            Next.js 16 (App Router), shadcn/ui, Tailwind v4: cases, graph, timeline, reports
api/            FastAPI: REST + auth, case/entity/evidence endpoints, OpenAPI
worker/         Python workers: collector runner, scheduler
collectors/     one package per collector, discovered by entry point
reports/        Markdown and PDF rendering
docs/           ARCHITECTURE, COLLECTORS, GUARDRAILS, PLAN
```

- **Database:** PostgreSQL. Entities and edges as tables with JSONB properties. pgvector later for similarity search over evidence.
- **Queue:** Postgres `FOR UPDATE SKIP LOCKED` (same pattern as Lookfar) so one dependency, no Redis.
- **Auth:** Better Auth on the Next.js side (email and password first), with the API verifying the signed session cookie against the shared Postgres, as in Lookfar and Upzy.
- **UI:** shadcn/ui on Tailwind v4, themed with the Casebook tokens in `docs/STYLE_GUIDE.md`. Tooling: oxlint and oxfmt.
- **Data access:** neither Drizzle nor Prisma. The API is Python, so domain tables use SQLAlchemy 2.0 with Alembic migrations. Better Auth owns its own tables (`user`, `session`, `account`, `verification`) through `bun run auth:migrate`, and Alembic is configured to ignore them. The web app never queries domain tables, it calls the API. The API reads the `session` table with one raw SQL query.
- **Graph UI:** React Flow or Cytoscape.js. Decide in a spike.
- **Deploy:** run as a hosted service. Docker compose is for local development only. Provider API keys are managed per workspace.
- **Evidence store:** raw responses saved to disk or S3-compatible storage, SHA-256 recorded on the observation row.

### Collector contract

Each collector is a small Python package with a manifest:

```
name, source, accepts: [entity types], produces: [entity types],
needs_key: bool, rate_limit, ttl, passive: true
run(entity, ctx) -> observations[], new_entities[], edges[]
```

This keeps the platform extensible, which is the best thing to show on GitHub: "write a collector in 40 lines."

### Data model (v1)

- `cases` (id, title, purpose, scope, owner, status)
- `entities` (id, case_id, type, value, label, properties jsonb)
- `edges` (id, case_id, from, to, relation, confidence, source_observation)
- `observations` (id, case_id, entity_id, collector, fetched_at, raw_ref, sha256, summary)
- `runs` (id, case_id, collector, status, cost, started_at, finished_at, error)
- `reports` (id, case_id, format, generated_at, ref)
- `audit_log` (id, actor, action, case_id, detail, at)

## 5. AI role (opt-in, on your own key)

Explains and connects, never acts:
- summarise an entity or a cluster of entities
- suggest next pivots (the user clicks to run them)
- draft the report text from the evidence
- flag low-confidence or contradictory links

It never runs collectors, never fetches anything, and it sees only data already in the case. Provider-agnostic, same as Upzy (Groq, OpenAI, Anthropic, Gemini, OpenRouter).

## 6. Milestones

| M | Goal | Done when |
|---|---|---|
| M0 | Repo rework | bookit renamed, history kept, event code removed, new README, licence, CI |
| M1 | Core | auth, cases, entities, queue, one collector (RDAP), evidence hashing, audit log |
| M2 | Domains and infrastructure | DNS, CT logs, ASN/IP, tech detection, Wayback; pivots between them |
| M3 | Graph and timeline | interactive graph, filters, entity detail panel, timeline of observations |
| M4 | Code and leaks | GitHub, secret-pattern scan, package registries |
| M5 | Reports | Markdown and PDF export with an evidence appendix and hashes |
| M6 | AI assist | summaries, pivot suggestions, report drafting |
| M7 | People and organisations | public-profile collectors with guardrails and purpose prompts |
| M8 | Images and geolocation | EXIF, map view |
| M9 | Launch | landing page, docs, seeded demo case on fake data, portfolio entry |

M0-M3 is a credible first public release. Everything after that can ship incrementally.

## 7. Risks

- **Scope creep:** four subject areas is a lot. Mitigation: the phase order above, and a hard rule that M1-M3 ship before anything else starts.
- **Legal and ethics:** the people module is the risk. Mitigation: purpose-per-case, audit log, public-profile-only, no biometrics, clear README stance.
- **Source breakage and terms:** many OSINT sources change or restrict access. Mitigation: collectors are isolated and versioned, each one declares its source and limits.
- **Overlap with existing tools** (SpiderFoot, Maltego, Recon-ng): the angle is a modern UX, evidence-first reporting, and a small collector API, not more collectors.

## 8. Name

**Casebook.** It says what the product is: a case file for the open web. It is short, plain English and easy to say, in the same spirit as Lookfar. No OSINT project with that name turned up on GitHub. `casebook.dev` is taken by someone else, so host it at `casebook.codebyaadi.com` like Upzy, Lookfar and Avni.

Runners-up if you prefer: Tracewell, Sleuthbook.

## 9. Open questions

1. Is Casebook the name, or should I pick another?
2. Licence: decided, MIT.
3. Do you want the demo case to run on a real, consenting target (your own domain) or purely fake data?
4. Should M0 happen now (rename the repo and clear out bookit), or after you approve this plan?

## 10. Hosted-service notes (added v0.3)

Casebook is a product the author operates, so the operator carries the responsibility that a self-hosted tool would leave with its users:

- Terms of service and an acceptable-use policy that forbid harassment, stalking and targeting private individuals, with an abuse-report path and account suspension.
- Per-user rate limits and quotas on collector runs, plus outbound allow-lists, so the service cannot be used as an open scanning proxy.
- Each collector's source terms must permit commercial use. Check before shipping, and keep a list in `docs/COLLECTORS.md`.
- Data retention and deletion: cases and evidence are deleted on request, and raw snapshots expire.
- Privacy policy covering what is stored about investigated subjects.
- Billing and plans come after M3. MIT code means others may run their own copy, so the product's value has to be the hosted service, the data sources and the experience.
