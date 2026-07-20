# Promise Ledger Public Demo Receipt

Receipt ID: PL-20260720-PUBLIC-DEMO
Date: 2026-07-20
Status: public static demo deployed and verified; AWS Lambda/API remains pending

Agent ID: ORION_L
Lane: Contest portfolio / CockroachDB x AWS Hackathon
Task: Publish the public-safe Promise Ledger interaction as a GitHub Pages demo without making a false AWS application-service claim.
Files read: `package.json`, `vite.config.ts`, `.github/workflows/verify.yml`, SignalCut's existing Pages workflow, current Vite GitHub Pages deployment guidance, and GitHub Pages deployment guidance.
Proof path: `https://peanuts1605.github.io/promise-ledger/`
Needs Fulcro QA: yes, for the deployed interaction and final post-AWS submission packet

## Decision

Publish the static, public-safe product journey now. It gives judges a working link and leaves the CockroachDB-backed AWS Lambda/API claim gated on its own deployment proof.

## Artifact

- Live demo: https://peanuts1605.github.io/promise-ledger/
- Repository: https://github.com/Peanuts1605/promise-ledger
- Successful Pages workflow: https://github.com/Peanuts1605/promise-ledger/actions/runs/29748354143
- Deployment commit: `af82a5c`

## Implementation

- Vite accepts `VITE_BASE_PATH`, allowing the local build to stay rooted at `/` while the Pages build uses `/promise-ledger/`.
- GitHub Pages is configured as a public workflow deployment with a built `dist` artifact.
- The initial Pages workflow revealed two real configuration issues: an invalid action reference and an absent repository Pages site. The workflow now uses the action versions already proven by SignalCut, and the Pages site was created through the authenticated GitHub CLI before the successful replay.

## Validation

- `VITE_BASE_PATH=/promise-ledger/ npm run build`: passed; generated asset paths use `/promise-ledger/`.
- `npm test`: passed, 10 tests.
- `npm run lint`: passed.
- GitHub Pages workflow: build, Pages configuration, artifact upload, and deployment all passed.
- Cold URL probe: the public document returned the `Promise Ledger` title and its repository-scoped JavaScript asset returned HTTP `200`.

## Current-tool radar

- Vite 8.1.5: official GitHub Pages guidance requires a repository-specific `base` path for `https://<user>.github.io/<repo>/`; the generated build verified that route.
- GitHub Pages: official workflow publishing guidance was checked, then the deploy route was smoke-tested on the actual public repository.
- Decision: GitHub Pages is the smallest no-cost public demo route. It does not replace the still-pending AWS Lambda/API proof.

## Coding capacity decision

- delegated: no
- accountable_agent: ORION_L
- worker_agent: none
- worker_model: none
- worker_role: none
- task_slice: Vite base-path configuration and one Pages workflow
- files_or_sources_owned: `vite.config.ts`, `.github/workflows/deploy-pages.yml`, public deployment response
- worker_result: not applicable
- parent_verification: local repository-scoped build, full tests/lint, successful GitHub Actions deployment, and public URL/asset probe
- accepted: yes
- reason_not_delegated: this was a two-file, tightly coupled production deployment patch; splitting it would have added coordination risk without improving the proof.

## Remaining concrete proof

Authenticate an AWS account with Lambda, API Gateway, and CloudFormation/SAM deployment access. Then deploy `aws/template.yaml`, verify `/health` plus one public-safe API transaction, and record the final sub-three-minute demo video.

## Shared proof

- Drive mirror: `TMN_NAUMIO_HQ/06_DELIVERY/PL-20260720-PUBLIC-DEMO/` (SHA-256 mirror verified, 6 files)
- Notion pointer: https://app.notion.com/p/3a3b143d291781868b7bc4aacf955279
- Reconciled receipt: this receipt was patched after the Drive mirror and Notion pointer were verified; its reconciled copy is re-mirrored with the delivery bundle.
