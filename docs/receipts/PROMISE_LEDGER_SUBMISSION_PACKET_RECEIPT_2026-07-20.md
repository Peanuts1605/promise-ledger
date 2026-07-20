# Promise Ledger Submission Packet Receipt

Receipt ID: PL-20260720-SUBMISSION-PACKET
Date: 2026-07-20
Status: local proof passed; shared-proof reconciliation pending

## Artifact

- Devpost copy draft: `docs/DEVPOST_DRAFT.md`
- Demo run of show: `docs/DEMO_RUN_OF_SHOW.md`
- Judge evidence matrix: `docs/JUDGE_EVIDENCE_MATRIX.md`
- Public repository: https://github.com/Peanuts1605/promise-ledger

## Decision

The product story opens on the operational risk a judge can understand instantly: a customer promise exists, but no accountable owner is attached. It then shows the small policy boundary that differentiates Promise Ledger from a generic memory bot: owner first, scoped context second, review-only draft last.

The packet separates already-verified local proof from remaining live contest integrations. It does not claim CockroachDB Cloud, Managed MCP, or AWS Lambda are deployed until their evidence exists.

## Validation

- `npm run lint`: passed
- `npm run build`: passed
- `npm test`: 10 passing tests
- `npm run db:verify-schema`: passed
- `npm run db:verify-demo-seed`: passed
- Public GitHub Actions workflow: passed on the current workflow-runtime commit at https://github.com/Peanuts1605/promise-ledger/actions/runs/29743420386

## Shared proof

- Drive mirror: `TMN_NAUMIO_HQ/06_DELIVERY/PL-20260720-SUBMISSION-PACKET/`
- Notion pointer: https://app.notion.com/p/3a3b143d2917817fb057c1e771876da9
- Reconciled receipt: this receipt was patched after the Drive mirror and Notion pointer were verified; its reconciled copy is re-mirrored with the delivery bundle.

## Next smallest patch

Complete the CockroachDB account terms acknowledgement, then use the prepared packet to capture a proof-first live integration video rather than a generic product tour.
