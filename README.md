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

The current build uses public-safe fixture data. It does **not** yet claim a live CockroachDB or AWS integration.

## Persistent-memory contract

The next layer is already defined in [`server/README.md`](server/README.md): a CockroachDB-ready schema for the commitment record, its ordered decision trail, and customer-plus-project-scoped memory. The server refuses to pretend persistence exists when `DATABASE_URL` is not configured.

[`aws/`](aws/) contains a deployment-ready AWS Lambda and HTTP API template. It is intentionally unclaimed until the function, a CockroachDB Cloud cluster, and the configured `DATABASE_URL` are verified together.

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
```
