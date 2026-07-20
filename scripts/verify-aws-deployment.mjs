const baseUrl = (process.env.PROMISE_LEDGER_API_URL ?? '').replace(/\/$/, '');

if (!baseUrl.startsWith('https://')) {
  throw new Error('PROMISE_LEDGER_API_URL_HTTPS_REQUIRED');
}

async function getJson(path) {
  const response = await fetch(`${baseUrl}${path}`);
  const body = await response.json().catch(() => null);
  if (!response.ok) throw new Error(`AWS_API_REQUEST_FAILED:${path}:${response.status}`);
  return body;
}

const health = await getJson('/health');
if (health?.status !== 'ok' || health?.persistentStore !== 'cockroachdb') {
  throw new Error('AWS_HEALTH_DID_NOT_CONFIRM_COCKROACHDB');
}

const record = await getJson('/api/promises/PL-DEMO-001');
if (record?.promise?.external_key !== 'PL-DEMO-001' || !Array.isArray(record?.events)) {
  throw new Error('AWS_PUBLIC_SAFE_RECORD_READ_FAILED');
}

const decision = await getJson('/api/promises/PL-DEMO-003/decision');
if (decision?.promiseKey !== 'PL-DEMO-003' || decision?.recommendation?.decision !== 'PREPARE_REVIEW_DRAFT') {
  throw new Error('AWS_PUBLIC_SAFE_DECISION_READ_FAILED');
}

process.stdout.write(`${JSON.stringify({
  status: 'verified',
  api: baseUrl,
  health: { persistentStore: health.persistentStore, status: health.status },
  record: 'PL-DEMO-001',
  decision: { promiseKey: decision.promiseKey, recommendation: decision.recommendation.decision },
}, null, 2)}\n`);
