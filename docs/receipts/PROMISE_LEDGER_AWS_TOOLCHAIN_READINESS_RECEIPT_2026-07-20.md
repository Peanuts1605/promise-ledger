# Promise Ledger AWS Toolchain Readiness Receipt

Receipt ID: PL-20260720-AWS-TOOLCHAIN-READY
Date: 2026-07-20
Status: deployment toolchain and template verified; AWS account authentication pending

Agent ID: ORION_L
Lane: Contest portfolio / CockroachDB x AWS Hackathon
Task: Remove local AWS deployment friction for Promise Ledger and distinguish template readiness from authenticated cloud deployment.
Files read: `aws/template.yaml`, `aws/lambda.mjs`, `aws/README.md`, `package.json`, `docs/COCKROACHDB_AWS_PLATFORM_ROUTE_2026-07-20.md`, and current official AWS CLI/SAM installation guidance.
Proof path: `promise-ledger/aws/template.yaml`
Needs Fulcro QA: yes, after the deployed Lambda/API proof exists

## Decision

The deployment route is toolchain-ready. Do not treat this as an AWS service claim until an authenticated account deploys the stack and the live endpoint responds.

## Installed toolchain

- AWS CLI `2.36.2`
- AWS SAM CLI `1.163.0`
- Region selected for validation: `us-east-1`

## Template proof

- `sam validate --template-file aws/template.yaml --region us-east-1`: passed.
- `sam validate --template-file aws/template.yaml --region us-east-1 --lint`: passed.
- `sam build --template-file aws/template.yaml`: passed for the ARM64 Node.js 22 Lambda artifact.

## Identity proof

`aws sts get-caller-identity --region us-east-1` returned the expected unauthenticated state. No AWS credential, profile, account identifier, or secret was written to the repository, receipt, Drive, or Notion.

## Current-tool radar

- AWS's current SAM documentation says the CLI requires an AWS account, secure access, AWS CLI installation, and configured credentials before deployment.
- AWS's current CLI documentation remains the source for AWS CLI v2 installation and version management.
- Decision: use the prepared local AWS CLI and SAM CLI after an authenticated deployment identity becomes available; do not switch to an unproven deployment route.

Official references:

- https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html
- https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html

## Next smallest proof

Authenticate an AWS account that can create the Lambda, API Gateway, CloudFormation/SAM resources, and execution role. Then deploy `aws/template.yaml`, verify `/health` and one public-safe API transaction, and record the exact endpoint in the final demo evidence.

## Shared proof

- Drive mirror: `TMN_NAUMIO_HQ/06_DELIVERY/PL-20260720-AWS-TOOLCHAIN-READY/` (SHA-256 mirror verified, 5 files)
- Notion pointer: https://app.notion.com/p/3a3b143d29178176aa8bcd2e20a1ff75
- Reconciled receipt: this receipt was patched after the Drive mirror and Notion pointer were verified; its reconciled copy is re-mirrored with the delivery bundle.
