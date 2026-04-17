// src/components/WarrantyCard.tsx
import { useNavigate } from 'react-router-dom'
import type { WarrantyWithStatus } from '../types'
import { CATEGORY_LABELS } from '../types'
import { formatTimeRemaining, formatDate, STATUS_STYLES, STATUS_LABELS, CATEGORY_PHOTOS } from '../utils/warrantyUtils'

interface Props {
  warranty: WarrantyWithStatus
  view: 'list' | 'grid'
}

export default function WarrantyCard({ warranty: w, view }: Props) {
  const navigate = useNavigate()
  const s = STATUS_STYLES[w.status]
  const photo = w.photoUrl || CATEGORY_PHOTOS[w.category]

  if (view === 'list') {
    return (
      <div
        onClick={() => navigate(`/warranty/${w.id}`)}
        className={`bg-white rounded-xl border border-gray-100 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-150 ${s.card}`}
      >
        <div className="flex items-center gap-4 p-4">
          <img
            src={photo}
            alt={w.name}
            onError={(e) => { (e.target as HTMLImageElement).src = CATEGORY_PHOTOS.autre }}
            className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 truncate">{w.name}</p>
            <p className="text-sm text-gray-400 mt-0.5">
              {CATEGORY_LABELS[w.category]} · Acheté le {formatDate(w.purchaseDate)}
            </p>
            <span className={`inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${s.badge}`}>
              {STATUS_LABELS[w.status]}
            </span>
          </div>
          <div className="text-right flex-shrink-0">
            <p className={`font-bold text-sm ${s.text}`}>{formatTimeRemaining(w.daysRemaining)}</p>
            <p className="text-xs text-gray-400 mt-0.5">Fin : {formatDate(w.expirationDate)}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      onClick={() => navigate(`/warranty/${w.id}`)}
      className={`bg-white rounded-xl border border-gray-100 cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-150 overflow-hidden ${s.card}`}
    >
      <img
        src={photo}
        alt={w.name}
        onError={(e) => { (e.target as HTMLImageElement).src = CATEGORY_PHOTOS.autre }}
        className="w-full h-36 object-cover"
      />
      <div className="p-3">
        <p className="font-semibold text-gray-900 truncate text-sm">{w.name}</p>
        <p className="text-xs text-gray-400 mt-0.5">{CATEGORY_LABELS[w.category]}</p>
        <span className={`inline-block mt-2 px-2.5 py-0.5 rounded-full text-xs font-semibold ${s.badge}`}>
          {STATUS_LABELS[w.status]}
        </span>
        <div className="mt-2">
          <p className={`font-bold text-xs ${s.text}`}>{formatTimeRemaining(w.daysRemaining)}</p>
          <p className="text-xs text-gray-400">Fin : {formatDate(w.expirationDate)}</p>
        </div>
      </div>
    </div>
  )
}
