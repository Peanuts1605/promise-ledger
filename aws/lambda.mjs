import { createPromiseRepository } from '../server/repository.mjs';

let repository;

function response(statusCode, body) {
  return {
    statusCode,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'GET, POST, OPTIONS',
      'access-control-allow-headers': 'content-type',
    },
    body: JSON.stringify(body),
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
  if (method === 'OPTIONS') return response(204, {});

  const activeRepository = getRepository();
  if (path === '/health') {
    if (!activeRepository) return response(503, { status: 'configuration_required', missing: 'DATABASE_URL' });
    try {
      return response(200, await activeRepository.health());
    } catch {
      return response(503, { status: 'unavailable', persistentStore: 'cockroachdb' });
    }
  }
  if (!activeRepository) return response(503, { error: 'DATABASE_URL_REQUIRED' });

  const match = path.match(/^\/api\/promises\/([^/]+)(?:\/owner)?$/);
  if (!match) return response(404, { error: 'not_found' });
  const externalKey = decodeURIComponent(match[1]);

  try {
    if (method === 'GET') {
      const promise = await activeRepository.getPromise(externalKey);
      if (!promise) return response(404, { error: 'PROMISE_NOT_FOUND' });
      const [events, memory] = await Promise.all([
        activeRepository.getEvents(promise.id),
        activeRepository.getScopedMemory({ customerKey: promise.customer_key, projectKey: promise.project_key }),
      ]);
      return response(200, { promise, events, memory });
    }
    if (method === 'POST' && path.endsWith('/owner')) {
      const body = event.body ? JSON.parse(event.body) : {};
      const promise = await activeRepository.assignOwner({ externalKey, ownerName: body.ownerName, actor: body.actor });
      return response(200, { promise });
    }
    return response(405, { error: 'method_not_allowed' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'internal_error';
    return response(message === 'PROMISE_NOT_FOUND' ? 404 : 400, { error: message });
  }
}
