PRAGMA foreign_keys = ON;

-- Gecontroleerde referentieopnames. Alleen een beheerder kan deze vervangen;
-- aangemelde leerlingen kunnen ze enkel beluisteren.
CREATE TABLE reference_audio (
  prompt_id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  locale TEXT NOT NULL,
  spoken_text TEXT NOT NULL,
  audio_mime TEXT NOT NULL,
  audio_blob BLOB NOT NULL,
  duration_ms INTEGER NOT NULL CHECK (duration_ms BETWEEN 300 AND 10000),
  size_bytes INTEGER NOT NULL CHECK (size_bytes BETWEEN 300 AND 750000),
  content_sha256 TEXT NOT NULL CHECK (length(content_sha256) = 64),
  consent_confirmed INTEGER NOT NULL DEFAULT 1 CHECK (consent_confirmed = 1),
  version INTEGER NOT NULL DEFAULT 1,
  uploaded_by TEXT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_reference_audio_category ON reference_audio(category, updated_at DESC);
