# Casebook: investigation and attack-surface workspace (bookit rework) - plan v0.4

Status: v0.4 broadens the product per the author's direction (v0.3 was passive-OSINT-only and overlapped too much with Upzy). Nothing below is built yet beyond what M0-M1 of v0.3 already shipped (repo rework, landing page, auth skeleton).

## 1. What changed from v0.3, and why

v0.3 was a passive-only OSINT notebook. The author's view: that scope is small enough that it would have just been a feature added to Upzy, not its own product. This version keeps the case/entity/evidence model (it's the best part of v0.3) but adds a second capability: **authorized, verified active checks** against infrastructure the account has proven it controls — closer in ambition to how ProjectDiscovery's tooling works (template-based checks, large library, fast) than to a pure recon notebook.

**What this product will not become**, stated plainly because the author asked about PentAGI- and Strix-style autonomous agents: Casebook does not run an AI agent that decides on its own to exploit a target. Every active check is a scoped, mostly read-only probe (template-based detection, not a weaponized exploit chain), every target must be ownership-verified before any active check runs against it, and AI in this product explains and suggests, it never executes. That line is not a placeholder to revisit later; it is the thing that keeps this legally and ethically different from an autonomous attacker-in-a-box, and it stays even as the rest of the scope grows.

## 2. What it is

A hosted workspace with two halves that share one case and one entity graph:

1. **Investigate (passive, no verification needed).** Open a case, add seeds (a domain, a username, an organisation, a repository, an image), and collectors pull public data in. Every fact keeps its evidence: source, time, snapshot, hash.
2. **Verify (active, ownership required).** Once a target is ownership-verified (DNS TXT record or a well-known file, the same pattern Upzy already uses), a much larger library of non-destructive checks can run against it: template-based detection of exposed services, known-vulnerable versions, misconfigurations, default credentials on auth endpoints via a bounded, rate-limited attempt count, and the CVE/CISA-KEV/EPSS enrichment Upzy already does. Findings come with the fix for the stack in question, mirroring Upzy's "the fix, not a report" line.

Both halves write to the same case, so a recon pivot (a new subdomain, a new IP) can become a verify target in one click once ownership is confirmed, and a verify finding can pull in the recon context that explains it.

One line for the README: *"A case file for the open web, with the receipts to back it up."*

## 3. Principles and guardrails (updated)

1. **Passive investigation needs no verification; active checks always do.** Ownership verification is required before any check that sends more than a normal page request (template probes, service fingerprinting, bounded auth-endpoint checks).
2. **No exploitation, ever, in this product.** Active checks detect a condition (a version string, a response pattern, a misconfigured header); they do not achieve code execution, exfiltrate data, or chain findings into an automated attack. That boundary is enforced in the check format itself, not left to the operator's judgement per-run.
3. **No autonomous action.** AI explains, summarises and suggests the next check or pivot; a person clicks to run anything. There is no agent loop that plans and executes multi-step attacks on its own.
4. **A case needs a stated purpose and scope.** Collectors and checks refuse seeds/targets outside the case scope when a scope is set.
5. **People module stays public-profile-only.** No facial recognition, no home-address aggregation, no data-broker sources.
6. **Audit log** of every collector run and every check run, who ran it, against what, and why.
7. **SSRF guard, rate limits and ownership gating** on all outbound checks, reusing and sharing code with Upzy and Lookfar (resolve and pin the address at connect time, refuse private ranges, per-account quotas).
8. **Source and check terms respected.** Each collector and each check declares its source/basis, rate limit, and whether it needs a key.

## 4. Scope

### 4a. Investigate (passive, phased as in v0.3)

| Phase | Subject | Examples |
|---|---|---|
| A | Domains and infrastructure | WHOIS/RDAP, DNS records and history, certificate transparency, ASN/IP ownership, web technologies, Wayback snapshots |
| B | Code and leaks | Public GitHub users/orgs, repos, commit emails, secret-pattern scan of public repos, package maintainers |
| C | Organisations and people (public profiles) | Username presence, company registries, public social profiles |
| D | Images and geolocation | EXIF, perceptual hash, map correlation |

### 4b. Verify (active, new in v0.4, ownership-gated)

