import { SECTIONS, TOTAL, GROUPS } from '../data/stickers'

const GROUP_COLORS = {
  A: '#EF4444', B: '#F97316', C: '#EAB308', D: '#22C55E',
  E: '#14B8A6', F: '#3B82F6', G: '#8B5CF6', H: '#EC4899',
  I: '#F43F5E', J: '#10B981', K: '#6366F1', L: '#F59E0B',
}

export default function Dashboard({ counts, owned, totalDupes, blueOwned }) {
  const missing = TOTAL - owned
  const pct = TOTAL > 0 ? Math.round((owned / TOTAL) * 100) : 0

  // Progress per group
  const groupStats = GROUPS.map(g => {
    const sections = SECTIONS.filter(s => s.group === g)
    const total = sections.flatMap(s => s.stickers).length
    const got   = sections.flatMap(s => s.stickers).filter(s => (counts[s.code] ?? 0) >= 1).length
    const teams = sections.map(s => s.flag).join(' ')
    return { g, got, total, teams }
  })

  // FWC intro section
  const fwcSection = SECTIONS.find(s => s.id === 'FWC')
  const fwcGot   = fwcSection ? fwcSection.stickers.filter(s => (counts[s.code] ?? 0) >= 1).length : 0
  const fwcTotal = fwcSection ? fwcSection.stickers.length : 0

  return (
    <div className="p-4 space-y-4">
      {/* Top stat cards */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard value={owned}      label="Collected"  color="text-green-600" bg="bg-green-50"  />
        <StatCard value={missing}    label="Missing"    color="text-red-500"   bg="bg-red-50"    />
        <StatCard value={totalDupes} label="Duplicates" color="text-amber-600" bg="bg-amber-50"  />
      </div>

      {/* Overall ring */}
      <div className="bg-panini-blue rounded-2xl p-5 text-white text-center shadow-lg">
        <p className="text-sm text-blue-300 mb-1">Overall completion</p>
        <p className="text-6xl font-black text-panini-gold">{pct}%</p>
        <p className="text-blue-200 text-xs mt-1">{owned} of {TOTAL} stickers</p>
        <div className="mt-3 bg-blue-900 rounded-full h-2">
          <div className="bg-panini-gold h-2 rounded-full transition-all" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Blue collection summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-center justify-between">
        <div>
          <p className="font-semibold text-blue-800 text-sm">🔵 Blue Collection</p>
          <p className="text-blue-500 text-xs mt-0.5">Crumple parallels — tracked separately</p>
        </div>
        <div className="text-right">
          <p className="text-xl font-black text-blue-600">{blueOwned}</p>
          <p className="text-blue-400 text-xs">of {TOTAL}</p>
        </div>
      </div>

      {/* Progress by group */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Intro section */}
        <div className="px-4 pt-3 pb-2 border-b border-gray-100">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">🌍 Intro &amp; History</span>
            <span className="text-xs text-gray-500">{fwcGot}/{fwcTotal}</span>
          </div>
          <div className="bg-gray-100 rounded-full h-1.5">
            <div className="h-full rounded-full bg-indigo-500 transition-all"
              style={{ width: `${fwcTotal > 0 ? (fwcGot / fwcTotal) * 100 : 0}%` }} />
          </div>
        </div>

        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 pt-3 pb-1">
          Progress by Group
        </p>
        {groupStats.map(({ g, got, total, teams }) => {
          const p = total > 0 ? Math.round((got / total) * 100) : 0
          return (
            <div key={g} className="px-4 py-2 border-t border-gray-50">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-semibold text-gray-700">
                  Group {g} <span className="text-base">{teams}</span>
                </span>
                <span className="text-xs text-gray-500">{got}/{total}</span>
              </div>
              <div className="bg-gray-100 rounded-full h-1.5">
                <div className="h-full rounded-full transition-all"
                  style={{ width: `${p}%`, backgroundColor: GROUP_COLORS[g] }} />
              </div>
            </div>
          )
        })}
      </div>

      {owned === 0 && (
        <div className="bg-blue-50 rounded-xl p-4 text-center text-sm text-blue-700">
          <p className="font-semibold mb-1">Welcome! 🎉</p>
          <p>Go to <strong>Album</strong> and tap stickers as you collect them. Use the <strong>🔵 Blue</strong> tab for your blue crumple parallels.</p>
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
