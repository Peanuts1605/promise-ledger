# AWS Lambda delivery surface

Promise Ledger's intended AWS service is **AWS Lambda** behind an HTTP API. The Lambda handler has the same storage behavior as the local API: it needs `DATABASE_URL` and returns a visible configuration status rather than using a hidden fallback.

`template.yaml` uses a currently supported `nodejs22.x` Lambda runtime and an ARM64 function shape. The CockroachDB Cloud public-safe fixture is already live and verified. AWS CLI/SAM validation is also complete; deployment into an authenticated AWS account remains the final live-service gate.

## Pre-deploy verification

```bash
npm test
npm run build
sam validate --template aws/template.yaml
```

## Deployment after AWS authentication

Supply the already verified CockroachDB connection string through an approved
secret-injection environment, then run:

```bash
npm run aws:deploy
```

The command refuses to run without both an authenticated AWS CLI session and
`DATABASE_URL`. It deploys the SAM stack, discovers the API output, and verifies
three public-safe facts without printing the database URL:

1. `/health` confirms CockroachDB persistence.
2. `PL-DEMO-001` can be read with its immutable event trail.
3. `PL-DEMO-003` returns `PREPARE_REVIEW_DRAFT` from the deployed decision route.

Record the endpoint and verification output before claiming the AWS integration
is live.
