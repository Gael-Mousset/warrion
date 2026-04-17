// src/utils/warrantyUtils.ts
import { addMonths, differenceInDays, parseISO, format } from 'date-fns'
import { fr } from 'date-fns/locale'
import type { Warranty, WarrantyWithStatus, WarrantyStatus } from '../types'

export function computeExpirationDate(purchaseDate: string, durationMonths: number): string {
  return format(addMonths(parseISO(purchaseDate), durationMonths), 'yyyy-MM-dd')
}

export function getDaysRemaining(expirationDate: string): number {
  return differenceInDays(parseISO(expirationDate), new Date())
}

export function getWarrantyStatus(daysRemaining: number): WarrantyStatus {
  if (daysRemaining < 0) return 'expired'
  if (daysRemaining <= 30) return 'expiring_soon'
  return 'active'
}

export function enrichWarranty(warranty: Warranty): WarrantyWithStatus {
  const expirationDate = computeExpirationDate(warranty.purchaseDate, warranty.warrantyDurationMonths)
  const daysRemaining = getDaysRemaining(expirationDate)
  const status = getWarrantyStatus(daysRemaining)
  return { ...warranty, expirationDate, daysRemaining, status }
}

export function formatTimeRemaining(days: number): string {
  if (days < 0) return 'Garantie expirée'
  if (days === 0) return "Expire aujourd'hui"
  if (days < 30) return `${days} jour${days > 1 ? 's' : ''} restant${days > 1 ? 's' : ''}`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months} mois restants`
  const years = Math.floor(months / 12)
  const rem = months % 12
  return rem > 0
    ? `${years} an${years > 1 ? 's' : ''} et ${rem} mois`
    : `${years} an${years > 1 ? 's' : ''}`
}

export function formatDate(dateStr: string): string {
  return format(parseISO(dateStr), 'd MMM yyyy', { locale: fr })
}

export const STATUS_STYLES: Record<WarrantyStatus, {
  badge: string
  card: string
  border: string
  text: string
  countdown: string
}> = {
  active: {
    badge: 'bg-green-100 text-green-700 border border-green-200',
    card: 'border-l-4 border-l-green-500',
    border: 'border-green-200',
    text: 'text-green-700',
    countdown: 'bg-green-50 border-green-200 text-green-700',
  },
  expiring_soon: {
    badge: 'bg-orange-100 text-orange-700 border border-orange-200',
    card: 'border-l-4 border-l-orange-400',
    border: 'border-orange-200',
    text: 'text-orange-600',
    countdown: 'bg-orange-50 border-orange-200 text-orange-600',
  },
  expired: {
    badge: 'bg-red-100 text-red-700 border border-red-200',
    card: 'border-l-4 border-l-red-500',
    border: 'border-red-200',
    text: 'text-red-700',
    countdown: 'bg-red-50 border-red-200 text-red-700',
  },
}

export const STATUS_LABELS: Record<WarrantyStatus, string> = {
  active: 'Actif',
  expiring_soon: 'Expire bientôt',
  expired: 'Expiré',
}

export const CATEGORY_PHOTOS: Record<string, string> = {
  electronique: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&q=80',
  electromenager: 'https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=600&q=80',
  informatique: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80',
  outillage: 'https://images.unsplash.com/photo-1581147036324-c17ac6a85dcf?w=600&q=80',
  mobilier: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
  autre: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
}
