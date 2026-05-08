-- Run this in your Supabase project SQL Editor
-- Dashboard → SQL Editor → New query → paste this → Run

-- Sticker collection: tracks how many copies of each sticker the family owns
CREATE TABLE IF NOT EXISTS collection (
  sticker_code  TEXT PRIMARY KEY,
  count         INTEGER NOT NULL DEFAULT 0 CHECK (count >= 0),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Trade log: records stickers given away or received
CREATE TABLE IF NOT EXISTS trades (
  id          SERIAL PRIMARY KEY,
  sticker_code TEXT NOT NULL,
  trade_type   TEXT NOT NULL CHECK (trade_type IN ('give', 'receive')),
  person       TEXT NOT NULL,
  notes        TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Realtime so all family members see updates instantly
ALTER TABLE collection REPLICA IDENTITY FULL;
ALTER TABLE trades     REPLICA IDENTITY FULL;

-- Enable Row Level Security with open read/write (no login required)
ALTER TABLE collection ENABLE ROW LEVEL SECURITY;
ALTER TABLE trades     ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read collection"  ON collection FOR SELECT USING (true);
CREATE POLICY "public write collection" ON collection FOR ALL    USING (true);

CREATE POLICY "public read trades"      ON trades FOR SELECT USING (true);
CREATE POLICY "public write trades"     ON trades FOR ALL    USING (true);
