export function normalizeOwnerName(value) {
  const owner = typeof value === 'string' ? value.trim().replace(/\s+/g, ' ') : '';
  if (owner.length < 2 || owner.length > 80) {
    throw new Error('owner_name_must_be_between_2_and_80_characters');
  }
  return owner;
}

export function promiseScope({ customerKey, projectKey }) {
  if (!customerKey || !projectKey) {
    throw new Error('customer_and_project_scope_are_required');
  }
  return { customerKey, projectKey, eligibility: 'matched' };
}

export function nextSequence(events) {
  return events.reduce((latest, event) => Math.max(latest, Number(event.sequence) || 0), 0) + 1;
}
