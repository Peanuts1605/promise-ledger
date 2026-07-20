#!/usr/bin/env bash
set -euo pipefail

stack_name="${PROMISE_LEDGER_STACK_NAME:-promise-ledger-public-safe}"
region="${AWS_REGION:-us-east-1}"

if [[ -z "${DATABASE_URL:-}" ]]; then
  echo "DATABASE_URL is required through an approved secret-injection environment."
  exit 1
fi

aws sts get-caller-identity --region "$region" >/dev/null

sam deploy \
  --template-file aws/template.yaml \
  --stack-name "$stack_name" \
  --region "$region" \
  --resolve-s3 \
  --capabilities CAPABILITY_IAM \
  --parameter-overrides "DatabaseUrl=$DATABASE_URL" \
  --no-confirm-changeset \
  --no-fail-on-empty-changeset

api_url="$(aws cloudformation describe-stacks \
  --stack-name "$stack_name" \
  --region "$region" \
  --query "Stacks[0].Outputs[?OutputKey=='PromiseLedgerApiUrl'].OutputValue | [0]" \
  --output text)"

if [[ -z "$api_url" || "$api_url" == "None" ]]; then
  echo "PromiseLedgerApiUrl output was not found."
  exit 1
fi

PROMISE_LEDGER_API_URL="$api_url" npm run aws:verify
