import fs from 'node:fs/promises';

const seedUrl = new URL('../demo/public-safe-seed.json', import.meta.url);
const seed = JSON.parse(await fs.readFile(seedUrl, 'utf8'));

if (!Array.isArray(seed.promises) || !Array.isArray(seed.memories)) {
  throw new Error('Seed must contain promises and memories arrays.');
}

const expectedOutcomes = new Set();
for (const promise of seed.promises) {
  if (!promise.externalKey?.startsWith('PL-DEMO-')) throw new Error('Public-safe promise keys must use the PL-DEMO- prefix.');
  if (!promise.customerKey || !promise.projectKey || !promise.commitment || !promise.sourceReference) {
    throw new Error(`Incomplete public-safe promise: ${promise.externalKey}`);
  }
  if (!promise.ownerName) expectedOutcomes.add('ASSIGN_OWNER');
  else if (!seed.memories.some((memory) => memory.customerKey === promise.customerKey && memory.projectKey === promise.projectKey && memory.eligibility === 'matched')) {
    expectedOutcomes.add('HOLD_FOR_CONTEXT');
  } else expectedOutcomes.add('PREPARE_REVIEW_DRAFT');
}

for (const outcome of ['ASSIGN_OWNER', 'HOLD_FOR_CONTEXT', 'PREPARE_REVIEW_DRAFT']) {
  if (!expectedOutcomes.has(outcome)) throw new Error(`Seed does not exercise ${outcome}.`);
}

for (const memory of seed.memories) {
  if (!memory.sourceReference?.startsWith('public-safe-demo:')) throw new Error('Seed memory source must be explicitly public-safe.');
}

process.stdout.write('Promise Ledger public-safe seed contract passed.\n');
