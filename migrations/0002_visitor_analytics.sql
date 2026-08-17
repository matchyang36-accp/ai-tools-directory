-- Privacy-conscious first-party visitor sessions for the admin dashboard.
-- Full IP addresses and raw user-agent strings are intentionally not stored.

CREATE TABLE IF NOT EXISTS visitor_sessions (
  visitor_id    TEXT PRIMARY KEY,
  ip_masked     TEXT NOT NULL,
  country       TEXT NOT NULL DEFAULT '',
  region        TEXT NOT NULL DEFAULT '',
  city          TEXT NOT NULL DEFAULT '',
  first_path    TEXT NOT NULL,
  referrer_host TEXT NOT NULL DEFAULT '',
  device_type   TEXT NOT NULL DEFAULT 'Unknown',
  first_seen    TEXT NOT NULL,
  last_seen     TEXT NOT NULL,
  page_views    INTEGER NOT NULL DEFAULT 1
);

CREATE INDEX IF NOT EXISTS idx_visitor_sessions_last_seen
  ON visitor_sessions(last_seen DESC);
