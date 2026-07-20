import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import test from 'node:test';
import { nextSequence, normalizeOwnerName, promiseScope } from '../server/validation.mjs';
import { handler } from '../aws/lambda.mjs';
import { decideNextMove } from '../server/agent.mjs';
import { parsePromiseRoute } from '../server/routes.mjs';

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

test('the decision route is distinct from the generic promise read route', () => {
  assert.deepEqual(parsePromiseRoute('/api/promises/PL-001'), { externalKey: 'PL-001', action: 'read' });
  assert.deepEqual(parsePromiseRoute('/api/promises/PL-001/decision'), { externalKey: 'PL-001', action: 'decision' });
  assert.deepEqual(parsePromiseRoute('/api/promises/PL-001/owner'), { externalKey: 'PL-001', action: 'owner' });
  assert.equal(parsePromiseRoute('/api/promises/PL-001/unknown'), null);
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

test('the public-safe seed exercises each promised agent outcome', async () => {
  const seedUrl = new URL('../demo/public-safe-seed.json', import.meta.url);
  const seed = JSON.parse(await fs.readFile(seedUrl, 'utf8'));
  const expectedByKey = {
    'PL-DEMO-001': 'ASSIGN_OWNER',
    'PL-DEMO-002': 'HOLD_FOR_CONTEXT',
    'PL-DEMO-003': 'PREPARE_REVIEW_DRAFT',
  };

  for (const promise of seed.promises) {
    const matchingMemory = seed.memories.filter((memory) => (
      memory.customerKey === promise.customerKey
      && memory.projectKey === promise.projectKey
      && memory.eligibility === 'matched'
    ));
    assert.equal(
      decideNextMove({ promise: { owner_name: promise.ownerName, state: promise.state }, matchingMemory }).decision,
      expectedByKey[promise.externalKey],
    );
  }
});
