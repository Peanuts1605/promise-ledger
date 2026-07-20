# Promise Ledger Public Verification Receipt

Receipt ID: PL-20260720-PUBLIC-VERIFICATION
Date: 2026-07-20
Status: local proof passed; shared-proof reconciliation pending

## Artifact

- Public workflow: `.github/workflows/verify.yml`
- Public repository: https://github.com/Peanuts1605/promise-ledger
- First passing run: https://github.com/Peanuts1605/promise-ledger/actions/runs/29742383654
- Commit: `bfde678f8dd6f9f0d8c7b10fefcb517e608a0e0c`

## What the public gate proves

On every push and pull request to `main`, GitHub Actions runs:

1. `npm ci`
2. `npm run lint`
3. `npm run build`
4. `npm test`
5. `npm run db:verify-schema`

The first public run passed. The contract tests include the decision rule that requires an accountable owner and scoped customer-plus-project memory before a review-only follow-up can be prepared.

## Boundary kept honest

The workflow proves source, UI build, schema shape, and deterministic agent policy. It does not claim a live CockroachDB Cloud cluster, Managed MCP configuration, or AWS deployment. Those require authenticated cloud provisioning and a public-safe live integration fixture.

## Local validation

- `npm run lint`: passed
- `npm run build`: passed
- `npm test`: 8 passing tests
- `npm run db:verify-schema`: passed

## Shared proof

- Drive mirror: `TMN_NAUMIO_HQ/06_DELIVERY/PL-20260720-PUBLIC-VERIFICATION/`
- Notion pointer: https://app.notion.com/p/3a3b143d2917818eb668fb763e279810
- Reconciled receipt: this receipt was patched after the Drive mirror and Notion pointer were verified; its reconciled copy is re-mirrored with the delivery bundle.

## Next smallest patch

Create a public-safe CockroachDB seed fixture and an architecture proof that makes the live persistence boundary reviewable before cloud credentials are connected.
