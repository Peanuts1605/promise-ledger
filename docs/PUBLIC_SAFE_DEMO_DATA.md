# Promise Ledger Public-Safe Demo Data

`demo/public-safe-seed.json` contains invented organizations, commitments, owners, and context notes. It is safe for a public hackathon demo and deliberately contains no real client, customer, or personal data.

The fixture is designed to prove three choices a careful operations agent must make:

| Record | Expected recommendation | Why |
| --- | --- | --- |
| `PL-DEMO-001` | `ASSIGN_OWNER` | A relevant memory exists, but no accountable owner is named. |
| `PL-DEMO-002` | `HOLD_FOR_CONTEXT` | An owner is named, but the available memory belongs to a different project and is not retrieved. |
| `PL-DEMO-003` | `PREPARE_REVIEW_DRAFT` | An owner and customer-plus-project scoped memory are both present. |

To seed an authenticated CockroachDB Cloud demo cluster after the schema is applied:

```bash
ALLOW_PUBLIC_SAFE_SEED=true npm run db:seed-demo
```

The command requires `DATABASE_URL`, inserts only `PL-DEMO-*` records, and is safe to rerun because duplicate public fixture rows are ignored. It never sends a customer message; the positive outcome is still a review-only draft recommendation.
