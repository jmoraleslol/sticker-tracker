import { useState } from 'react'
import { SECTIONS, CONFEDERATION_ORDER } from '../data/stickers'

const FILTERS = ['All', 'Missing', 'Owned', 'Duplicates']

export default function AlbumView({ counts, updateCount }) {
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [expandedSections, setExpandedSections] = useState(new Set(['FWC']))

  const toggleSection = id => {
    setExpandedSections(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const filteredSections = SECTIONS
    .slice() // keep original order
    .sort((a, b) => {
      const oi = CONFEDERATION_ORDER.indexOf(a.confederation)
      const oj = CONFEDERATION_ORDER.indexOf(b.confederation)
      return oi - oj
    })
    .map(section => {
      const q = search.toLowerCase()
      const sectionMatches = search && (
        section.name.toLowerCase().includes(q) ||
        section.id.toLowerCase().includes(q)
      )
      const stickers = section.stickers.filter(s => {
        const c = counts[s.code] ?? 0
        if (filter === 'Missing'    && c > 0)  return false
        if (filter === 'Owned'      && c < 1)  return false
        if (filter === 'Duplicates' && c < 2)  return false
        if (search) {
          return sectionMatches || s.code.toLowerCase().includes(q)
        }
        return true
      })
      return { ...section, stickers }
    })
    .filter(s => s.stickers.length > 0)

  return (
    <div>
      {/* Sticky filter bar */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-3 py-2 space-y-2">
        <input
          type="search"
          placeholder="Search country or sticker code (e.g. RSA, ARG3)…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-panini-blue"
        />
        <div className="flex gap-2 overflow-x-auto pb-0.5 scrollbar-none">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                filter === f
                  ? 'bg-panini-blue text-white'
                  : 'bg-gray-100 text-gray-600'
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
          const sectionOwned = section.stickers.filter(s => (counts[s.code] ?? 0) >= 1).length
          const isOpen = search ? true : expandedSections.has(section.id)

          return (
            <div key={section.id}>
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-xl shrink-0">{section.flag}</span>
                  <span className="font-semibold text-sm text-gray-800 truncate">{section.name}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-2">
                  <span className="text-xs text-gray-500">
                    {sectionOwned}/{section.stickers.length}
                  </span>
                  <span className="text-gray-400 text-xs">{isOpen ? '▲' : '▼'}</span>
                </div>
              </button>

              {isOpen && (
                <div className="grid grid-cols-5 gap-1.5 p-3 bg-white">
                  {section.stickers.map(sticker => (
                    <StickerCard
                      key={sticker.code}
                      sticker={sticker}
                      count={counts[sticker.code] ?? 0}
                      onAdd={() => updateCount(sticker.code, 1)}
                      onRemove={() => updateCount(sticker.code, -1)}
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

function StickerCard({ sticker, count, onAdd, onRemove }) {
  const bg =
    count === 0 ? 'bg-gray-100 text-gray-400 border-gray-200' :
    count === 1 ? 'bg-green-50 text-green-700 border-green-300' :
                  'bg-amber-50 text-amber-700 border-amber-300'

  return (
    <div className={`relative rounded-lg border aspect-square select-none ${bg}`}>
      {/* Main tap area — adds one */}
      <button
        onClick={onAdd}
        className="absolute inset-0 flex items-center justify-center active:scale-95 transition-all rounded-lg"
      >
        {sticker.foil && count >= 1 && (
          <span className="absolute top-0.5 right-0.5 text-[8px]">✨</span>
        )}
        <span className="text-[9px] font-bold leading-tight text-center px-0.5">{sticker.code}</span>
        {count > 1 && (
          <span className="absolute top-0.5 left-0.5 bg-amber-500 text-white text-[8px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
            {count}
          </span>
        )}
      </button>

      {/* Minus button — visible when owned */}
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
