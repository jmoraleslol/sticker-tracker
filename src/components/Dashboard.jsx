import { SECTIONS, TOTAL, CONFEDERATION_ORDER } from '../data/stickers'

export default function Dashboard({ counts, owned, totalDupes }) {
  const missing = TOTAL - owned
  const pct = TOTAL > 0 ? Math.round((owned / TOTAL) * 100) : 0

  // Stats per confederation
  const confStats = CONFEDERATION_ORDER.map(conf => {
    const sections = SECTIONS.filter(s => s.confederation === conf)
    const total = sections.flatMap(s => s.stickers).length
    const got = sections.flatMap(s => s.stickers).filter(st => (counts[st.code] ?? 0) >= 1).length
    return { conf, got, total }
  }).filter(c => c.total > 0)

  // Recently added (last updated) – approximate via local date not available, show random instead
  const ownedList = Object.entries(counts).filter(([, c]) => c >= 1)

  return (
    <div className="p-4 space-y-4">
      {/* Big stats */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard value={owned}      label="Collected"  color="text-green-600"  bg="bg-green-50"  />
        <StatCard value={missing}    label="Missing"    color="text-red-500"    bg="bg-red-50"    />
        <StatCard value={totalDupes} label="Duplicates" color="text-amber-600"  bg="bg-amber-50"  />
      </div>

      {/* Completion ring */}
      <div className="bg-panini-blue rounded-2xl p-5 text-white text-center shadow-lg">
        <p className="text-sm text-blue-300 mb-1">Overall completion</p>
        <p className="text-6xl font-black text-panini-gold">{pct}%</p>
        <p className="text-blue-200 text-xs mt-1">{owned} of {TOTAL} stickers</p>
        <div className="mt-3 bg-blue-900 rounded-full h-2">
          <div
            className="bg-panini-gold h-2 rounded-full transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Per-confederation */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 pt-3 pb-2">
          Progress by Confederation
        </p>
        {confStats.map(({ conf, got, total }) => {
          const p = total > 0 ? Math.round((got / total) * 100) : 0
          const label = conf === 'INTRO' ? 'Intro / History' : conf
          return (
            <div key={conf} className="px-4 py-2 border-t border-gray-50">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">{label}</span>
                <span className="text-xs text-gray-500">{got}/{total}</span>
              </div>
              <div className="bg-gray-100 rounded-full h-1.5">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${p}%`,
                    backgroundColor: CONF_COLORS[conf] ?? '#6B7280',
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Tip */}
      {owned === 0 && (
        <div className="bg-blue-50 rounded-xl p-4 text-center text-sm text-blue-700">
          <p className="font-semibold mb-1">Welcome to your sticker tracker! 🎉</p>
          <p>Head to <strong>Album</strong> to start marking your stickers. Tap once to collect, tap again to add a duplicate.</p>
        </div>
      )}
    </div>
  )
}

function StatCard({ value, label, color, bg }) {
  return (
    <div className={`${bg} rounded-xl p-3 text-center`}>
      <p className={`text-2xl font-black ${color}`}>{value}</p>
      <p className="text-xs text-gray-500 mt-0.5">{label}</p>
    </div>
  )
}

const CONF_COLORS = {
  INTRO:    '#6366F1',
  CONCACAF: '#10B981',
  CONMEBOL: '#3B82F6',
  UEFA:     '#8B5CF6',
  CAF:      '#F59E0B',
  AFC:      '#EF4444',
  OFC:      '#06B6D4',
}
