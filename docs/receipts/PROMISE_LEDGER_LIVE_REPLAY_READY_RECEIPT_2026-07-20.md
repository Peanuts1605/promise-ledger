# Promise Ledger Live Replay Readiness Receipt

Receipt ID: PL-20260720-LIVE-REPLAY-READY
Date: 2026-07-20
Status: local readiness passed; shared-proof reconciliation pending

## Artifact

- Guarded schema apply command: `server/apply-schema.mjs`
- Guarded public-safe seed command: `server/seed-demo.mjs`
- Live database verifier: `server/verify-live-fixture.mjs`
- Operator instructions: `server/README.md`

## Ready sequence

Once an authenticated CockroachDB Cloud connection URL exists only in the deployment environment:

```bash
ALLOW_SCHEMA_APPLY=true npm run db:apply-schema
ALLOW_PUBLIC_SAFE_SEED=true npm run db:seed-demo
npm run db:verify-live-demo
```

The verifier requires all three `PL-DEMO-*` records to be present, checks their ordered events and customer-plus-project scoped memory, and confirms the expected decisions: `ASSIGN_OWNER`, `HOLD_FOR_CONTEXT`, and `PREPARE_REVIEW_DRAFT`.

## Guard behavior

- Schema apply refuses to run when `DATABASE_URL` is absent or `ALLOW_SCHEMA_APPLY` is not explicitly `true`.
- Demo seed refuses to run when `DATABASE_URL` is absent or `ALLOW_PUBLIC_SAFE_SEED` is not explicitly `true`.
- Live verifier refuses to run without `DATABASE_URL` and rejects non-`PL-DEMO-*` fixture keys.

## Validation

- `npm run lint`: passed
- `npm run build`: passed
- `npm test`: 10 passing tests
- `npm run db:verify-schema`: passed
- `npm run db:verify-demo-seed`: passed
- Node syntax checks: `server/apply-schema.mjs` and `server/verify-live-fixture.mjs` passed
- Missing-database guard checks: passed as intentional `DATABASE_URL_REQUIRED` failures

## Boundary kept honest

No live CockroachDB schema, fixture replay, Managed MCP inspection, or AWS Lambda endpoint is claimed by this receipt. The commands are prepared for the exact next proof and will become a live claim only after their output is captured from the authenticated public-safe cluster.

## Shared proof

- Drive mirror: `TMN_NAUMIO_HQ/06_DELIVERY/PL-20260720-LIVE-REPLAY-READY/`
- Notion pointer: https://app.notion.com/p/3a3b143d2917816e82f1d1aa9c012552
- Reconciled receipt: this receipt was patched after the Drive mirror and Notion pointer were verified; its reconciled copy is re-mirrored with the delivery bundle.

## Next smallest patch

Complete the open CockroachDB account creation terms step and verify `ccloud auth whoami`, then create only a visibly zero-spend AWS Basic cluster.
