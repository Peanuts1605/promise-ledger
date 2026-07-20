import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import pg from 'pg';

const { Pool } = pg;
const seedUrl = new URL('../demo/public-safe-seed.json', import.meta.url);
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) throw new Error('DATABASE_URL_REQUIRED');
if (process.env.ALLOW_PUBLIC_SAFE_SEED !== 'true') {
  throw new Error('Set ALLOW_PUBLIC_SAFE_SEED=true to run the synthetic demo seed.');
}

const seed = JSON.parse(await fs.readFile(seedUrl, 'utf8'));
const pool = new Pool({ connectionString: databaseUrl, max: 1 });
const client = await pool.connect();

try {
  await client.query('BEGIN');

  for (const promise of seed.promises) {
    await client.query(
      `INSERT INTO promise_records (
         id, external_key, customer_key, project_key, commitment, source_reference,
         owner_name, owner_confirmed_at, due_at, state
       ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       ON CONFLICT (external_key) DO NOTHING`,
      [
        promise.id,
        promise.externalKey,
        promise.customerKey,
        promise.projectKey,
        promise.commitment,
        promise.sourceReference,
        promise.ownerName,
        promise.ownerConfirmedAt,
        promise.dueAt,
        promise.state,
      ],
    );

    await client.query(
      `INSERT INTO promise_events (id, promise_id, sequence, event_type, actor, detail)
       VALUES ($1, $2, 1, 'captured', 'public-safe-demo', $3::jsonb)
       ON CONFLICT (promise_id, sequence) DO NOTHING`,
      [crypto.randomUUID(), promise.id, JSON.stringify({ sourceReference: promise.sourceReference })],
    );

    if (promise.ownerName) {
      await client.query(
        `INSERT INTO promise_events (id, promise_id, sequence, event_type, actor, detail)
         VALUES ($1, $2, 2, 'owner_assigned', 'public-safe-demo', $3::jsonb)
         ON CONFLICT (promise_id, sequence) DO NOTHING`,
        [crypto.randomUUID(), promise.id, JSON.stringify({ owner: promise.ownerName })],
      );
    }
  }

  for (const memory of seed.memories) {
    await client.query(
      `INSERT INTO promise_memories (
         id, customer_key, project_key, source_reference, excerpt, eligibility, recorded_at
       ) VALUES ($1, $2, $3, $4, $5, $6, $7)
       ON CONFLICT (id) DO NOTHING`,
      [
        memory.id,
        memory.customerKey,
        memory.projectKey,
        memory.sourceReference,
        memory.excerpt,
        memory.eligibility,
        memory.recordedAt,
      ],
    );
  }

  await client.query('COMMIT');
  process.stdout.write(`Seeded ${seed.promises.length} public-safe promises and ${seed.memories.length} scoped memories.\n`);
} catch (error) {
  await client.query('ROLLBACK');
  throw error;
} finally {
  client.release();
  await pool.end();
}
