import { createServer } from 'node:http';
import { decideNextMove } from './agent.mjs';
import { createPromiseRepository } from './repository.mjs';

const port = Number(process.env.PORT || 8787);
const databaseUrl = process.env.DATABASE_URL;
const repository = databaseUrl ? createPromiseRepository(databaseUrl) : null;

function send(response, status, body) {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  response.end(JSON.stringify(body));
}

async function readJson(request) {
  let raw = '';
  for await (const chunk of request) raw += chunk;
  return raw ? JSON.parse(raw) : {};
}

const server = createServer(async (request, response) => {
  if (request.method === 'OPTIONS') return send(response, 204, {});
  if (request.url === '/health') {
    if (!repository) return send(response, 503, { status: 'configuration_required', missing: 'DATABASE_URL' });
    try {
      return send(response, 200, await repository.health());
    } catch {
      return send(response, 503, { status: 'unavailable', persistentStore: 'cockroachdb' });
    }
  }
  if (!repository) return send(response, 503, { error: 'DATABASE_URL_REQUIRED' });

  const match = request.url?.match(/^\/api\/promises\/([^/]+)(?:\/(owner|decision))?$/);
  if (!match) return send(response, 404, { error: 'not_found' });
  const externalKey = decodeURIComponent(match[1]);
  const action = match[2];

  try {
    if (request.method === 'GET') {
      const promise = await repository.getPromise(externalKey);
      if (!promise) return send(response, 404, { error: 'PROMISE_NOT_FOUND' });
      const [events, memory] = await Promise.all([
        repository.getEvents(promise.id),
        repository.getScopedMemory({ customerKey: promise.customer_key, projectKey: promise.project_key }),
      ]);
      return send(response, 200, { promise, events, memory });
    }
    if (request.method === 'GET' && action === 'decision') {
      const promise = await repository.getPromise(externalKey);
      if (!promise) return send(response, 404, { error: 'PROMISE_NOT_FOUND' });
      const matchingMemory = await repository.getScopedMemory({ customerKey: promise.customer_key, projectKey: promise.project_key });
      return send(response, 200, { promiseKey: externalKey, recommendation: decideNextMove({ promise, matchingMemory }) });
    }
    if (request.method === 'POST' && action === 'owner') {
      const body = await readJson(request);
      return send(response, 200, { promise: await repository.assignOwner({ externalKey, ownerName: body.ownerName, actor: body.actor }) });
    }
    return send(response, 405, { error: 'method_not_allowed' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'internal_error';
    return send(response, message === 'PROMISE_NOT_FOUND' ? 404 : 400, { error: message });
  }
});

server.listen(port, () => {
  process.stdout.write(`Promise Ledger API listening on http://127.0.0.1:${port}\n`);
});
