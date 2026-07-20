# Promise Ledger Judge Evidence Matrix

| Rubric question | Evidence | Current status |
| --- | --- | --- |
| Is this agentic memory, not generic chat history? | Owner-first decision policy and scoped retrieval design | Local proof passed |
| Does the agent make a safe, useful decision? | `ASSIGN_OWNER`, `HOLD_FOR_CONTEXT`, `PREPARE_REVIEW_DRAFT`, `REVIEW_DRAFT` | Local proof passed |
| Is the memory durable and auditable? | `promise_records`, `promise_events`, `promise_memories` schema and repository | Local contract passed |
| Can a judge see the actual user consequence? | Owner-required screen, event timeline, review-only draft, owner reassignment | Browser proof passed on desktop and 390px mobile |
| Is the implementation reproducible? | Public repo plus GitHub Actions workflow | Public workflow passed |
| Are contest integrations real? | `ccloud` cluster, Managed MCP read-only inspection, AWS Lambda HTTP API | Pending live proof |
| Is the demo safe to review publicly? | Invented fixture and guarded seed command | Local proof passed |

The public submission should be made only when the final row is converted from pending to live evidence. Everything else is already structured to explain the product in under a minute.
