import assert from 'node:assert/strict';
import fs from 'node:fs';

const sql = fs.readFileSync(new URL('../server/schema.sql', import.meta.url), 'utf8');
for (const requiredStatement of [
  'CREATE TABLE IF NOT EXISTS promise_records',
  'CREATE TABLE IF NOT EXISTS promise_events',
  'CREATE TABLE IF NOT EXISTS promise_memories',
  'UNIQUE (promise_id, sequence)',
]) {
  assert.ok(sql.includes(requiredStatement), `schema contract missing: ${requiredStatement}`);
}
assert.ok(sql.includes('promise_records_customer_project_idx'));
assert.ok(sql.includes('promise_events_timeline_idx'));
assert.ok(sql.includes('promise_memories_scope_idx'));
process.stdout.write('Promise Ledger CockroachDB schema contract passed.\n');
