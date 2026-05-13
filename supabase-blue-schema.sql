-- Run this in your Supabase project SQL Editor to add the Blue Sticker collection.
-- This does NOT touch your existing 'collection' or 'trades' tables.

CREATE TABLE IF NOT EXISTS blue_collection (
  sticker_code  TEXT PRIMARY KEY,
  count         INTEGER NOT NULL DEFAULT 0 CHECK (count >= 0),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE blue_collection REPLICA IDENTITY FULL;
ALTER TABLE blue_collection ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read blue"  ON blue_collection FOR SELECT USING (true);
CREATE POLICY "public write blue" ON blue_collection FOR ALL    USING (true);
