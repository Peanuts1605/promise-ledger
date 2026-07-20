# Promise Ledger

Promise Ledger is a public-safe product proof for a simple operations idea: useful memory is not keeping every conversation. It is keeping the promises people made until someone visibly owns the next move.

Licensed under [MIT](LICENSE).

## The proof slice

1. A customer commitment is captured with its source.
2. An unassigned promise appears as an operating risk.
3. A user names the accountable owner.
4. The owner decision becomes an event in the record.
5. Only matching customer context can prepare a reviewable follow-up.
6. Nothing is automatically sent.

The agent policy is intentionally legible: `ASSIGN_OWNER`, `HOLD_FOR_CONTEXT`, or `PREPARE_REVIEW_DRAFT`. It avoids the common failure mode where an agent turns a vague commitment into a confident customer message without a named owner or grounded context.

The current build uses public-safe fixture data on a live CockroachDB Cloud Basic cluster hosted on AWS. The schema has been applied, the three-record fixture has been replayed, and the persistent decision trail and scoped-memory outcomes have been verified. The official `ccloud` CLI has verified the cluster, and the CockroachDB Cloud Managed MCP Server has performed a read-only inspection of the same fixture.

AWS Lambda and HTTP API are deployment-ready in this repository but are not deployed yet. Promise Ledger therefore does not claim final contest completion or a live AWS application-service integration until that endpoint is verified.

The intended record flow and the exact boundary between verified local proof and planned cloud integration are shown in [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## Persistent-memory proof

[`server/README.md`](server/README.md) defines the CockroachDB schema for the commitment record, its ordered decision trail, and customer-plus-project-scoped memory. The server refuses to pretend persistence exists when `DATABASE_URL` is not configured; the live public-safe fixture proves those tables and policy outcomes against CockroachDB Cloud.

[`aws/`](aws/) contains the deployment-ready AWS Lambda and HTTP API template. It remains intentionally unclaimed until the function and its configured database connection are verified together.

## Local development

```bash
npm install
npm run dev
```

Run the quality gates:

```bash
npm run lint
npm run build
npm test
npm run db:verify-schema
npm run db:verify-demo-seed
```

With an explicitly supplied CockroachDB Cloud connection, the public-safe fixture can be loaded and verified with:

```bash
ALLOW_SCHEMA_APPLY=true npm run db:apply-schema
ALLOW_PUBLIC_SAFE_SEED=true npm run db:seed-demo
npm run db:verify-live-demo
```

See [`docs/PUBLIC_SAFE_DEMO_DATA.md`](docs/PUBLIC_SAFE_DEMO_DATA.md) for the three demo cases and their expected decisions.
