# Promise Ledger Contest Rules Coverage Receipt

- Receipt ID: PL-20260720-CONTEST-RULES-COVERAGE
- Date: 2026-07-20
- Owner: ORION_L
- Decision: `CONTINUE_TO_LIVE_AWS_REPLAY; NO_PRODUCT_PIVOT`
- Official rule source: https://cockroachdb-ai.devpost.com/rules

## Result

The official rules require a persistent CockroachDB memory layer deployed on AWS, at least two CockroachDB tools, one AWS service, a public open-source repository with license, a functional demo, and a public video under three minutes that visibly shows the product and CockroachDB memory at work.

Promise Ledger already has live CockroachDB Cloud proof, Managed MCP proof, `ccloud` CLI proof, public source with detected MIT license, and a public-safe live demo. The only functional requirement not yet live is the AWS Lambda + HTTP API deployment; the final video is deliberately gated on that replay.

## Artifact changes

- Updated `docs/DEVPOST_DRAFT.md` with exact CockroachDB tool roles and the unambiguous AWS boundary.
- Updated `docs/JUDGE_EVIDENCE_MATRIX.md` with rules-level evidence rows.
- Created `docs/CONTEST_RULES_COVERAGE_2026-07-20.md`.
- Updated the public repository description, homepage, and topics so the live demo, agentic-memory purpose, CockroachDB, AWS Lambda, and MCP are discoverable before a judge opens the code.

## Verification

- Official rules checked live on 2026-07-20.
- Public repository metadata reports `MIT License`.
- No application code, fixture, scope, or deployment template changed.

## Shared proof reconciliation

- Drive path: `TMN_NAUMIO_HQ/06_DELIVERY/PL-20260720-CONTEST-RULES-COVERAGE/`
- Notion pointer: https://app.notion.com/p/3a3b143d2917814a84c1d986c4c511b9
- Status: valid shared proof; AWS deployment and final video remain separate, incomplete contest requirements.
