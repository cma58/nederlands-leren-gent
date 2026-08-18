PRAGMA foreign_keys = ON;

CREATE TABLE ai_coach_responses (
  id TEXT PRIMARY KEY,
  cache_key TEXT UNIQUE,
  lesson_id TEXT NOT NULL,
  item_index INTEGER NOT NULL,
  mode TEXT NOT NULL CHECK (mode IN ('WORD', 'PRONUNCIATION')),
  model TEXT NOT NULL,
  response_json TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ai_coach_cache ON ai_coach_responses(cache_key);
CREATE INDEX idx_ai_coach_created ON ai_coach_responses(mode, created_at DESC);

CREATE TABLE ai_coach_daily_usage (
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  usage_day TEXT NOT NULL,
  generations INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (user_id, usage_day)
);

CREATE TABLE ai_coach_feedback (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  response_id TEXT NOT NULL REFERENCES ai_coach_responses(id) ON DELETE CASCADE,
  resolved_at TEXT,
  resolved_by TEXT REFERENCES users(id),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (user_id, response_id)
);

CREATE INDEX idx_ai_coach_feedback_open ON ai_coach_feedback(resolved_at, created_at DESC);
