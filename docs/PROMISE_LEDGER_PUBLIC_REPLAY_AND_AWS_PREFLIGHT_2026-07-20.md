# Promise Ledger Public Replay and AWS Preflight

Date: 2026-07-20

## Decision

`PUBLIC_FLOW_REPLAYED; AWS_DEPLOYMENT_READY_PENDING_ACCOUNT_LOGIN`

## Public replay

The public demo at `https://peanuts1605.github.io/promise-ledger/` was replayed
from the ownerless-promise state through the intended operator path:

1. The initial customer commitment displayed `OWNER REQUIRED` and did not offer
   a customer-facing follow-up as ready work.
2. Assigning Jordan Kim moved the visible decision to `OWNER CONFIRMED`, added
   an immutable owner-assigned event, and made the next steps available.
3. Preparing the follow-up moved the recommendation to `REVIEW DRAFT` and
   displayed a scoped draft for Jordan's review.
4. The UI explicitly confirmed: `Nothing was sent.`

The public demo remains public-safe and is a browser-resident prototype. The
authoritative persistent proof continues to be the existing CockroachDB fixture
and its Managed MCP read-only inspection.

## AWS preflight

The deployment template creates only the intended delivery slice:

- one Node.js 22 ARM64 Lambda function (`PromiseLedgerApi`), 256 MB, 10-second
  timeout;
- one HTTP API with public read-only `GET` routes for health, promise read, and
  decision read;
- the AWS-generated execution role required by SAM.

There are no public mutation routes. `POST` owner reassignment returns `405`;
the Lambda restricts CORS methods to `GET, OPTIONS`, gives each response a
request ID, and avoids customer content in structured request logging.

## Verification

| Gate | Result |
| --- | --- |
| `npm test` | PASS, 11 tests |
| `npm run lint` | PASS |
| `npm run build` | PASS |
| `sam validate --lint --template-file aws/template.yaml` | PASS |
| `sam build --template-file aws/template.yaml --build-dir /tmp/promise-ledger-aws-build-20260720` | PASS |
| Public GitHub Pages HTTP check | PASS, HTTP 200 |
| Live AWS endpoint replay | Not yet run |

## Exact next move

Sign in to the already-open AWS account page, then run the existing
secret-safe deploy/replay command. It injects `DATABASE_URL` only into the
deployment process, deploys the SAM stack, discovers the HTTP API output, and
verifies health, one public-safe record, and one decision endpoint. The
deployment itself is deliberately not claimed until that endpoint replay
passes.
