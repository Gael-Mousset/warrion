// src/pages/WarrantyDetailPage.tsx
import { useParams, useNavigate } from 'react-router-dom'
import { useWarranties } from '../context/WarrantyContext'
import { enrichWarranty, formatDate, formatTimeRemaining, STATUS_STYLES, STATUS_LABELS, CATEGORY_PHOTOS } from '../utils/warrantyUtils'
import { CATEGORY_LABELS } from '../types'

export default function WarrantyDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { getWarranty, deleteWarranty } = useWarranties()

  const raw = id ? getWarranty(id) : undefined
  if (!raw) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-12 text-center text-gray-500">
        <p className="text-lg font-semibold mb-3">Objet introuvable</p>
        <button onClick={() => navigate('/dashboard')} className="text-brand-600 hover:underline text-sm">
          ← Retour au dashboard
        </button>
      </div>
    )
  }

  const w = enrichWarranty(raw)
  const s = STATUS_STYLES[w.status]
  const photo = w.photoUrl || CATEGORY_PHOTOS[w.category]

  const days = Math.abs(w.daysRemaining)
  const countValue = w.status === 'expired'
    ? '—'
    : days < 30
      ? String(days)
      : String(Math.floor(days / 30))
  const countUnit = w.status === 'expired'
    ? ''
    : days < 30 ? (days > 1 ? 'jours' : 'jour')
    : (Math.floor(days / 30) > 1 ? 'mois' : 'mois')

  const handleDelete = () => {
    if (window.confirm(`Supprimer la garantie de "${w.name}" ?`)) {
      deleteWarranty(w.id)
      navigate('/dashboard')
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6">
      <button
        onClick={() => navigate('/dashboard')}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-600 font-medium mb-5 transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M19 12H5M5 12l7 7M5 12l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Retour au dashboard
      </button>

      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
        <img
          src={photo}
          alt={w.name}
          onError={(e) => { (e.target as HTMLImageElement).src = CATEGORY_PHOTOS.autre }}
          className="w-full h-56 object-cover"
        />

        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-1">
            <h1 className="text-2xl font-bold text-gray-900">{w.name}</h1>
            <span className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-semibold ${s.badge}`}>
              {STATUS_LABELS[w.status]}
            </span>
          </div>
          <p className="text-sm text-gray-400 mb-6">{CATEGORY_LABELS[w.category]}</p>

          {/* Countdown */}
          <div className={`border rounded-xl p-5 text-center mb-6 ${s.countdown}`}>
            <p className="text-xs font-semibold uppercase tracking-widest mb-2 opacity-70">Temps restant</p>
            {w.status === 'expired' ? (
              <p className="text-2xl font-bold">Garantie expirée</p>
            ) : (
              <p className="text-5xl font-bold leading-none">
                {countValue}
                <span className="text-2xl ml-2 font-semibold opacity-80">{countUnit}</span>
              </p>
            )}
            <p className="text-sm mt-2 opacity-75">
              {w.status === 'expired'
                ? `Expirée le ${formatDate(w.expirationDate)}`
                : w.status === 'expiring_soon'
                  ? `⚠️ Expire le ${formatDate(w.expirationDate)} — agissez vite !`
                  : `Expire le ${formatDate(w.expirationDate)}`}
            </p>
          </div>

          {/* Details grid */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            {[
              { label: "Date d'achat", value: formatDate(w.purchaseDate) },
              { label: 'Durée de garantie', value: `${w.warrantyDurationMonths} mois` },
              { label: "Date d'expiration", value: formatDate(w.expirationDate) },
              { label: 'Temps restant', value: formatTimeRemaining(w.daysRemaining) },
            ].map(f => (
              <div key={f.label} className="bg-gray-50 rounded-xl p-3.5">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">{f.label}</p>
                <p className="text-sm font-semibold text-gray-800">{f.value}</p>
              </div>
            ))}
          </div>

          {/* Notes */}
          {w.notes && (
            <div className="bg-gray-50 rounded-xl p-4 mb-5">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Notes</p>
              <p className="text-sm text-gray-600 leading-relaxed">{w.notes}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleDelete}
              className="flex items-center gap-1.5 text-sm text-red-600 bg-red-50 border border-red-200 hover:bg-red-100 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M3 6h18M8 6V4h8v2M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Supprimer
            </button>
            <button
              onClick={() => navigate(`/warranty/${w.id}/edit`)}
              className="flex items-center gap-1.5 text-sm text-brand-600 bg-brand-50 border border-brand-200 hover:bg-brand-100 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Modifier
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="text-sm text-gray-500 bg-gray-50 border border-gray-200 hover:bg-gray-100 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Retour
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
