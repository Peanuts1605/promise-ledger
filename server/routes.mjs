const promiseRoute = /^\/api\/promises\/([^/]+)(?:\/(owner|decision))?$/;

export function parsePromiseRoute(path) {
  const match = path?.match(promiseRoute);
  if (!match) return null;

  return {
    externalKey: decodeURIComponent(match[1]),
    action: match[2] ?? 'read',
  };
}