| Area | Examples |
|---|---|
| Exposure | Open services and the software/version they present, exposed admin panels, default or sample pages left live |
| Template checks | A growing library of non-destructive detection templates (think nuclei's model): known-vulnerable versions, common misconfigurations, missing security headers, weak TLS |
| Enrichment | CVE detail, CISA KEV and EPSS scoring on anything matched, same as Upzy |
| Bounded auth checks | A small, rate-limited, explicitly-listed set of credential checks against an account's own login endpoints only (e.g. confirming a default admin password was changed) — opt-in per target, off by default |

The template library is the ProjectDiscovery-style ambition: a large, community-extendable set of checks, not a handful of hand-coded probes.

## 5. Architecture

```
web/            Next.js 16 (App Router), shadcn/ui, Tailwind v4: cases, graph, timeline, reports
api/            FastAPI: REST + auth, case/entity/evidence/finding endpoints, OpenAPI
worker/         Python workers: collector runner (passive) and check runner (active, ownership-gated)
collectors/     one package per passive collector, discovered by entry point
checks/         one package per active check/template, same contract plus severity + remediation
mcp/            MCP server (read-only case/finding tools) and an Upzy MCP client collector
reports/        Markdown and PDF rendering
docs/           ARCHITECTURE, COLLECTORS, CHECKS, GUARDRAILS, PLAN
```

- **Database:** PostgreSQL. Entities, edges and findings as tables with JSONB properties. pgvector later for similarity search over evidence.
- **Queue:** Postgres `FOR UPDATE SKIP LOCKED`, shared pattern with Lookfar and Upzy.
- **Auth:** Better Auth on the Next.js side, API verifies the signed session cookie against the shared Postgres.
- **Data access:** SQLAlchemy 2.0 with Alembic for domain tables (API is Python); Better Auth owns its own tables; the web app always calls the API, never the database directly.
- **Ownership verification:** DNS TXT record or `/.well-known/casebook-verify.txt`, same mechanism Upzy uses for its own targets — and see §6, the two products can share a verification record so a target verified in one is trusted in the other.
- **Check engine:** a sandboxed runner per check, hard timeout and request budget per run, explicit output schema (`detected: bool, evidence, severity, remediation`). No check is given shell access or the ability to chain its own output into another check without a human clicking "run next."
- **Evidence store:** raw responses to disk or S3-compatible storage, SHA-256 on every observation and finding.

## 6. Integration with Upzy

Upzy already does continuous monitoring and passive attack-surface scanning for verified-owner sites. Casebook adds deep, on-demand investigation plus a larger active-check library. Rather than duplicate either product's strengths, they talk to each other:

- **Casebook exposes an MCP server** (`mcp/server.py`) with read-only tools: `list_cases`, `get_entity`, `get_finding`, `search_evidence`, `get_report`. Any MCP client — Upzy's own AI copilot, a Claude session, another internal tool — can query a case's findings with a personal API token scoped to that account, same hashed-token pattern as Upzy's.
- **Casebook can pull from Upzy as a source.** A collector (`collectors/upzy.py`) calls Upzy's API (or Upzy's own MCP server, once it has one) for a verified domain's current uptime/grade/scan history, and drops it into the case as evidence with Upzy as the cited source. This means a Casebook investigation of a company can include "here is what their public status page and security grade already show" without re-deriving it.
- **Shared ownership verification.** A domain verified in Upzy can be trusted by Casebook for that account (and vice versa) via a shared `verified_targets` table or a small internal API, so the user proves ownership once, not twice.
- **No shared exploitation surface.** The integration is read/enrich only in both directions; neither product triggers the other's active checks remotely. That keeps the "no autonomous action" line intact even across the two products.

This is additive, not a merge: Upzy stays the always-on monitor, Casebook stays the on-demand investigation and deep-check workspace, and MCP is the thin, read-only bridge between them.

## 7. AI role (opt-in, on your own key, unchanged from v0.3)

Explains and connects, never acts:
- summarise an entity, a cluster, or a set of findings
- suggest next pivots or next checks (the user clicks to run them)
- draft the report text from the evidence and findings
- flag low-confidence or contradictory links

It never runs collectors or checks, never fetches anything itself, and only sees data already in the case. Provider-agnostic, same as Upzy.

## 8. Data model (v1, extends v0.3)

