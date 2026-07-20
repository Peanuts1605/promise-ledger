# Promise Ledger AWS Deploy Replay Receipt

- Receipt ID: PL-20260720-AWS-DEPLOY-REPLAY
- Date: 2026-07-20
- Owner: ORION_L
- Decision: `DEPLOY_ON_AUTHENTICATED_AWS_SESSION`
- Artifact: `scripts/deploy-aws.sh` and `scripts/verify-aws-deployment.mjs`

## What changed

- Added one deploy command that requires an authenticated AWS CLI session and a `DATABASE_URL` supplied through the environment.
- The script deploys the existing SAM Lambda + HTTP API template, discovers the stack output, then checks the deployed CockroachDB health, a public-safe record read, and a public-safe decision read.
- Updated the AWS README to distinguish the verified live CockroachDB fixture from the still-pending AWS deployment.

## Secret handling

- The database URL is required only as a process environment variable.
- The scripts never write the value to disk or print it to output.
- No deployment was attempted because AWS CLI identity is still unavailable.

## Verification

- `bash -n scripts/deploy-aws.sh` passed.
- `npm run aws:verify` fails closed without an HTTPS endpoint rather than attempting a request.
- Existing `npm test` and `npm run lint` remain the product gate.

## Shared proof reconciliation

- Drive path: `TMN_NAUMIO_HQ/06_DELIVERY/PL-20260720-AWS-DEPLOY-REPLAY/`
- Notion pointer: https://app.notion.com/p/3a3b143d29178107a2d1d251bc2769a9
- Status: valid shared deployment-preparation proof; live AWS deployment is still pending AWS authentication.
