// src/components/NotificationBanner.tsx
import type { WarrantyWithStatus } from '../types'

interface Props {
  warranties: WarrantyWithStatus[]
}

export default function NotificationBanner({ warranties }: Props) {
  const expiringSoon = warranties.filter(w => w.status === 'expiring_soon')
  const expired = warranties.filter(w => w.status === 'expired')

  if (expiringSoon.length === 0 && expired.length === 0) return null

  return (
    <div className="space-y-2 mb-5">
      {expiringSoon.length > 0 && (
        <div className="flex items-start gap-3 bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 text-sm text-orange-700">
          <svg className="flex-shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
          </svg>
          <span>
            <strong>{expiringSoon.length} garantie{expiringSoon.length > 1 ? 's' : ''} expire{expiringSoon.length > 1 ? 'nt' : ''} bientôt :</strong>{' '}
            {expiringSoon.map(w => w.name).join(', ')}
          </span>
        </div>
      )}
      {expired.length > 0 && (
        <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
          <svg className="flex-shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/>
            <path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          <span>
            <strong>{expired.length} garantie{expired.length > 1 ? 's' : ''} expirée{expired.length > 1 ? 's' : ''} :</strong>{' '}
            {expired.map(w => w.name).join(', ')}
          </span>
        </div>
      )}
    </div>
  )
}
