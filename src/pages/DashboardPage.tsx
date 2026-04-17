// src/pages/DashboardPage.tsx
import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useWarranties } from '../context/WarrantyContext'
import { enrichWarranty } from '../utils/warrantyUtils'
import WarrantyCard from '../components/WarrantyCard'
import NotificationBanner from '../components/NotificationBanner'
import type { WarrantyStatus } from '../types'

type Filter = 'all' | WarrantyStatus
type View = 'list' | 'grid'

export default function DashboardPage() {
  const { warranties } = useWarranties()
  const [filter, setFilter] = useState<Filter>('all')
  const [view, setView] = useState<View>('list')
  const [search, setSearch] = useState('')

  const enriched = useMemo(() => warranties.map(enrichWarranty), [warranties])

  const stats = useMemo(() => ({
    active: enriched.filter(w => w.status === 'active').length,
    expiring_soon: enriched.filter(w => w.status === 'expiring_soon').length,
    expired: enriched.filter(w => w.status === 'expired').length,
  }), [enriched])

  const filtered = useMemo(() => {
    let list = enriched
    if (filter !== 'all') list = list.filter(w => w.status === filter)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(w =>
        w.name.toLowerCase().includes(q) ||
        w.category.toLowerCase().includes(q)
      )
    }
    return list
  }, [enriched, filter, search])

  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: 'Tous' },
    { key: 'active', label: 'Actifs' },
    { key: 'expiring_soon', label: 'Expirent bientôt' },
    { key: 'expired', label: 'Expirés' },
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mes garanties</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            {warranties.length} objet{warranties.length > 1 ? 's' : ''} enregistré{warranties.length > 1 ? 's' : ''}
          </p>
        </div>
        <Link
          to="/add"
          className="flex items-center gap-2 bg-brand-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-brand-700 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
          Ajouter un objet
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: 'Actives', value: stats.active, color: 'text-green-600' },
          { label: 'Expirent bientôt', value: stats.expiring_soon, color: 'text-orange-500' },
          { label: 'Expirées', value: stats.expired, color: 'text-red-600' },
        ].map(s => (
          <div key={s.label} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">{s.label}</p>
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Notifications */}
      <NotificationBanner warranties={enriched} />

      {/* Filters + search + view */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Rechercher..."
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-100 transition-all flex-1 min-w-[140px]"
        />
        {filters.map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
              filter === f.key
                ? 'bg-brand-50 text-brand-600 border-brand-300'
                : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
            }`}
          >
            {f.label}
          </button>
        ))}
        <div className="ml-auto flex gap-1.5">
          {(['list', 'grid'] as View[]).map(v => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`w-9 h-9 flex items-center justify-center rounded-lg border transition-colors ${
                view === v
                  ? 'bg-brand-50 text-brand-600 border-brand-300'
                  : 'bg-white text-gray-400 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {v === 'list' ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2"/>
                  <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2"/>
                  <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2"/>
                  <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2"/>
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" stroke="#004AAD" strokeWidth="1.5"/>
              <circle cx="12" cy="12" r="2" stroke="#004AAD" strokeWidth="1.5"/>
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-1">Aucun objet trouvé</h3>
          <p className="text-sm mb-5">Ajoutez votre premier objet sous garantie.</p>
          <Link
            to="/add"
            className="inline-block bg-brand-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-brand-700 transition-colors"
          >
            Ajouter un objet
          </Link>
        </div>
      ) : (
        <div className={view === 'list' ? 'flex flex-col gap-2.5' : 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3'}>
          {filtered.map(w => (
            <WarrantyCard key={w.id} warranty={w} view={view} />
          ))}
        </div>
      )}
    </div>
  )
}
