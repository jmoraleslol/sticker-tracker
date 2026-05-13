const TABS = [
  { id: 'dashboard',  label: 'Stats',  icon: '📊' },
  { id: 'album',      label: 'Album',  icon: '📖' },
  { id: 'duplicates', label: 'Extras', icon: '🔁' },
  { id: 'trades',     label: 'Trades', icon: '🤝' },
  { id: 'blue',       label: 'Blue',   icon: '🔵' },
]

export default function BottomNav({ tab, setTab, totalDupes }) {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg bg-white border-t border-gray-200 h-nav safe-bottom z-30">
      <div className="flex h-16">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors relative ${
              tab === t.id ? 'text-panini-blue' : 'text-gray-400'
            }`}
          >
            <span className="text-xl leading-none">{t.icon}</span>
            <span className="text-[10px] font-medium">{t.label}</span>
            {t.id === 'duplicates' && totalDupes > 0 && (
              <span className="absolute top-1.5 right-1 bg-panini-red text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {totalDupes > 99 ? '99+' : totalDupes}
              </span>
            )}
            {tab === t.id && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-panini-blue rounded-full" />
            )}
          </button>
        ))}
      </div>
    </nav>
  )
}