- `cases` (id, title, purpose, scope, owner, status)
- `entities` (id, case_id, type, value, label, properties jsonb)
- `edges` (id, case_id, from, to, relation, confidence, source_observation)
- `observations` (id, case_id, entity_id, collector, fetched_at, raw_ref, sha256, summary)
- `verified_targets` (id, owner_account_id, target, method, verified_at, shared_with: [upzy, casebook])
- `findings` (id, case_id, entity_id, check, severity, detected_at, evidence, remediation, cve_refs)
- `runs` (id, case_id, collector_or_check, kind: passive|active, status, cost, started_at, finished_at, error)
- `reports` (id, case_id, format, generated_at, ref)
- `audit_log` (id, actor, action, case_id, detail, at)

## 9. Milestones

| M | Goal | Done when |
|---|---|---|
| M0 | Repo rework | done: bookit renamed, event code removed, README, licence, CI |
| M1 | Landing and auth | done: landing page, Better Auth skeleton |
| M2 | Core investigate | cases, entities, queue, one collector (RDAP), evidence hashing, audit log |
| M3 | Domains and infrastructure | DNS, CT logs, ASN/IP, tech detection, Wayback; pivots between them |
| M4 | Graph and timeline | interactive graph, filters, entity detail panel |
| M5 | Ownership verification | DNS TXT / well-known file flow, `verified_targets` table |
| M6 | Verify: check engine | sandboxed runner, first ~20 non-destructive template checks, severity + remediation |
| M7 | Verify: enrichment | CVE, CISA KEV, EPSS scoring on matched findings |
| M8 | MCP bridge | Casebook MCP server (read-only), Upzy-as-source collector, shared `verified_targets` |
| M9 | Code and leaks, reports | GitHub/package collectors; Markdown/PDF export with evidence appendix |
| M10 | AI assist | summaries, pivot/check suggestions, report drafting |
| M11 | People, images, launch | public-profile collectors, EXIF/map, landing polish, portfolio entry |

M2-M6 is the first release worth showing: investigation plus a credible, safely-scoped check library. M8 (MCP) is deliberately early because it is what makes this more than "Upzy's recon tab."

## 10. Risks

- **Scope creep:** now two capabilities instead of one. Mitigation: the M2-M6 order above is a hard sequence; no active check ships before ownership verification (M5) ships.
- **Active checks drifting toward exploitation:** the real risk of this pivot. Mitigation: the check output contract (§5/§8) has no field for "achieved execution" or "extracted data," only `detected`; code review on every new check against §3.2; a documented boundary in `docs/CHECKS.md` that a reviewer checks before merging a new template.
- **Legal and ethics (people module):** unchanged from v0.3 — purpose-per-case, audit log, public-profile-only, no biometrics.
- **Overlap with Upzy persists if the bridge (M8) slips.** Mitigation: ship M8 in the first release wave, not as a late add-on.
- **Overlap with existing tools** (nuclei/ProjectDiscovery, SpiderFoot, Maltego): the angle is one case model across both passive and active work, evidence-first reporting, and the Upzy bridge, not a bigger template library for its own sake.

## 11. Name

Unchanged: **Casebook**, hosted at `casebook.codebyaadi.com`.

## 12. Open questions

1. Is the split in §2 (Investigate / Verify) the right shape, or should Verify be scoped down further for v1 (e.g. header/TLS/version checks only, no auth-endpoint checks at all until later)?
2. Should the bounded auth-endpoint checks in §4b ship at all in v1, or wait until there's a clear customer asking for them? They're the highest-risk item in this plan.
3. For the Upzy bridge: same account only (an Upzy workspace linked to a Casebook workspace by the same person/org), or should it ever support one account querying another's Upzy data with that account's consent?
4. Tech stack otherwise stays as v0.3 (Next.js/shadcn/FastAPI/SQLAlchemy/Postgres/oxlint+oxfmt) unless you want the check engine itself in Go to reuse ProjectDiscovery's own template format directly instead of a Python-native one — that's a real option if template compatibility with nuclei matters to you.

## 13. Hosted-service notes (unchanged from v0.3, now also covering active checks)

- Terms of service and acceptable-use policy, now explicitly covering active checks: ownership verification is mandatory, checks against unverified targets are rejected server-side, not just discouraged in copy.
- Per-account rate limits and quotas on both collector and check runs, outbound allow-lists, so the service can't be used as an open scanning proxy.
- Each collector/check's source terms must permit commercial use; track in `docs/COLLECTORS.md` and `docs/CHECKS.md`.
- Data retention and deletion: cases, evidence and findings deleted on request, raw snapshots expire.
- Privacy policy covering what is stored about investigated subjects and about scanned infrastructure.
- Billing after the first release wave (through M6).
