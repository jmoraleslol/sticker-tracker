import { useState, useEffect, useCallback } from 'react'
import { supabase } from './supabase'
import { ALL_STICKERS, TOTAL } from './data/stickers'
import Dashboard from './components/Dashboard'
import AlbumView from './components/AlbumView'
import DuplicatesView from './components/DuplicatesView'
import TradeView from './components/TradeView'
import BlueView from './components/BlueView'
import BottomNav from './components/BottomNav'

async function loadTable(table) {
  const { data, error } = await supabase.from(table).select('sticker_code, count')
  if (error) throw error
  const map = {}
  data.forEach(row => { map[row.sticker_code] = row.count })
  return map
}

async function saveCount(table, code, next) {
  if (next === 0) {
    await supabase.from(table).delete().eq('sticker_code', code)
  } else {
    await supabase.from(table).upsert(
      { sticker_code: code, count: next, updated_at: new Date().toISOString() },
      { onConflict: 'sticker_code' }
    )
  }
}

export default function App() {
  const [tab, setTab] = useState('dashboard')
  const [counts, setCounts]         = useState({})  // main collection
  const [blueCounts, setBlueCounts] = useState({})  // blue crumple parallels
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  // ── Initial load ──────────────────────────────────────────────────
  useEffect(() => {
    Promise.all([loadTable('collection'), loadTable('blue_collection')])
      .then(([main, blue]) => { setCounts(main); setBlueCounts(blue); setLoading(false) })
      .catch(e => setError(e.message))
  }, [])

  // ── Real-time subscriptions ───────────────────────────────────────
  useEffect(() => {
    const apply = (setter) => (payload) => {
      setter(prev => {
        const next = { ...prev }
        if (payload.eventType === 'DELETE') delete next[payload.old.sticker_code]
        else next[payload.new.sticker_code] = payload.new.count
        return next
      })
    }

    const mainCh = supabase.channel('main-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'collection' }, apply(setCounts))
      .subscribe()

    const blueCh = supabase.channel('blue-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'blue_collection' }, apply(setBlueCounts))
      .subscribe()

    return () => { supabase.removeChannel(mainCh); supabase.removeChannel(blueCh) }
  }, [])

  // ── Update helpers ────────────────────────────────────────────────
  const updateCount = useCallback(async (code, delta) => {
    const next = Math.max(0, (counts[code] ?? 0) + delta)
    setCounts(prev => ({ ...prev, [code]: next }))
    await saveCount('collection', code, next)
  }, [counts])

  const updateBlueCount = useCallback(async (code, delta) => {
    const next = Math.max(0, (blueCounts[code] ?? 0) + delta)
    setBlueCounts(prev => ({ ...prev, [code]: next }))
    await saveCount('blue_collection', code, next)
  }, [blueCounts])

  // ── Derived stats ─────────────────────────────────────────────────
  const owned      = Object.values(counts).filter(c => c >= 1).length
  const blueOwned  = Object.values(blueCounts).filter(c => c >= 1).length
  const dupStickers = ALL_STICKERS.filter(s => (counts[s.code] ?? 0) > 1)
  const totalDupes  = dupStickers.reduce((sum, s) => sum + (counts[s.code] - 1), 0)

  if (error) return (
    <div className="flex items-center justify-center min-h-screen p-6 text-center">
      <div>
        <p className="text-2xl mb-2">⚠️</p>
        <p className="font-semibold text-gray-800 mb-1">Connection error</p>
        <p className="text-sm text-gray-500 mb-4">{error}</p>
        <p className="text-xs text-gray-400">Check your Supabase environment variables.</p>
      </div>
    </div>
  )

  return (
    <div className="flex flex-col h-full max-w-lg mx-auto bg-white shadow-xl relative">
      {/* Header */}
      <header className="bg-panini-blue text-white px-4 sticky top-0 z-20 shadow-md">
        <div className="py-3 flex items-center justify-between">
          <div>
            <h1 className="font-bold text-lg leading-tight">⚽ WC 2026 Stickers</h1>
            <p className="text-blue-200 text-xs">{owned} / {TOTAL} collected</p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-panini-gold">
              {TOTAL > 0 ? Math.round((owned / TOTAL) * 100) : 0}%
            </span>
          </div>
        </div>
        <div className="h-1.5 bg-blue-900 rounded-full mb-3">
          <div
            className="h-full bg-panini-gold rounded-full transition-all duration-500"
            style={{ width: `${TOTAL > 0 ? (owned / TOTAL) * 100 : 0}%` }}
          />
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto pb-nav">
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="text-center">
              <div className="animate-spin text-3xl mb-2">⚽</div>
              <p className="text-gray-400 text-sm">Loading your collection…</p>
            </div>
          </div>
        ) : (
          <>
            {tab === 'dashboard'  && <Dashboard counts={counts} owned={owned} totalDupes={totalDupes} blueOwned={blueOwned} />}
            {tab === 'album'      && <AlbumView counts={counts} updateCount={updateCount} />}
            {tab === 'duplicates' && <DuplicatesView counts={counts} updateCount={updateCount} duplicateStickers={dupStickers} />}
            {tab === 'trades'     && <TradeView counts={counts} duplicateStickers={dupStickers} />}
            {tab === 'blue'       && <BlueView blueCounts={blueCounts} updateBlueCount={updateBlueCount} />}
          </>
        )}
      </main>

      <BottomNav tab={tab} setTab={setTab} totalDupes={totalDupes} />
    </div>
  )
}
