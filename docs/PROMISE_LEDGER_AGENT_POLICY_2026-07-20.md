# Promise Ledger Agent Policy

Date: 2026-07-20

Promise Ledger is not allowed to turn an ambiguous customer commitment into a confident outbound message. Its next-move policy is intentionally small and inspectable:

| Condition | Decision | What the agent may do |
| --- | --- | --- |
| No accountable owner | `ASSIGN_OWNER` | Explain the ownership gap; do not draft. |
| Owner exists but scoped memory is absent | `HOLD_FOR_CONTEXT` | Explain what context is missing; do not draft. |
| Owner and matched customer-plus-project memory exist | `PREPARE_REVIEW_DRAFT` | Prepare a review-only draft; never send. |
| Review draft exists | `REVIEW_DRAFT` | Present it to the owner for a human decision. |

## Why this matters

The memory layer is not merely retrieval. It changes what the agent is permitted to do. An ownerless promise cannot become an unowned action, and a memory match must be specific enough to explain why it belongs in the decision.

## Current proof

- The policy is implemented in `server/agent.mjs`.
- The API and Lambda expose the policy at `GET /api/promises/{externalKey}/decision` once a live CockroachDB connection is configured.
- Eight local tests pass, including all three decision branches.
- The UI makes the active recommendation visible before the action buttons.

## Non-claim

This is a deterministic operational policy, not a claim that a foundation model or AWS Bedrock is already connected.
