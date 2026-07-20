# Persistent memory seam

This directory is the real persistence contract for Promise Ledger.

`schema.sql` creates the durable records:

- `promise_records`: the original commitment, accountable owner, deadline, and state;
- `promise_events`: an ordered append-only decision trail;
- `promise_memories`: retrieval context scoped to both customer and project.

The repository deliberately requires `DATABASE_URL`; it does not silently replace a missing CockroachDB connection with fake persistent storage.

`agent.mjs` is the operational decision policy: it asks for ownership first, holds when scoped context is absent, and only allows a reviewable draft when both an owner and matched memory exist.

## Local checks

```bash
npm run db:verify-schema
npm test
```

## Later live wiring

When a CockroachDB Cloud cluster is available, set `DATABASE_URL`, apply the schema through CockroachDB tooling, seed only public-safe demo data, and run:

```bash
npm run api
curl http://127.0.0.1:8787/health
```

The frontend currently remains an explicit local proof slice until that live connection is verified.
