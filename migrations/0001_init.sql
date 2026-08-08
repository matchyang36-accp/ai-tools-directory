-- Initial schema for the AI tools directory.
-- Run with: wrangler d1 migrations apply ai-tools-directory --local
--           wrangler d1 migrations apply ai-tools-directory --remote

CREATE TABLE IF NOT EXISTS categories (
  slug       TEXT PRIMARY KEY,
  name       TEXT NOT NULL,
  tagline    TEXT NOT NULL,
  description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS tools (
  slug       TEXT PRIMARY KEY,
  name       TEXT NOT NULL,
  category   TEXT NOT NULL,
  tagline    TEXT NOT NULL,
  description TEXT NOT NULL,
  pricing    TEXT NOT NULL,
  rating     REAL NOT NULL DEFAULT 0,
  pros       TEXT NOT NULL DEFAULT '[]',
  cons       TEXT NOT NULL DEFAULT '[]',
  website    TEXT NOT NULL,
  featured   INTEGER NOT NULL DEFAULT 0,
  bestFor    TEXT NOT NULL DEFAULT ''
);
CREATE INDEX IF NOT EXISTS idx_tools_category ON tools(category);

CREATE TABLE IF NOT EXISTS reviews (
  slug     TEXT PRIMARY KEY,
  title    TEXT NOT NULL,
  excerpt  TEXT NOT NULL,
  readMins INTEGER NOT NULL DEFAULT 0,
  toolSlug TEXT,
  date     TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS comparisons (
  slug  TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  a     TEXT NOT NULL,
  b     TEXT NOT NULL
);
