-- Promise Ledger persistent-memory schema for CockroachDB.
-- All IDs are generated in the application so the schema can be replayed in a
-- clean CockroachDB Cloud cluster without relying on local extensions.

CREATE TABLE IF NOT EXISTS promise_records (
  id UUID PRIMARY KEY,
  external_key STRING NOT NULL UNIQUE,
  customer_key STRING NOT NULL,
  project_key STRING NOT NULL,
  commitment STRING NOT NULL,
  source_reference STRING NOT NULL,
  owner_name STRING NULL,
  owner_confirmed_at TIMESTAMPTZ NULL,
  due_at TIMESTAMPTZ NOT NULL,
  state STRING NOT NULL DEFAULT 'owner_required'
    CHECK (state IN ('owner_required', 'owner_confirmed', 'review_ready', 'resolved', 'hold')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS promise_records_customer_project_idx
  ON promise_records (customer_key, project_key, due_at DESC);

CREATE TABLE IF NOT EXISTS promise_events (
  id UUID PRIMARY KEY,
  promise_id UUID NOT NULL REFERENCES promise_records(id),
  sequence INT8 NOT NULL,
  event_type STRING NOT NULL
    CHECK (event_type IN ('captured', 'owner_assigned', 'reminder_scheduled', 'draft_prepared', 'state_changed')),
  actor STRING NOT NULL,
  detail JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT promise_events_sequence_unique UNIQUE (promise_id, sequence)
);

CREATE INDEX IF NOT EXISTS promise_events_timeline_idx
  ON promise_events (promise_id, sequence ASC);

CREATE TABLE IF NOT EXISTS promise_memories (
  id UUID PRIMARY KEY,
  customer_key STRING NOT NULL,
  project_key STRING NOT NULL,
  source_reference STRING NOT NULL,
  excerpt STRING NOT NULL,
  eligibility STRING NOT NULL DEFAULT 'matched'
    CHECK (eligibility IN ('matched', 'excluded', 'needs_review')),
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS promise_memories_scope_idx
  ON promise_memories (customer_key, project_key, eligibility, recorded_at DESC);
