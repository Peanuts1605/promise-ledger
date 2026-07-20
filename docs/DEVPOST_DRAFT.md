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
- live CockroachDB Cloud tables for commitment records, immutable events, and scoped memory;
- a Node repository layer that refuses to fake persistence when `DATABASE_URL` is absent;
- a deterministic policy shared by the local API and deployment-ready AWS Lambda handler;
- a guarded public-safe demo seed covering all three meaningful decisions;
- a GitHub Actions gate that runs lint, production build, policy tests, schema verification, and seed verification on every push.

The CockroachDB tools are deliberate, not decorative:

- **CockroachDB Cloud Managed MCP Server:** the agent uses the cluster-scoped, read-only connection to inspect the durable promise tables and public-safe fixture without treating chat history as truth. The proof rejects an attempted extra `cluster_id`, keeping the inspection scoped to the intended cluster.
- **`ccloud` CLI:** the agent uses CockroachDB's agent-ready CLI to inspect the live cluster and verify the public-safe fixture replay against the same persistent memory layer.

AWS Lambda plus HTTP API are ready in the repository and remain the final deployment proof before submission. Lambda will serve the small record-and-decision API path; it is not claimed as live until the deployed endpoint is replayed against the public-safe fixture.

## Why CockroachDB and AWS

CockroachDB is the durable memory layer because promises need transactional ownership changes and an ordered decision record, not a loose transcript. Customer-plus-project scope limits what the agent may retrieve. CockroachDB Managed MCP gives the agent a controlled way to inspect that durable source of truth, while `ccloud` verifies the real cluster behind the fixture. AWS Lambda keeps the public API surface small and reviewable.

## Proof links

- Repository: https://github.com/Peanuts1605/promise-ledger
- Live demo: https://peanuts1605.github.io/promise-ledger/
- Public demo deployment: https://github.com/Peanuts1605/promise-ledger/actions/runs/29748354143
- Public verification workflow: https://github.com/Peanuts1605/promise-ledger/actions/runs/29742789794
- Architecture: https://github.com/Peanuts1605/promise-ledger/blob/main/docs/ARCHITECTURE.md
- Live CockroachDB and MCP receipt: https://github.com/Peanuts1605/promise-ledger/blob/main/docs/receipts/PROMISE_LEDGER_LIVE_COCKROACH_MCP_PROOF_RECEIPT_2026-07-20.md

## Evidence required before submission

- [x] Live CockroachDB Cloud Basic cluster on AWS inspected with `ccloud`.
- [x] `server/schema.sql` applied to the cluster.
- [x] Public-safe fixture replayed against the live cluster.
- [x] Read-only CockroachDB Managed MCP inspection captured.
- [x] Two required CockroachDB tools are identified with their proof roles: Managed MCP Server and `ccloud` CLI.
- [x] MIT license is detected in the public repository.
- [ ] AWS Lambda `/health`, record read, decision read, and owner assignment verified.
- [ ] Public sub-three-minute demo video captures the working integration.
- [ ] Devpost fields, terms, and eligibility complete.

Until the AWS Lambda, video, and Devpost boxes are checked, this draft deliberately does not claim a complete contest submission.
