import { useState } from 'react'
import { SECTIONS, TOTAL } from '../data/stickers'

const FILTERS = ['All', 'Missing', 'Owned', 'Duplicates']

function downloadText(filename, text) {
  const a = document.createElement('a')
  a.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
  a.download = filename
  a.click()
}

function exportBlueMissing(blueCounts) {
  const lines = []
  let totalMissing = 0
  for (const section of SECTIONS) {
    const ms = section.stickers.filter(s => (blueCounts[s.code] ?? 0) === 0)
    if (ms.length === 0) continue
    const label = section.group ? `Group ${section.group} – ${section.name}` : section.name
    lines.push(`--- ${label} ---`)
    lines.push(ms.map(s => s.code).join('  '))
    lines.push('')
    totalMissing += ms.length
  }
  const header = [
    'MISSING BLUE STICKERS – Panini FIFA World Cup 2026',
    `Generated: ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`,
    `Total missing: ${totalMissing} of ${TOTAL}`,
    '',
  ]
  downloadText('missing-blue-stickers.txt', [...header, ...lines].join('\n'))
}

function exportBlueDuplicates(blueCounts) {
  const lines = []
  let totalDupes = 0
  for (const section of SECTIONS) {
    const dupes = section.stickers.filter(s => (blueCounts[s.code] ?? 0) > 1)
    if (dupes.length === 0) continue
    const label = section.group ? `Group ${section.group} – ${section.name}` : section.name
    lines.push(`--- ${label} ---`)
    lines.push(dupes.map(s => `${s.code} (×${(blueCounts[s.code] ?? 0) - 1})`).join('  '))
    lines.push('')
    totalDupes += dupes.reduce((sum, s) => sum + ((blueCounts[s.code] ?? 0) - 1), 0)
  }
  const header = [
    'DUPLICATE BLUE STICKERS – Panini FIFA World Cup 2026',
    `Generated: ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`,
    `Total duplicates: ${totalDupes}`,
    '',
  ]
  downloadText('duplicate-blue-stickers.txt', [...header, ...lines].join('\n'))
}

export default function BlueView({ blueCounts, updateBlueCount }) {
  const [filter, setFilter]   = useState('All')
  const [search, setSearch]   = useState('')
  const [expanded, setExpanded] = useState(new Set(['FWC']))

  const toggleSection = id => {
    setExpanded(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const owned = Object.values(blueCounts).filter(c => c >= 1).length
  const dupes = Object.values(blueCounts).filter(c => c > 1).reduce((s, c) => s + c - 1, 0)

  const filteredSections = SECTIONS.map(section => {
    const q = search.toLowerCase()
    const sectionMatches = search && (
      section.name.toLowerCase().includes(q) ||
      section.id.toLowerCase().includes(q)
    )
    const stickers = section.stickers.filter(s => {
      const c = blueCounts[s.code] ?? 0
      if (filter === 'Missing'    && c > 0)  return false
      if (filter === 'Owned'      && c < 1)  return false
      if (filter === 'Duplicates' && c < 2)  return false
      if (search) return sectionMatches || s.code.toLowerCase().includes(q)
      return true
    })
    return { ...section, stickers }
  }).filter(s => s.stickers.length > 0)

  let lastGroup = null

  return (
    <div>
      {/* Blue header banner */}
      <div className="bg-blue-600 text-white px-4 py-3">
        <p className="font-bold text-sm">🔵 Blue Crumple Parallels</p>
        <p className="text-blue-200 text-xs mt-0.5">
          Separate collection · {owned} / {TOTAL} owned · {dupes} duplicates
        </p>
        <p className="text-blue-300 text-[10px] mt-1">
          Blue stickers don't count toward the main album.
        </p>
      </div>

      {/* Export + filter bar */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-3 py-2 space-y-2">
        <div className="flex gap-2">
          <button
            onClick={() => exportBlueMissing(blueCounts)}
            className="flex-1 flex items-center justify-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-xl py-2 text-xs font-semibold active:bg-blue-100"
          >
            📥 Export Missing
          </button>
          <button
            onClick={() => exportBlueDuplicates(blueCounts)}
            className="flex-1 flex items-center justify-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-xl py-2 text-xs font-semibold active:bg-blue-100"
          >
            📥 Export Duplicates
          </button>
        </div>
        <input
          type="search"
          placeholder="Search country or sticker code…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
        />
        <div className="flex gap-2 overflow-x-auto pb-0.5">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                filter === f ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Sections */}
      <div className="divide-y divide-gray-100">
        {filteredSections.map(section => {
          const sectionOwned = section.stickers.filter(s => (blueCounts[s.code] ?? 0) >= 1).length
          const isOpen = search ? true : expanded.has(section.id)
          const showGroupHeader = section.group && section.group !== lastGroup
          if (section.group) lastGroup = section.group

          return (
            <div key={section.id}>
              {showGroupHeader && (
                <div className="bg-blue-600 text-white px-4 py-1.5">
                  <span className="text-xs font-black tracking-widest uppercase">Group {section.group}</span>
                </div>
              )}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-xl shrink-0">{section.flag}</span>
                  <span className="font-semibold text-sm text-gray-800 truncate">{section.name}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-2">
                  <span className="text-xs text-gray-500">{sectionOwned}/{section.stickers.length}</span>
                  <span className="text-gray-400 text-xs">{isOpen ? '▲' : '▼'}</span>
                </div>
              </button>

              {isOpen && (
                <div className="grid grid-cols-5 gap-1.5 p-3 bg-white">
                  {section.stickers.map(sticker => (
                    <BlueStickerCard
                      key={sticker.code}
                      sticker={sticker}
                      count={blueCounts[sticker.code] ?? 0}
                      onAdd={() => updateBlueCount(sticker.code, 1)}
                      onRemove={() => updateBlueCount(sticker.code, -1)}
                    />
                  ))}
                </div>
              )}
            </div>
          )
        })}

        {filteredSections.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p className="text-3xl mb-2">🔍</p>
            <p className="text-sm">No stickers match your filter.</p>
          </div>
        )}
      </div>
    </div>
  )
}

function BlueStickerCard({ sticker, count, onAdd, onRemove }) {
  const bg =
    count === 0 ? 'bg-gray-100 text-gray-400 border-gray-200' :
    count === 1 ? 'bg-blue-50 text-blue-700 border-blue-300' :
                  'bg-blue-100 text-blue-800 border-blue-400'

  return (
    <div className={`relative rounded-lg border aspect-square select-none ${bg}`}>
      <button
        onClick={onAdd}
        className="absolute inset-0 flex items-center justify-center active:scale-95 transition-all rounded-lg"
      >
        {sticker.foil && count >= 1 && (
          <span className="absolute top-0.5 right-0.5 text-[8px]">✨</span>
        )}
        <span className="text-[9px] font-bold leading-tight text-center px-0.5">{sticker.code}</span>
        {count > 1 && (
          <span className="absolute top-0.5 left-0.5 bg-blue-500 text-white text-[8px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
            {count}
          </span>
        )}
      </button>
      {count > 0 && (
        <button
          onClick={e => { e.stopPropagation(); onRemove() }}
          className="absolute bottom-0 right-0 w-4 h-4 bg-red-400 hover:bg-red-500 text-white rounded-tl-md rounded-br-md flex items-center justify-center text-[10px] font-bold leading-none active:bg-red-600"
          aria-label="Remove one"
        >
          −
        </button>
      )}
    </div>
  )
}
