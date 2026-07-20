# Promise Ledger: CockroachDB and AWS Platform Route

Date: 2026-07-20
Status: build route selected; cloud proof not yet claimed

## Contest-fit implementation choice

Promise Ledger will use two CockroachDB-native tools and one AWS service in a way that advances the product rather than padding a submission:

1. **ccloud CLI** provisions and inspects the CockroachDB Cloud cluster that stores Promise Ledger's commitment records, ordered events, and scoped memory.
2. **CockroachDB Cloud Managed MCP Server** is configured read-only first so the build agent can inspect schema, health, and audit-friendly memory state without a custom proxy.
3. **AWS Lambda plus HTTP API** hosts the public-safe demo API using the same `DATABASE_URL` contract as local development.

The current local repository, SQL schema, Lambda handler, and SAM template are intentionally separate from a live claim. They become a live integration only after a cluster, schema replay, Lambda route, and proof all pass together.

## Current capability proof

- `ccloud 0.8.23` is installed from the official CockroachDB Homebrew tap.
- `ccloud auth whoami` correctly reports that no Cloud session exists yet.
- `ccloud auth login` has opened the official browser flow.
- The local persistent-memory schema, repository, Lambda handler, and deployment template are built and passing local checks.

## Why this is a meaningful memory layer

- The commitment is a durable business object, not a chat recap.
- `promise_events` preserve sequence and accountability decisions.
- `promise_memories` can only be retrieved by both customer and project scope.
- The API refuses to substitute fake persistence when no database is configured.
- The Lambda API has a visible health route for configuration and availability failures.

## Live proof sequence

1. Complete `ccloud auth login` and verify with `ccloud auth whoami`.
2. Create a **no-spend** CockroachDB Basic cluster on AWS through `ccloud`.
3. Create the least-privileged demo SQL user and retain the connection string only in 1Password and deployment configuration.
4. Run `ALLOW_SCHEMA_APPLY=true npm run db:apply-schema` and `ALLOW_PUBLIC_SAFE_SEED=true npm run db:seed-demo` against the public-safe cluster.
5. Run `npm run db:verify-live-demo` to prove the cluster returns all three policy outcomes with ordered events and customer-plus-project scoped memory.
6. Add the managed CockroachDB MCP configuration from the Cloud Console in read-only mode and record the schema/health inspection.
7. Deploy the Lambda template only after the AWS account has an explicit no-spend path, then prove `/health` and one API transaction.
8. Record each claim with a screenshot, command receipt, and public-safe video evidence.

## Explicit non-claims

- No CockroachDB Cloud account or cluster has been verified yet.
- No managed MCP server is configured yet.
- No AWS Lambda deployment exists yet.
- No service is allowed to send external customer communications.
