PRAGMA foreign_keys = ON;

-- Alleen onzekere spreekpogingen worden tijdelijk bewaard. Na beoordeling of
-- uiterlijk na zeven dagen wordt de audio verwijderd.
CREATE TABLE speaking_reviews (
  event_id TEXT PRIMARY KEY REFERENCES learning_attempts(event_id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expected_text TEXT NOT NULL,
  transcript_text TEXT,
  audio_mime TEXT NOT NULL,
  audio_blob BLOB,
  duration_ms INTEGER NOT NULL CHECK (duration_ms BETWEEN 250 AND 30000),
  reason TEXT,
  status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'RETRY')),
  reviewed_by TEXT REFERENCES users(id),
  reviewed_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_speaking_reviews_status ON speaking_reviews(status, created_at DESC);
CREATE INDEX idx_speaking_reviews_user ON speaking_reviews(user_id, created_at DESC);
