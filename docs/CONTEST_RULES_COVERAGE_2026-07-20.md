# Promise Ledger Contest Rules Coverage

Official source: [CockroachDB x AWS Hackathon rules](https://cockroachdb-ai.devpost.com/rules), checked 2026-07-20.

## Submission fit

| Requirement | Promise Ledger evidence | State |
| --- | --- | --- |
| Agentic application with CockroachDB persistent memory deployed on AWS | Live CockroachDB Cloud fixture; AWS SAM Lambda + HTTP API template validated locally | AWS deployment pending |
| At least two CockroachDB tools | Managed MCP Server read-only cluster inspection and `ccloud` CLI live cluster/fixture inspection | Passed |
| At least one AWS service | AWS Lambda + HTTP API is implemented and SAM-validated | Deployment pending |
| Public, open-source code with visible license | Public GitHub repo with detected MIT license | Passed |
| Functional demo link | Public-safe GitHub Pages demo | Passed |
| English description and testing material | README, architecture, Devpost draft, and public-safe fixture are English | Passed |
| Under-three-minute video shows product and CockroachDB memory at work | Timecoded 2:05 capture packet reserves product, CockroachDB, MCP, and AWS evidence segments | Final capture pending AWS insert |
| Identify CockroachDB and AWS tool use | Devpost draft names Managed MCP, `ccloud`, CockroachDB Cloud, AWS Lambda, and HTTP API with their roles | Ready |
| Free, public judge access through judging | GitHub Pages demo and public repository are no-login; final API must remain public-safe | Ready after AWS replay |

## Exact judge narrative

Promise Ledger is not a chat-memory archive. It turns one customer commitment into a durable record with a named owner and an ordered decision trail. The agent can inspect only customer-and-project-scoped memory, then chooses one of three bounded outcomes: assign an owner, hold for missing context, or prepare a review-only draft. It never sends a customer message by itself.

## Remaining execution

1. Authenticate the AWS account and deploy `aws/template.yaml`.
2. Verify `/health`, one public-safe record read, and one decision response.
3. Record the prepared 2:05 video with live CockroachDB and AWS footage.
4. Place the video on the contest submission and complete the factual entry fields.

No judge-facing material should claim the AWS service is deployed until step 2 is captured.
