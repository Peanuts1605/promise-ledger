# Promise Ledger Agent Policy Receipt

Receipt ID: PL-20260720-AGENT-POLICY
Date: 2026-07-20
Status: fully shared local proof passed

## Artifact

- Policy: `docs/PROMISE_LEDGER_AGENT_POLICY_2026-07-20.md`
- Implementation: `server/agent.mjs`
- Local API and Lambda decision routes
- Screenshot: `demo/screenshots/03-agent-policy-owner-required.png`

## Proven behavior

- Missing owner -> `ASSIGN_OWNER`, no draft.
- Missing customer-plus-project context -> `HOLD_FOR_CONTEXT`, no draft.
- Owner plus matched context -> `PREPARE_REVIEW_DRAFT`.
- A prepared draft -> `REVIEW_DRAFT`, never auto-send.

## Validation

- `npm run lint`: passed
- `npm run build`: passed
- `npm test`: 8 passing tests
- Browser render: the first viewport visibly shows `Agent recommendation: ASSIGN OWNER` and has no horizontal overflow.

## Subsequent regression coverage

The original policy proof ran with 8 tests. The current repository has 10
passing tests after adding decision-route separation and public-safe seed
coverage; this strengthens the same policy without changing its decision rules.

## Shared proof

- Drive mirror: `TMN_NAUMIO_HQ/06_DELIVERY/PL-20260720-AGENT-POLICY/`
- Notion pointer: https://app.notion.com/p/3a3b143d29178141a26ff2a0fd86d643
- Reconciled receipt: this receipt was patched after the Drive mirror and Notion pointer were verified; its reconciled copy is re-mirrored with the delivery bundle.

## Next smallest patch

Run the same policy against an actual CockroachDB-backed fixture after the active ccloud authentication flow succeeds.
