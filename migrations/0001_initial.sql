PRAGMA foreign_keys = ON;

CREATE TABLE users (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL,
  username_normalized TEXT NOT NULL UNIQUE,
  display_name TEXT,
  email TEXT,
  role TEXT NOT NULL DEFAULT 'STUDENT' CHECK (role IN ('STUDENT', 'ADMIN')),
  status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'ACTIVE', 'REJECTED', 'SUSPENDED')),
  password_hash TEXT NOT NULL,
  password_salt TEXT NOT NULL,
  password_iterations INTEGER NOT NULL,
  must_change_password INTEGER NOT NULL DEFAULT 0 CHECK (must_change_password IN (0, 1)),
  approved_at TEXT,
  approved_by TEXT REFERENCES users(id),
  last_login_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_status ON users(status, created_at DESC);
CREATE UNIQUE INDEX idx_single_admin ON users(role) WHERE role = 'ADMIN';

CREATE TABLE auth_sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL UNIQUE,
  expires_at TEXT NOT NULL,
  last_seen_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  revoked_at TEXT
);

CREATE INDEX idx_sessions_user ON auth_sessions(user_id, expires_at);
CREATE INDEX idx_sessions_token ON auth_sessions(token_hash);

CREATE TABLE password_reset_codes (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  code_hash TEXT NOT NULL UNIQUE,
  expires_at TEXT NOT NULL,
  used_at TEXT,
  created_by TEXT NOT NULL REFERENCES users(id),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_reset_user ON password_reset_codes(user_id, expires_at);

CREATE TABLE progress_snapshots (
  user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  completed_json TEXT NOT NULL DEFAULT '{}',
  review_state_json TEXT NOT NULL DEFAULT '{}',
  speaking_state_json TEXT NOT NULL DEFAULT '{}',
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE progress_events (
  event_id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  payload_hash TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_progress_events_user ON progress_events(user_id, created_at DESC);

CREATE TABLE activity_sessions (
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  client_session_id TEXT NOT NULL,
  last_sequence INTEGER NOT NULL,
  last_seen_at TEXT NOT NULL,
  state TEXT NOT NULL CHECK (state IN ('active', 'idle', 'hidden')),
  PRIMARY KEY (user_id, client_session_id)
);

CREATE INDEX idx_activity_sessions_seen ON activity_sessions(user_id, last_seen_at DESC);

-- A bucket can only be counted once per user, even when several tabs/devices are open.
CREATE TABLE activity_buckets (
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  bucket_start TEXT NOT NULL,
  duration_seconds INTEGER NOT NULL DEFAULT 30 CHECK (duration_seconds BETWEEN 1 AND 30),
  client_session_id TEXT,
  client_sequence INTEGER,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, bucket_start)
);

CREATE INDEX idx_activity_user_time ON activity_buckets(user_id, bucket_start DESC);

CREATE TABLE learning_attempts (
  event_id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lesson_id TEXT NOT NULL,
  item_key TEXT,
  type TEXT NOT NULL CHECK (type IN ('QUIZ', 'SPEAKING', 'LISTENING', 'TYPING', 'REVIEW', 'LESSON')),
  result TEXT NOT NULL CHECK (result IN (
    'COMPLETED', 'CORRECT', 'INCORRECT', 'ALMOST', 'UNCERTAIN', 'TECHNICAL_ERROR', 'SKIPPED',
    'GOOD', 'RETRY', 'UNSCORABLE', 'REVIEW_PENDING'
  )),
  score REAL,
  max_score REAL,
  metadata_json TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_attempts_user_created ON learning_attempts(user_id, created_at DESC);

CREATE TABLE speech_daily_usage (
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  usage_day TEXT NOT NULL,
  requests INTEGER NOT NULL DEFAULT 0,
  audio_seconds INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (user_id, usage_day)
);

CREATE TABLE assignments (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_by TEXT NOT NULL REFERENCES users(id),
  kind TEXT NOT NULL DEFAULT 'EXTRA' CHECK (kind IN ('EXTRA', 'REQUIRED')),
  target_type TEXT NOT NULL CHECK (target_type IN ('LESSON', 'MODULE', 'EXERCISE', 'REVIEW')),
  target_id TEXT NOT NULL,
  title_nl TEXT NOT NULL,
  title_darija TEXT NOT NULL,
  instructions_nl TEXT,
  instructions_darija TEXT,
  success_criteria_json TEXT NOT NULL DEFAULT '{}',
  starts_at TEXT,
  due_at TEXT,
  status TEXT NOT NULL DEFAULT 'OPEN' CHECK (status IN ('OPEN', 'COMPLETED', 'EXEMPT', 'CANCELLED')),
  completed_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_assignments_user_status ON assignments(user_id, status, due_at);

CREATE TABLE audit_log (
  id TEXT PRIMARY KEY,
  actor_user_id TEXT REFERENCES users(id),
  action TEXT NOT NULL,
  target_type TEXT,
  target_id TEXT,
  metadata_json TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_created ON audit_log(created_at DESC);
CREATE INDEX idx_audit_actor ON audit_log(actor_user_id, created_at DESC);

CREATE TABLE auth_rate_limits (
  rate_key TEXT NOT NULL,
  window_start TEXT NOT NULL,
  attempts INTEGER NOT NULL DEFAULT 1,
  PRIMARY KEY (rate_key, window_start)
);
