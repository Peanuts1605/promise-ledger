# Promise Ledger - Devpost Draft

## Title

Promise Ledger: Agent Memory That Keeps Promises

## One-line pitch

Promise Ledger turns customer commitments into durable, owned records so an agent can show what it knows, wait when context is missing, and prepare review-only follow-ups instead of inventing confident answers.

## The problem

Small service teams make promises in calls, chat, and handoffs: an estimate by Friday, a permit answer by Wednesday, a repair update before a visit. The message may survive, but responsibility often does not. The next person sees a fragment of conversation and either misses the commitment or improvises a reply.

## What Promise Ledger does

Promise Ledger treats a promise as a first-class operational record: source, customer, project, due state, accountable owner, and an ordered event trail. Its policy is intentionally inspectable:

- No owner: `ASSIGN_OWNER`.
- Owner but no eligible customer-plus-project context: `HOLD_FOR_CONTEXT`.
- Owner plus scoped context: `PREPARE_REVIEW_DRAFT`.
- A prepared draft still requires owner review and is never sent automatically.

The point is not to preserve every chat. It is to keep a promise visible until one person owns the next move.

## How we built it

The public repository contains:

- a React proof interface that opens on the ownership risk;
- CockroachDB-ready tables for commitment records, immutable events, and scoped memory;
- a Node repository layer that refuses to fake persistence when `DATABASE_URL` is absent;
- a deterministic policy shared by the local API and AWS Lambda handler;
- a guarded public-safe demo seed covering all three meaningful decisions;
- a GitHub Actions gate that runs lint, production build, policy tests, schema verification, and seed verification on every push.

The live integration evidence will use the official `ccloud` CLI to provision and inspect the CockroachDB Cloud cluster, the CockroachDB Cloud Managed MCP Server in read-only mode for health/schema/audit inspection, and AWS Lambda plus HTTP API for the bounded API path.

## Why CockroachDB and AWS

CockroachDB is the durable memory layer because promises need transactional ownership changes and an ordered decision record, not a loose transcript. Customer-plus-project scope limits what the agent may retrieve. AWS Lambda keeps the public API surface small and reviewable.

## Proof links

- Repository: https://github.com/Peanuts1605/promise-ledger
- Public verification workflow: https://github.com/Peanuts1605/promise-ledger/actions/runs/29742789794
- Architecture: https://github.com/Peanuts1605/promise-ledger/blob/main/docs/ARCHITECTURE.md

## Evidence required before submission

- [ ] Live CockroachDB Cloud cluster on AWS, created with `ccloud`.
- [ ] `server/schema.sql` applied to the cluster.
- [ ] Public-safe fixture replayed against the live cluster.
- [ ] Read-only CockroachDB Managed MCP inspection captured.
- [ ] AWS Lambda `/health`, record read, decision read, and owner assignment verified.
- [ ] Public sub-three-minute demo video captures the working integration.
- [ ] Devpost fields, terms, and eligibility complete.

Until those boxes are checked, this draft deliberately makes no live cloud claim.
