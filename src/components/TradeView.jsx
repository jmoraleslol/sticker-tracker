import { useState, useEffect } from 'react'
import { supabase } from '../supabase'
import { SECTIONS } from '../data/stickers'

const stickerMeta = {}
SECTIONS.forEach(sec => sec.stickers.forEach(s => { stickerMeta[s.code] = { ...s, sectionName: sec.name, flag: sec.flag } }))

export default function TradeView({ counts, duplicateStickers }) {
  const [trades, setTrades] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ sticker_code: '', person: '', type: 'give', notes: '' })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    loadTrades()
    const channel = supabase
      .channel('trade-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'trades' }, loadTrades)
      .subscribe()
    return () => supabase.removeChannel(channel)
  }, [])

  async function loadTrades() {
    const { data } = await supabase
      .from('trades')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100)
    if (data) setTrades(data)
    setLoading(false)
  }

  async function submitTrade(e) {
    e.preventDefault()
    if (!form.sticker_code || !form.person) return
    setSubmitting(true)
    await supabase.from('trades').insert({
      sticker_code: form.sticker_code.toUpperCase(),
      person: form.person,
      trade_type: form.type,
      notes: form.notes || null,
    })
    setForm({ sticker_code: '', person: '', type: 'give', notes: '' })
    setShowForm(false)
    setSubmitting(false)
  }

  async function deleteTrade(id) {
    await supabase.from('trades').delete().eq('id', id)
  }

  const giveCount = trades.filter(t => t.trade_type === 'give').length
  const receiveCount = trades.filter(t => t.trade_type === 'receive').length

  return (
    <div>
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
        <div>
          <p className="font-semibold text-gray-800">Trade Log</p>
          <p className="text-xs text-gray-500">Gave {giveCount} · Received {receiveCount}</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-panini-blue text-white text-sm font-semibold px-3 py-1.5 rounded-lg active:opacity-80"
        >
          + Log Trade
        </button>
      </div>

      {/* Trade form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-end" onClick={() => setShowForm(false)}>
          <div className="w-full max-w-lg mx-auto bg-white rounded-t-2xl p-5 shadow-xl" onClick={e => e.stopPropagation()}>
            <h2 className="font-bold text-gray-800 mb-4">Log a Trade</h2>
            <form onSubmit={submitTrade} className="space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Sticker Code</label>
                <input
                  required
                  list="dupe-codes"
                  placeholder="e.g. ARG1, FWC5…"
                  value={form.sticker_code}
                  onChange={e => setForm(f => ({ ...f, sticker_code: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-panini-blue uppercase"
                />
                <datalist id="dupe-codes">
                  {duplicateStickers.map(s => <option key={s.code} value={s.code} />)}
                </datalist>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Trade type</label>
                <div className="flex gap-2">
                  {[['give', '📤 Giving away'], ['receive', '📥 Received']].map(([val, lbl]) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setForm(f => ({ ...f, type: val }))}
                      className={`flex-1 py-2 rounded-xl text-sm font-semibold border transition-colors ${
                        form.type === val ? 'bg-panini-blue text-white border-panini-blue' : 'border-gray-200 text-gray-600'
                      }`}
                    >
                      {lbl}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">With person</label>
                <input
                  required
                  placeholder="Name or nickname"
                  value={form.person}
                  onChange={e => setForm(f => ({ ...f, person: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-panini-blue"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Notes (optional)</label>
                <input
                  placeholder="e.g. at school, traded for BRA3"
                  value={form.notes}
                  onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-panini-blue"
                />
              </div>

              <div className="flex gap-2 pt-1">
                <button type="button" onClick={() => setShowForm(false)}
                  className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600">
                  Cancel
                </button>
                <button type="submit" disabled={submitting}
                  className="flex-1 py-3 rounded-xl bg-panini-blue text-white text-sm font-semibold disabled:opacity-60">
                  {submitting ? 'Saving…' : 'Log Trade'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Trade list */}
      {loading ? (
        <div className="text-center py-12 text-gray-400 text-sm">Loading trades…</div>
      ) : trades.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">🤝</p>
          <p className="font-semibold text-gray-600">No trades logged yet</p>
          <p className="text-sm mt-1">Use the button above to record a trade.</p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-50">
          {trades.map(trade => {
            const meta = stickerMeta[trade.sticker_code]
            const isGive = trade.trade_type === 'give'
            const date = new Date(trade.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
            return (
              <li key={trade.id} className="flex items-center gap-3 px-4 py-3">
                <span className="text-2xl shrink-0">{isGive ? '📤' : '📥'}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-gray-800">{trade.sticker_code}</span>
                    <span className="text-xs text-gray-400">{meta?.flag}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">
                    {isGive ? 'Gave to' : 'Got from'} <strong>{trade.person}</strong>
                    {trade.notes ? ` · ${trade.notes}` : ''}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{date}</p>
                </div>
                <button
                  onClick={() => deleteTrade(trade.id)}
                  className="text-gray-300 hover:text-red-400 transition-colors text-lg shrink-0"
                  aria-label="Delete trade"
                >
                  ×
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
