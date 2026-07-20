import assert from 'node:assert/strict';
import test from 'node:test';
import { nextSequence, normalizeOwnerName, promiseScope } from '../server/validation.mjs';
import { handler } from '../aws/lambda.mjs';

test('normalizes a real owner name', () => {
  assert.equal(normalizeOwnerName('  Jordan   Kim '), 'Jordan Kim');
});

test('rejects an absent accountable owner', () => {
  assert.throws(() => normalizeOwnerName(''), /owner_name/);
});

test('memory requires both customer and project scope', () => {
  assert.deepEqual(
    promiseScope({ customerKey: 'evelyn-perez', projectKey: 'southside-patio' }),
    { customerKey: 'evelyn-perez', projectKey: 'southside-patio', eligibility: 'matched' },
  );
  assert.throws(() => promiseScope({ customerKey: 'evelyn-perez', projectKey: '' }), /scope/);
});

test('events advance in immutable sequence order', () => {
  assert.equal(nextSequence([{ sequence: 1 }, { sequence: 3 }]), 4);
  assert.equal(nextSequence([]), 1);
});

test('Lambda reports missing persistent memory configuration instead of faking a store', async () => {
  const original = process.env.DATABASE_URL;
  delete process.env.DATABASE_URL;
  const result = await handler({ rawPath: '/health', requestContext: { http: { method: 'GET' } } });
  if (original) process.env.DATABASE_URL = original;
  assert.equal(result.statusCode, 503);
  assert.deepEqual(JSON.parse(result.body), { status: 'configuration_required', missing: 'DATABASE_URL' });
});
