# Promise Ledger Demo Run of Show

Target length: 115 to 130 seconds after the live AWS Lambda evidence exists.

## 0:00-0:14 - The promise at risk

Open on the default Promise Ledger screen. Say:

> A customer was promised a Patio Permit answer by Wednesday. The record exists, but nobody owns the next move. That is how a promise turns into a customer chasing an answer.

Point to `OWNER REQUIRED` and `Agent recommendation: ASSIGN OWNER`.

## 0:14-0:32 - Accountability becomes durable

Click `Assign Jordan Kim`. Show the owner record and the new immutable event.

> Promise Ledger does not turn a loose promise into an autonomous customer message. It names the accountable person first and preserves that decision in the record.

## 0:32-0:48 - Scoped memory, not broad recall

Point to `Context that belongs here` and `Unrelated notes excluded`.

> The agent only retrieves memory where the customer and project both match. For a different project, it holds instead of borrowing a plausible note.

## 0:48-1:06 - Review-only outcome

Click `Prepare follow-up`, then show the event and `READY FOR JORDAN TO REVIEW`.

> Once an owner and eligible context exist, the system can prepare a review draft. It still does not send anything. Jordan remains responsible for the customer-facing decision.

## 1:06-1:29 - Live CockroachDB proof

Show the authenticated CockroachDB Cloud cluster, the schema, and the public-safe `PL-DEMO-001` through `PL-DEMO-003` fixture outcomes. Show the successful `ccloud` cluster inspection and fixture verification result.

> CockroachDB stores the promise, its ordered decision trail, and memory scoped to customer plus project. The demo fixture proves the three valid outcomes: assign an owner, hold for missing context, or prepare a review-only draft.

## 1:29-1:45 - Managed MCP proof

Show the read-only CockroachDB Managed MCP table inspection and a public-safe query. Point out that its cluster-scoped configuration refuses a supplied `cluster_id`, preventing cross-cluster drift in the proof.

> The Managed MCP surface is read-only in this proof. It lets the agent inspect the same durable memory state without treating a chat recap as truth.

## 1:45-2:05 - AWS proof and close

Show the deployed Lambda HTTP API `/health`, one decision response, and the public repository action run. This segment is not recordable until the AWS deployment passes.

> AWS Lambda serves the small API path. The public repository has a verification gate, and every demo record is invented. Promise Ledger proves one simple idea: an agent can be helpful without quietly taking responsibility away from a person.

## Capture discipline

- Use the default `OWNER REQUIRED` state first; it is the clearest product tension.
- Keep the record key, source, owner, decision, scoped memory reason, and no-send state readable.
- Do not record real customer or account data.
- Do not claim the AWS application-service requirement before the deployed Lambda evidence is on screen.
