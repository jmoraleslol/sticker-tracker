# ⚽ Panini WC 2026 Sticker Tracker

Family sticker tracker for the Panini FIFA World Cup 2026 album (980 stickers).
Shared real-time database — all 5 family members always see the same state.

## Features

- **Dashboard** — progress bars by confederation, duplicate count, completion %
- **Album** — browse all 980 stickers by team, tap to collect, tap again for duplicates
- **Duplicates** — list every extra sticker with +/− controls
- **Trades** — log stickers given away or received, with person name and notes
- **Real-time sync** — any update is reflected instantly on all devices

---

## Setup (one-time, ~10 minutes)

### 1. Create a free Supabase project

1. Go to [supabase.com](https://supabase.com) and sign up (free)
2. Click **New project**, give it a name like `sticker-tracker`
3. Wait ~1 minute for it to provision

### 2. Run the database schema

1. In your Supabase project, go to **SQL Editor** → **New query**
2. Copy the contents of [`supabase-schema.sql`](./supabase-schema.sql) and paste it
3. Click **Run**

### 3. Enable Realtime

1. Go to **Database → Replication** (or **Realtime → Tables**)
2. Enable Realtime for the `collection` and `trades` tables

### 4. Get your API keys

In Supabase: **Project Settings → API**
- Copy **Project URL** (looks like `https://xxxx.supabase.co`)
- Copy **anon public** key

### 5. Deploy to Netlify

1. Push this folder to a GitHub repository
2. Go to [netlify.com](https://netlify.com), click **Add new site → Import from Git**
3. Select your repo
4. In **Environment variables**, add:
   - `VITE_SUPABASE_URL` = your Project URL
   - `VITE_SUPABASE_ANON_KEY` = your anon key
5. Build settings are auto-detected from `netlify.toml`
6. Click **Deploy** — done!

Share the Netlify URL with all family members. Bookmark it on the home screen for an app-like experience.

---

## Local development

```bash
cp .env.example .env
# Fill in your Supabase URL and key in .env

npm install
npm run dev
```

---

## How to use

| Action | How |
|--------|-----|
| Mark a sticker as collected | Tap it in Album view (turns green) |
| Add a duplicate | Tap again — badge shows count |
| Remove a sticker / reduce count | Long-press (hold 0.5s) |
| See all your extras | Go to Duplicates tab |
| Log a trade | Go to Trades → + Log Trade |
| Filter by Missing / Owned / Extras | Use filter bar in Album |

---

## Sticker structure

| Section | Stickers | Notes |
|---------|----------|-------|
| FWC Intro & History | FWC1–FWC20 | 20 stickers incl. foils |
| 48 Teams × 20 stickers | e.g. ARG1–ARG20 | Sticker 1 = badge (foil), 2 = team photo, 3–20 = players |
| **Total** | **980** | |

> **Note:** The team list is based on the official Panini WC 2026 album as of May 2026.
> If any team codes or names differ from your physical album, edit `src/data/stickers.js`.
