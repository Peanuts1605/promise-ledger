import fs from 'node:fs/promises';
import pg from 'pg';

const { Pool } = pg;
const databaseUrl = process.env.DATABASE_URL;
const schemaUrl = new URL('./schema.sql', import.meta.url);

if (!databaseUrl) throw new Error('DATABASE_URL_REQUIRED');
if (process.env.ALLOW_SCHEMA_APPLY !== 'true') {
  throw new Error('Set ALLOW_SCHEMA_APPLY=true to apply the Promise Ledger schema.');
}

const schema = await fs.readFile(schemaUrl, 'utf8');
const pool = new Pool({ connectionString: databaseUrl, max: 1 });

try {
  await pool.query(schema);
  process.stdout.write('Promise Ledger CockroachDB schema applied.\n');
} finally {
  await pool.end();
}
