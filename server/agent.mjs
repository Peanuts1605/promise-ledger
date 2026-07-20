export function decideNextMove({ promise, matchingMemory }) {
  if (!promise.owner_name) {
    return {
      decision: 'ASSIGN_OWNER',
      rationale: 'A customer commitment cannot advance until one accountable person is named.',
      safeToDraft: false,
    };
  }

  if (!matchingMemory?.length) {
    return {
      decision: 'HOLD_FOR_CONTEXT',
      rationale: 'The owner is known, but no customer-plus-project memory is eligible for a grounded follow-up.',
      safeToDraft: false,
    };
  }

  if (promise.state === 'review_ready') {
    return {
      decision: 'REVIEW_DRAFT',
      rationale: 'A scoped draft exists and needs an owner review before any external communication.',
      safeToDraft: false,
    };
  }

  return {
    decision: 'PREPARE_REVIEW_DRAFT',
    rationale: 'An accountable owner and eligible memory are available for a review-only customer follow-up.',
    safeToDraft: true,
  };
}
