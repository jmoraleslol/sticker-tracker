import { useState } from 'react'
import { SECTIONS } from '../data/stickers'

const stickerMeta = {}
SECTIONS.forEach(sec => sec.stickers.forEach(s => { stickerMeta[s.code] = { ...s, sectionName: sec.name, flag: sec.flag } }))

export default function DuplicatesView({ counts, updateCount, duplicateStickers }) {
  const [sort, setSort] = useState('most')

  const sorted = [...duplicateStickers].sort((a, b) => {
    const ca = counts[a.code] - 1
    const cb = counts[b.code] - 1
    return sort === 'most' ? cb - ca : ca - cb
  })

  const totalDupes = sorted.reduce((sum, s) => sum + (counts[s.code] - 1), 0)

  return (
    <div>
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
        <div>
          <p className="font-semibold text-gray-800">Duplicate Stickers</p>
          <p className="text-xs text-gray-500">{sorted.length} types · {totalDupes} total extras</p>
        </div>
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white"
        >
          <option value="most">Most first</option>
          <option value="least">Fewest first</option>
        </select>
      </div>

      {sorted.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">🎉</p>
          <p className="font-semibold text-gray-600">No duplicates yet!</p>
          <p className="text-sm mt-1">When you have extras, they'll appear here.</p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-50">
          {sorted.map(sticker => {
            const meta = stickerMeta[sticker.code]
            const dupeCount = (counts[sticker.code] ?? 0) - 1
            return (
              <li key={sticker.code} className="flex items-center gap-3 px-4 py-3">
                <span className="text-2xl shrink-0">{meta?.flag ?? '🏳️'}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-gray-800">{sticker.code}</p>
                  <p className="text-xs text-gray-500 truncate">{sticker.name} · {meta?.sectionName}</p>
                  {sticker.foil && <span className="text-[10px] text-amber-500 font-medium">✨ FOIL</span>}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="bg-amber-100 text-amber-700 text-xs font-bold rounded-full px-2 py-0.5">
                    +{dupeCount} extra{dupeCount > 1 ? 's' : ''}
                  </span>
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => updateCount(sticker.code, -1)}
                      className="px-2.5 py-1.5 text-gray-600 hover:bg-gray-100 active:bg-gray-200 text-sm font-bold"
                    >
                      −
                    </button>
                    <span className="px-2 text-sm font-semibold text-gray-800 border-x border-gray-200">
                      {counts[sticker.code] ?? 0}
                    </span>
                    <button
                      onClick={() => updateCount(sticker.code, 1)}
                      className="px-2.5 py-1.5 text-gray-600 hover:bg-gray-100 active:bg-gray-200 text-sm font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
