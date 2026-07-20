# Promise Ledger Architecture

Promise Ledger treats a promise as an accountable record, not a chat summary. The interface is a public-safe proof surface; the persistence layer is designed to preserve the decision trail behind it.

```mermaid
flowchart LR
  UI["React proof interface\npublic-safe fixture"] --> API["AWS Lambda + HTTP API\nplanned deployment"]
  API --> Policy["Decision policy\nowner + scoped memory"]
  Policy --> Store["CockroachDB Cloud\nplanned persistent store"]
  Store --> Records["promise_records\ncommitment + owner + state"]
  Store --> Events["promise_events\nordered decision trail"]
  Store --> Memory["promise_memories\ncustomer + project scope"]
  MCP["CockroachDB Managed MCP\nread-only planned inspection"] -. health/schema audit .-> Store
  CLI["ccloud CLI\nplanned provision + inspection"] -. cluster operations .-> Store
```

## Decision boundary

| Inputs | Decision | What happens |
| --- | --- | --- |
| No accountable owner | `ASSIGN_OWNER` | The record cannot advance. |
| Owner, but no matching customer-plus-project memory | `HOLD_FOR_CONTEXT` | The agent waits rather than inventing a customer follow-up. |
| Owner and matching scope | `PREPARE_REVIEW_DRAFT` | A review-only draft may be prepared. It is never sent automatically. |

The planned cloud deployment is intentionally labeled as planned until a public-safe CockroachDB Cloud cluster, schema replay, read-only MCP inspection, Lambda endpoint, and evidence run are verified together.
