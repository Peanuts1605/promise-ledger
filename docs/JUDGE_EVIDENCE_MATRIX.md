# Promise Ledger Judge Evidence Matrix

| Rubric question | Evidence | Current status |
| --- | --- | --- |
| Is this agentic memory, not generic chat history? | Owner-first decision policy and scoped retrieval design | Local proof passed |
| Does the agent make a safe, useful decision? | `ASSIGN_OWNER`, `HOLD_FOR_CONTEXT`, `PREPARE_REVIEW_DRAFT`, `REVIEW_DRAFT` | Local proof passed |
| Is the memory durable and auditable? | Live CockroachDB Cloud `promise_records`, `promise_events`, and `promise_memories` fixture with ordered decisions and scoped retrieval | Live proof passed |
| Can a judge see the actual user consequence? | Owner-required screen, event timeline, review-only draft, owner reassignment | Browser proof passed on desktop and 390px mobile |
| Can a judge use the product without local setup? | Public-safe GitHub Pages demo at https://peanuts1605.github.io/promise-ledger/ | Live deployment passed |
| Is the implementation reproducible? | Public repo plus GitHub Actions workflow | Public workflow passed |
| Are CockroachDB contest integrations real? | `ccloud` authenticated cluster inspection plus read-only Managed MCP schema/table/query inspection | Live proof passed |
| Are at least two CockroachDB tools meaningfully identified? | Managed MCP inspects cluster-scoped durable state; `ccloud` inspects the live cluster and fixture replay | Live proof passed |
| Is the source public and open-source? | Public GitHub repository with detected MIT license, setup instructions, public-safe seed, and verification workflow | Live proof passed |
| Is the required AWS application service real? | AWS Lambda HTTP API | Pending AWS account authentication and deployment |
| Is the demo safe to review publicly? | Invented fixture and guarded seed command | Local proof passed |

The final Devpost submission should be made only after the AWS application-service row is converted to live evidence. The CockroachDB evidence is ready to explain the product in under a minute.
