# Promise Ledger Persistent Fixture Receipt

Receipt ID: PL-20260720-PERSISTENT-FIXTURE
Date: 2026-07-20
Status: local proof passed; shared-proof reconciliation pending

## Artifact

- Public-safe seed: `demo/public-safe-seed.json`
- Guarded CockroachDB seed runner: `server/seed-demo.mjs`
- Route parser and decision-route regression fix: `server/routes.mjs`
- Architecture: `docs/ARCHITECTURE.md`
- Fixture description: `docs/PUBLIC_SAFE_DEMO_DATA.md`

## Proven behavior

- The API and Lambda now distinguish `GET /api/promises/{key}` from `GET /api/promises/{key}/decision`; the decision path cannot be swallowed by the generic record read.
- The public-safe fixture proves three operational outcomes: `ASSIGN_OWNER`, `HOLD_FOR_CONTEXT`, and `PREPARE_REVIEW_DRAFT`.
- The CockroachDB seed refuses to run without both `DATABASE_URL` and an explicit `ALLOW_PUBLIC_SAFE_SEED=true` acknowledgement.
- The fixture contains invented organizations, owners, commitments, and context only.

## Validation

- `npm run lint`: passed
- `npm run build`: passed
- `npm test`: 10 passing tests
- `npm run db:verify-schema`: passed
- `npm run db:verify-demo-seed`: passed
- Node syntax checks: `server/index.mjs`, `aws/lambda.mjs`, and `server/seed-demo.mjs` passed

## Boundary kept honest

No CockroachDB Cloud cluster, Managed MCP server, or AWS Lambda deployment is claimed by this receipt. The local seed and persistence contract are ready for a public-safe cloud proof once `ccloud auth login` completes and a zero-spend AWS cluster path is verified.

## Shared proof

- Drive mirror: pending
- Notion pointer: pending
- Reconciled receipt: pending

## Next smallest patch

Authenticate `ccloud`, provision only a visibly zero-spend AWS Basic cluster, apply the schema and seed, then capture a real scoped retrieval and owner-event transaction.
