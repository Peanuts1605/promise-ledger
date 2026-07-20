# Promise Ledger Live CockroachDB and Managed MCP Proof Receipt

Receipt ID: PL-20260720-LIVE-COCKROACH-MCP-PROOF
Date: 2026-07-20
Status: live CockroachDB and Managed MCP proof passed; AWS application-service deployment pending

Agent ID: ORION_L
Lane: Contest portfolio / CockroachDB x AWS Hackathon
Task: Replay Promise Ledger's public-safe persistent-memory fixture on CockroachDB Cloud, verify it with `ccloud`, and inspect the same state through the official Managed MCP Server in read-only mode.
Files read: `README.md`, `server/schema.sql`, `server/verify-live-fixture.mjs`, `docs/ARCHITECTURE.md`, `docs/JUDGE_EVIDENCE_MATRIX.md`, `docs/DEVPOST_DRAFT.md`, `docs/DEMO_RUN_OF_SHOW.md`, `docs/COCKROACHDB_AWS_PLATFORM_ROUTE_2026-07-20.md`
Proof path: `promise-ledger/docs/receipts/PROMISE_LEDGER_LIVE_COCKROACH_MCP_PROOF_RECEIPT_2026-07-20.md`
Needs Fulcro QA: yes, after the AWS Lambda/API deployment is captured

## Product decision

Promise Ledger now has a real persistent-memory proof, not a CockroachDB-shaped local mock. The final contest submission remains pending because the required AWS application-service route is not yet deployed. The product should not add features before that proof path exists.

## Live CockroachDB proof

- CockroachDB Cloud Basic cluster: `promise-ledger-live`, hosted on AWS `us-east-1`.
- `ccloud 0.8.23` authenticated and inspected the live cluster.
- `ALLOW_SCHEMA_APPLY=true npm run db:apply-schema`: passed.
- `ALLOW_PUBLIC_SAFE_SEED=true npm run db:seed-demo`: passed; seeded three invented promises, five ordered events, and three scoped-memory rows.
- `npm run db:verify-live-demo`: passed.

The live verifier returned the intended public-safe policy outcomes:

| Fixture | Expected decision | Live result |
| --- | --- | --- |
| `PL-DEMO-001` | `ASSIGN_OWNER` | one event, one matching memory |
| `PL-DEMO-002` | `HOLD_FOR_CONTEXT` | two events, zero matching memories |
| `PL-DEMO-003` | `PREPARE_REVIEW_DRAFT` | two events, one matching memory |

## Managed MCP proof

- CockroachDB Cloud Managed MCP Server authenticated successfully with read access only.
- The cluster-scoped configuration rejected a supplied `cluster_id` argument, confirming that the proof cannot silently switch clusters.
- A read-only table inspection returned `promise_records` (3 rows), `promise_events` (5 rows), and `promise_memories` (3 rows).
- A read-only query returned the three public-safe fixture keys. No Managed MCP write tool was invoked.

## Current-tool radar

- CockroachDB Cloud and `ccloud`: live cluster/session smoke test passed using `ccloud 0.8.23`.
- Managed MCP: current official Cloud MCP route was used instead of a custom proxy; direct JSON-RPC initialization, cluster-scoped rejection, table inspection, and read-only query passed.
- Cursor agent: project MCP configuration and server readiness were verified. Cursor's separate agent-login state was not required for the direct Managed MCP proof.
- Decision: use the managed read-only MCP surface for the judge evidence; do not add an unnecessary custom MCP server.

Official references:

- https://www.cockroachlabs.com/docs/cockroachcloud/connect-to-the-cockroachdb-cloud-mcp-server
- https://www.cockroachlabs.com/docs/cockroachcloud/ccloud-get-started

## Remaining concrete proof

AWS Console has no authenticated account or local deployment profile on this machine. The next smallest patch is to authenticate an AWS account with Lambda, API Gateway, and CloudFormation/SAM deployment access; then deploy `aws/template.yaml`, verify `/health` plus one public-safe API transaction, and add that proof to the demo video.

## Transfer rule

Claim each contest requirement at its own evidence level. A live database and read-only MCP pass can strengthen the product without satisfying the AWS application-service rubric; target the unproven rubric row next instead of adding features around it.

## Validation

- `npm test`: passed, 10 tests
- `npm run lint`: passed
- `npm run build`: passed
- Live schema apply, seed, and fixture verifier: passed
- Managed MCP direct read-only inspection: passed

## Shared proof

- Drive mirror: `TMN_NAUMIO_HQ/06_DELIVERY/PL-20260720-LIVE-COCKROACH-MCP-PROOF/` (SHA-256 mirror verified, 8 files)
- Notion pointer: https://app.notion.com/p/3a3b143d291781659f85e97172441da0
- Reconciled receipt: this receipt was patched after the Drive mirror and Notion pointer were verified; its reconciled copy is re-mirrored with the delivery bundle.
