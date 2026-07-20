# Promise Ledger Demo Run of Show

Target length: 100 to 130 seconds after live CockroachDB and Lambda evidence exists.

## 0:00-0:12 - The risk

Open on the default Promise Ledger screen. Say:

> A customer was promised a Patio Permit answer by Wednesday. The record exists, but no one owns it. That is how service teams lose trust.

Point to `OWNER REQUIRED` and `Agent recommendation: ASSIGN OWNER`.

## 0:12-0:30 - Accountability becomes durable

Click `Assign Jordan Kim`. Show the owner record and the new immutable event.

> Promise Ledger does not turn a loose promise into an autonomous customer message. It names the accountable person first and preserves that decision in the record.

## 0:30-0:48 - Scoped memory, not broad recall

Point to `Context that belongs here` and `Unrelated notes excluded`.

> The agent only retrieves memory where the customer and project both match. For a different project, it holds instead of borrowing a plausible note.

## 0:48-1:08 - Review-only outcome

Click `Prepare follow-up`, then show the event and `READY FOR JORDAN TO REVIEW`.

> Once an owner and eligible context exist, the system can prepare a review draft. It still does not send anything. Jordan remains responsible for the customer-facing decision.

## 1:08-1:35 - Live CockroachDB proof

Show the authenticated CockroachDB Cloud cluster, the schema, and the public-safe `PL-DEMO-001` through `PL-DEMO-003` fixture outcomes. Show the `ccloud` command/result only after it is live.

> CockroachDB stores the promise, its ordered decision trail, and memory scoped to customer plus project. The demo fixture proves the three valid outcomes: assign an owner, hold for missing context, or prepare a review-only draft.

## 1:35-1:52 - Managed MCP proof

Show a read-only CockroachDB Managed MCP health/schema or audit inspection only after it is live.

> The Managed MCP surface is read-only in this proof. It lets the agent inspect the same durable memory state without treating a chat recap as truth.

## 1:52-2:08 - AWS proof and close

Show the deployed Lambda HTTP API `/health`, one decision response, and the public repository action run.

> AWS Lambda serves the small API path. The public repository has a verification gate, and every demo record is invented. Promise Ledger proves one simple idea: agent memory is useful when it can keep a promise.

## Capture discipline

- Use the default `OWNER REQUIRED` state first; it is the clearest product tension.
- Keep the record key, source, owner, decision, scoped memory reason, and no-send state readable.
- Do not record real customer or account data.
- Do not claim cloud, MCP, or Lambda before their live evidence is on screen.
