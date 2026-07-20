# Promise Ledger Final Demo Capture Packet

## Purpose

Capture one 2:05 final judging video that gives a reviewer the product consequence before the architecture proof. Every record in the recording is the included public-safe fixture.

## Recording order

| Time | Screen action | What must be visible | Voiceover |
| --- | --- | --- | --- |
| 0:00-0:14 | Open the default record | `OWNER REQUIRED`, source promise, and `Assign Jordan Kim` | "A customer was promised a Patio Permit answer by Wednesday. The record exists, but nobody owns the next move. That is how a promise turns into a customer chasing an answer." |
| 0:14-0:32 | Assign Jordan Kim | Owner card and new immutable event | "Promise Ledger makes responsibility explicit before an agent prepares anything. Jordan owns the next customer-facing decision, and the assignment is preserved in the record." |
| 0:32-0:48 | Pause on scoped memory | Matching customer-and-project note and `Unrelated notes excluded` | "The agent only uses memory that matches both this customer and this project. For a different project, it holds instead of borrowing a plausible note." |
| 0:48-1:06 | Prepare follow-up and open review | `READY FOR JORDAN TO REVIEW`, draft, and `This draft is not sent` | "With an owner and eligible context, the system prepares a draft for review. It does not send a customer message by itself." |
| 1:06-1:29 | Show CockroachDB Cloud proof | Cluster, proof tables, and `PL-DEMO-001` through `PL-DEMO-003` result | "CockroachDB keeps the promise, its ordered decisions, and scoped memory durable. The public-safe fixture proves the three meaningful outcomes: assign an owner, hold for missing context, or prepare a review-only draft." |
| 1:29-1:45 | Show managed MCP proof | Read-only table inspection plus one public-safe result | "The managed MCP proof is read-only. It lets an agent inspect the same durable record without treating chat history as the source of truth." |
| 1:45-2:05 | Show deployed AWS `/health`, decision response, then public GitHub workflow | Real endpoint response, no credentials, verified action | "AWS Lambda serves the small API surface, and GitHub verifies the code on every push. Promise Ledger keeps one thing clear: an agent can be helpful without quietly taking responsibility away from a person." |

## Shot discipline

- Record desktop browser at 1440px or wider with browser chrome hidden where possible.
- Zoom only when a required label would otherwise be unreadable; do not use decorative motion, transitions, or generic B-roll.
- Keep `OWNER REQUIRED`, `Unrelated notes excluded`, `READY FOR JORDAN TO REVIEW`, and `This draft is not sent` in frame long enough to read.
- The default screen must open the video. The review modal is the final product-state visual before the infrastructure proof.
- Use the repository and workflow only as proof inserts. The product screen remains the center of the video.

## Verified visual references

1. `demo/screenshots/01-owner-required.png` - opening tension: a promise without an accountable owner.
2. `demo/screenshots/02-owner-confirmed-review-draft.png` - resolved ownership and review-only outcome.
3. `demo/screenshots/03-agent-policy-owner-required.png` - explicit agent recommendation before any draft exists.
4. `demo/screenshots/04-review-draft-dialog.png` - no-send review boundary.
5. `demo/screenshots/05-mobile-review-draft.png` - narrow-screen confirmation; do not use in the main recording unless a mobile-specific judging requirement appears.

## AWS insert gate

Do not record the final 20 seconds until all four are captured from the deployed service:

1. `/health` returns a healthy response.
2. One public-safe record read succeeds.
3. One public-safe decision response succeeds.
4. The deploy is traceable to the public repository workflow.

Until then, the product walkthrough and CockroachDB/MCP footage are ready, but the recording is not the final contest video.
