# Promise Ledger Proof Slice Receipt

Receipt ID: PL-20260720-PROOF-SLICE
Date: 2026-07-20
Status: fully shared proof passed
Task: Build and test the first judge-visible Promise Ledger product slice for the CockroachDB x AWS Hackathon candidate.

## Artifact

- App: `promise-ledger/`
- Product bet: `docs/PROMISE_LEDGER_PRODUCT_BET_2026-07-20.md`
- Screenshots:
  - `demo/screenshots/01-owner-required.png`
  - `demo/screenshots/02-owner-confirmed-review-draft.png`

## Proven interaction

1. The app opens with a public-safe Patio Permit promise and `OWNER REQUIRED`.
2. `Assign Jordan Kim` changes the state to `OWNER CONFIRMED`.
3. The assignment creates an event in the promise record.
4. `Prepare follow-up` creates a review-only draft using one matching customer memory.
5. The draft is explicitly marked `Not sent`.
6. `Set Tuesday reminder` creates a reminder event.
7. The UI states that unrelated notes and cross-customer matches are excluded.

## Validation

- `npm run lint`: passed
- `npm run build`: passed
- Browser interaction proof: passed
- Default desktop viewport has no document horizontal overflow: passed

## Current tool decision

Vite 8.1.5 is the current stable route used for the local proof. No experimental Vite feature was needed for this UX slice.

## Next smallest integration patch

Define the persistent Promise and PromiseEvent schema, then add a single public-safe local repository interface that the UI can consume before connecting the actual CockroachDB and AWS contest requirements.

## Shared proof

- Drive mirror: `TMN_NAUMIO_HQ/06_DELIVERY/PL-20260720-PROOF-SLICE/`
- Notion pointer: https://app.notion.com/p/3a3b143d291781519c89f3ab3122dc5e
- Reconciled receipt: this receipt was patched after the Drive mirror and Notion pointer were verified; its reconciled copy is re-mirrored with the delivery bundle.
