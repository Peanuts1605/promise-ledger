import crypto from 'node:crypto';
import pg from 'pg';
import { nextSequence, normalizeOwnerName, promiseScope } from './validation.mjs';

const { Pool } = pg;

export function createPromiseRepository(databaseUrl) {
  if (!databaseUrl) {
    throw new Error('DATABASE_URL_REQUIRED');
  }

  const pool = new Pool({ connectionString: databaseUrl, max: 5 });

  async function getPromise(externalKey) {
    const result = await pool.query(
      `SELECT id, external_key, customer_key, project_key, commitment, source_reference,
              owner_name, owner_confirmed_at, due_at, state, created_at, updated_at
       FROM promise_records WHERE external_key = $1`,
      [externalKey],
    );
    return result.rows[0] ?? null;
  }

  async function getEvents(promiseId) {
    const result = await pool.query(
      `SELECT id, promise_id, sequence, event_type, actor, detail, created_at
       FROM promise_events WHERE promise_id = $1 ORDER BY sequence ASC`,
      [promiseId],
    );
    return result.rows;
  }

  async function getScopedMemory({ customerKey, projectKey }) {
    const scope = promiseScope({ customerKey, projectKey });
    const result = await pool.query(
      `SELECT id, source_reference, excerpt, recorded_at
       FROM promise_memories
       WHERE customer_key = $1 AND project_key = $2 AND eligibility = $3
       ORDER BY recorded_at DESC`,
      [scope.customerKey, scope.projectKey, scope.eligibility],
    );
    return result.rows;
  }

  async function assignOwner({ externalKey, ownerName, actor = 'operator' }) {
    const owner = normalizeOwnerName(ownerName);
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const promiseResult = await client.query(
        `SELECT id, state FROM promise_records WHERE external_key = $1 FOR UPDATE`,
        [externalKey],
      );
      const promise = promiseResult.rows[0];
      if (!promise) throw new Error('PROMISE_NOT_FOUND');

      const eventsResult = await client.query(
        `SELECT sequence FROM promise_events WHERE promise_id = $1 ORDER BY sequence ASC`,
        [promise.id],
      );
      const sequence = nextSequence(eventsResult.rows);
      await client.query(
        `UPDATE promise_records
         SET owner_name = $2, owner_confirmed_at = now(), state = 'owner_confirmed', updated_at = now()
         WHERE id = $1`,
        [promise.id, owner],
      );
      await client.query(
        `INSERT INTO promise_events (id, promise_id, sequence, event_type, actor, detail)
         VALUES ($1, $2, $3, 'owner_assigned', $4, $5)`,
        [crypto.randomUUID(), promise.id, sequence, actor, JSON.stringify({ owner })],
      );
      await client.query('COMMIT');
      return getPromise(externalKey);
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async function health() {
    await pool.query('SELECT 1 AS healthy');
    return { persistentStore: 'cockroachdb', status: 'ok' };
  }

  return { assignOwner, getEvents, getPromise, getScopedMemory, health, close: () => pool.end() };
}
