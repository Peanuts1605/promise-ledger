# Promise Ledger: CockroachDB and AWS Platform Route

Date: 2026-07-20
Status: live CockroachDB, ccloud, and read-only Managed MCP proof passed; AWS Lambda deployment pending

## Contest-fit implementation choice

Promise Ledger uses two CockroachDB-native tools and is prepared to use one AWS service in a way that advances the product rather than padding a submission:

1. **ccloud CLI** inspects the live CockroachDB Cloud cluster that stores Promise Ledger's commitment records, ordered events, and scoped memory.
2. **CockroachDB Cloud Managed MCP Server** is authenticated in read-only mode so the build agent can inspect the live schema and audit-friendly memory state without a custom proxy.
3. **AWS Lambda plus HTTP API** will host the public-safe demo API using the same `DATABASE_URL` contract as local development.

The local repository, SQL schema, Lambda handler, and SAM template keep the application boundary reviewable. CockroachDB persistence is live; the AWS application-service claim remains gated on a Lambda route and proof replay.

## Current capability proof

- `ccloud 0.8.23` authenticated successfully and verified the `promise-ledger-live` CockroachDB Cloud Basic cluster on AWS in `us-east-1`.
- `ALLOW_SCHEMA_APPLY=true npm run db:apply-schema` applied the production schema to that cluster.
- `ALLOW_PUBLIC_SAFE_SEED=true npm run db:seed-demo` created three invented promise records, five ordered events, and three scoped-memory rows.
- `npm run db:verify-live-demo` verified all three expected decisions against the live database: `ASSIGN_OWNER`, `HOLD_FOR_CONTEXT`, and `PREPARE_REVIEW_DRAFT`.
- The Managed MCP Server completed an authenticated read-only session. Its cluster-scoped configuration rejected an extra `cluster_id` argument, `list_tables` returned the three live proof tables, and a read-only query returned the three public-safe fixture keys. No write MCP tool was used.
- The local persistent-memory schema, repository, Lambda handler, and deployment template continue to pass local checks.

## Why this is a meaningful memory layer

- The commitment is a durable business object, not a chat recap.
- `promise_events` preserve sequence and accountability decisions.
- `promise_memories` can only be retrieved by both customer and project scope.
- The API refuses to substitute fake persistence when no database is configured.
- The Lambda API has a visible health route for configuration and availability failures.

## Live proof sequence

1. Completed: authenticate and inspect the CockroachDB Cloud Basic cluster with `ccloud`.
2. Completed: apply schema, seed public-safe fixture, and verify the three policy outcomes against the live database.
3. Completed: authenticate the cluster-scoped Managed MCP Server with read access only, then inspect its schema and public-safe rows.
4. Next: authenticate an AWS account with Lambda, API Gateway, and CloudFormation/SAM deployment access.
5. Deploy the Lambda template, prove `/health` and one API transaction, and record the deployed route without exposing the database connection.
6. Capture a public-safe video that shows the user journey, ccloud result, read-only MCP inspection, and the deployed AWS path.

## Explicit non-claims

- No AWS Lambda deployment exists yet.
- No service is allowed to send external customer communications.
