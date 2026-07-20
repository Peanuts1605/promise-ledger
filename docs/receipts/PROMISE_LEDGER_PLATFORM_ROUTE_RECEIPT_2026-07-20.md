# Promise Ledger Platform Route Receipt

Receipt ID: PL-20260720-PLATFORM-ROUTE
Date: 2026-07-20
Status: shared local route passed; cloud authentication in progress

## Artifact

- Decision note: `docs/COCKROACHDB_AWS_PLATFORM_ROUTE_2026-07-20.md`
- CockroachDB schema: `server/schema.sql`
- CockroachDB repository: `server/repository.mjs`
- AWS Lambda handler: `aws/lambda.mjs`
- AWS SAM template: `aws/template.yaml`

## Validation

- Official `ccloud` CLI installed: `ccloud 0.8.23`
- Unauthenticated state verified: `ccloud auth whoami` reports login is required.
- Browser-based `ccloud auth login` launched.
- `npm run lint`: passed
- `npm run build`: passed
- `npm test`: 5 passing tests
- `npm run db:verify-schema`: passed
- Lambda template contract: passed
- Local API missing-configuration response: passed with an explicit 503 status

## Decision

Use ccloud CLI and the CockroachDB Cloud Managed MCP Server as the two required CockroachDB tools, with AWS Lambda as the AWS service. Do not mark any of those integrations as live until each is verified against a real cluster and deployment.

## Shared proof

- Drive mirror: `TMN_NAUMIO_HQ/06_DELIVERY/PL-20260720-PLATFORM-ROUTE/`
- Notion pointer: https://app.notion.com/p/3a3b143d291781fea691fd299fb783d2
- Reconciled receipt: this receipt was patched after the Drive mirror and Notion pointer were verified; its reconciled copy is re-mirrored with the delivery bundle.

## Next smallest patch

Complete the active ccloud browser login, verify the Cloud identity, then create a no-spend AWS Basic cluster only if its cost settings are visibly zero.
