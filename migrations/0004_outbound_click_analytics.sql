-- Privacy-preserving, daily aggregates for clicks that leave for a tool's site.
-- No visitor identifier, IP address, user agent, target URL, or cookie is stored.

CREATE TABLE IF NOT EXISTS outbound_click_daily (
  day             TEXT NOT NULL,
  tool_slug       TEXT NOT NULL,
  source_path     TEXT NOT NULL,
  clicks          INTEGER NOT NULL DEFAULT 0,
  last_clicked_at TEXT NOT NULL,
  PRIMARY KEY (day, tool_slug, source_path)
);

CREATE INDEX IF NOT EXISTS idx_outbound_click_daily_day
  ON outbound_click_daily(day DESC);
