import assert from 'node:assert/strict';
import test from 'node:test';
import { nextSequence, normalizeOwnerName, promiseScope } from '../server/validation.mjs';
import { handler } from '../aws/lambda.mjs';
import { decideNextMove } from '../server/agent.mjs';

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

test('the agent asks for ownership before preparing any follow-up', () => {
  assert.deepEqual(
    decideNextMove({ promise: { owner_name: null, state: 'owner_required' }, matchingMemory: [{ id: 'memory-1' }] }),
    {
      decision: 'ASSIGN_OWNER',
      rationale: 'A customer commitment cannot advance until one accountable person is named.',
      safeToDraft: false,
    },
  );
});

test('the agent holds when scoped customer context is unavailable', () => {
  assert.equal(
    decideNextMove({ promise: { owner_name: 'Jordan Kim', state: 'owner_confirmed' }, matchingMemory: [] }).decision,
    'HOLD_FOR_CONTEXT',
  );
});

test('the agent prepares review-only work when owner and context both exist', () => {
  assert.equal(
    decideNextMove({ promise: { owner_name: 'Jordan Kim', state: 'owner_confirmed' }, matchingMemory: [{ id: 'memory-1' }] }).decision,
    'PREPARE_REVIEW_DRAFT',
  );
});
