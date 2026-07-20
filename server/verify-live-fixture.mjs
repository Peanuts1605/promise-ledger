import fs from 'node:fs/promises';
import { decideNextMove } from './agent.mjs';
import { createPromiseRepository } from './repository.mjs';

const databaseUrl = process.env.DATABASE_URL;
const seedUrl = new URL('../demo/public-safe-seed.json', import.meta.url);

if (!databaseUrl) throw new Error('DATABASE_URL_REQUIRED');

const seed = JSON.parse(await fs.readFile(seedUrl, 'utf8'));
if (!seed.promises.every((promise) => promise.externalKey.startsWith('PL-DEMO-'))) {
  throw new Error('LIVE_FIXTURE_MUST_ONLY_USE_PUBLIC_SAFE_DEMO_KEYS');
}

const expectedByKey = {
  'PL-DEMO-001': 'ASSIGN_OWNER',
  'PL-DEMO-002': 'HOLD_FOR_CONTEXT',
  'PL-DEMO-003': 'PREPARE_REVIEW_DRAFT',
};
const repository = createPromiseRepository(databaseUrl);

try {
  const health = await repository.health();
  const fixtures = [];

  for (const definition of seed.promises) {
    const promise = await repository.getPromise(definition.externalKey);
    if (!promise) throw new Error(`LIVE_FIXTURE_MISSING:${definition.externalKey}`);

    const [events, matchingMemory] = await Promise.all([
      repository.getEvents(promise.id),
      repository.getScopedMemory({ customerKey: promise.customer_key, projectKey: promise.project_key }),
    ]);
    const recommendation = decideNextMove({ promise, matchingMemory });
    if (recommendation.decision !== expectedByKey[definition.externalKey]) {
      throw new Error(`LIVE_FIXTURE_DECISION_MISMATCH:${definition.externalKey}:${recommendation.decision}`);
    }
    if (events.length < 1) throw new Error(`LIVE_FIXTURE_EVENTS_MISSING:${definition.externalKey}`);

    fixtures.push({
      externalKey: definition.externalKey,
      eventCount: events.length,
      matchingMemoryCount: matchingMemory.length,
      recommendation: recommendation.decision,
    });
  }

  process.stdout.write(`${JSON.stringify({ status: 'verified', persistentStore: health.persistentStore, fixtures }, null, 2)}\n`);
} finally {
  await repository.close();
}
