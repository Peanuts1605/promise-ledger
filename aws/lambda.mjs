import { createPromiseRepository } from '../server/repository.mjs';
import { decideNextMove } from '../server/agent.mjs';
import { parsePromiseRoute } from '../server/routes.mjs';
import { randomUUID } from 'node:crypto';

let repository;

function response(statusCode, body, requestId) {
  return {
    statusCode,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'GET, OPTIONS',
      'access-control-allow-headers': 'content-type',
    },
    body: JSON.stringify({ ...body, requestId }),
  };
}

function getRepository() {
  if (!process.env.DATABASE_URL) return null;
  repository ??= createPromiseRepository(process.env.DATABASE_URL);
  return repository;
}

export async function handler(event) {
  const method = event.requestContext?.http?.method ?? event.httpMethod ?? 'GET';
  const path = event.rawPath ?? event.path ?? '/';
  const requestId = event.requestContext?.requestId ?? randomUUID();
  const route = parsePromiseRoute(path);
  const operation = path === '/health' ? 'health' : route?.action ?? 'unknown';
  const respond = (statusCode, body) => {
    console.info(JSON.stringify({ event: 'promise_ledger_request', requestId, operation, statusCode }));
    return response(statusCode, body, requestId);
  };

  if (method === 'OPTIONS') return respond(204, {});
  if (method === 'POST' && route?.action === 'owner') {
    return respond(405, { error: 'public_write_not_enabled' });
  }

  const activeRepository = getRepository();
  if (path === '/health') {
    if (!activeRepository) return respond(503, { status: 'configuration_required', missing: 'DATABASE_URL' });
    try {
      return respond(200, await activeRepository.health());
    } catch {
      return respond(503, { status: 'unavailable', persistentStore: 'cockroachdb' });
    }
  }
  if (!activeRepository) return respond(503, { error: 'DATABASE_URL_REQUIRED' });

  if (!route) return respond(404, { error: 'not_found' });
  const { externalKey, action } = route;

  try {
    if (method === 'GET' && action === 'decision') {
      const promise = await activeRepository.getPromise(externalKey);
      if (!promise) return respond(404, { error: 'PROMISE_NOT_FOUND' });
      const matchingMemory = await activeRepository.getScopedMemory({ customerKey: promise.customer_key, projectKey: promise.project_key });
      return respond(200, { promiseKey: externalKey, recommendation: decideNextMove({ promise, matchingMemory }) });
    }
    if (method === 'GET' && action === 'read') {
      const promise = await activeRepository.getPromise(externalKey);
      if (!promise) return respond(404, { error: 'PROMISE_NOT_FOUND' });
      const [events, memory] = await Promise.all([
        activeRepository.getEvents(promise.id),
        activeRepository.getScopedMemory({ customerKey: promise.customer_key, projectKey: promise.project_key }),
      ]);
      return respond(200, { promise, events, memory });
    }
    return respond(405, { error: 'method_not_allowed' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'internal_error';
    return respond(message === 'PROMISE_NOT_FOUND' ? 404 : 400, { error: message });
  }
}
