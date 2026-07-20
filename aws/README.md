# AWS Lambda delivery surface

Promise Ledger's intended AWS service is **AWS Lambda** behind an HTTP API. The Lambda handler has the same storage behavior as the local API: it needs `DATABASE_URL` and returns a visible configuration status rather than using a hidden fallback.

`template.yaml` uses a currently supported `nodejs22.x` Lambda runtime and an ARM64 function shape. It is intentionally not deployed yet; no AWS account, credentials, or CockroachDB cluster has been configured for this proof.

## Pre-deploy verification

```bash
npm test
npm run build
sam validate --template aws/template.yaml
```

## Later deployment

1. Create a CockroachDB Cloud cluster through the authorized `ccloud` route.
2. Store its connection string only in the deployment environment.
3. Apply `server/schema.sql` with public-safe demo data.
4. Validate the Lambda health route and the promise owner route.
5. Record deployment URL and evidence before claiming the AWS integration is live.
