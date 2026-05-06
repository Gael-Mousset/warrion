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

export const CATEGORY_BRANDS: Record<string, string[]> = {
  electromenager: ['Samsung', 'LG', 'Bosch', 'Siemens', 'Miele', 'Whirlpool', 'Electrolux', 'Indesit', 'Candy', 'Beko', 'Hotpoint', 'AEG'],
  electronique:   ['Samsung', 'Sony', 'LG', 'Philips', 'Panasonic', 'Apple', 'Bose', 'JBL', 'Xiaomi', 'Hisense', 'TCL'],
  informatique:   ['Apple', 'Dell', 'HP', 'Lenovo', 'Asus', 'Acer', 'MSI', 'Microsoft', 'Samsung', 'Razer', 'Huawei'],
  vehicule:       ['Renault', 'Peugeot', 'Citroën', 'Volkswagen', 'Toyota', 'BMW', 'Mercedes', 'Ford', 'Opel', 'Dacia', 'Tesla', 'Kia', 'Hyundai', 'Audi', 'Yamaha', 'Honda', 'Kawasaki'],
  jardinage:      ['Husqvarna', 'Bosch', 'Stihl', 'Gardena', 'Makita', 'Black+Decker', 'Ryobi', 'Einhell', 'Honda', 'Viking'],
  musique:        ['Yamaha', 'Roland', 'Fender', 'Gibson', 'Marshall', 'Casio', 'Korg', 'Boss', 'Shure', 'Sennheiser', 'AKG', 'Steinway'],
  bijoux:         ['Cartier', 'Swarovski', 'Pandora', 'Fossil', 'Seiko', 'Citizen', 'Casio', 'Longines', 'TAG Heuer', 'Tissot', 'Daniel Wellington', 'Cluse'],
  sport:          ['Decathlon', 'Nike', 'Adidas', 'Puma', 'Salomon', 'Rossignol', 'Speedo', 'Shimano', 'Trek', 'Head', 'Wilson', 'Babolat'],
  habitat:        ['Daikin', 'Mitsubishi', 'Atlantic', 'De Dietrich', 'Viessmann', 'Velux', 'Aldes', 'Panasonic', 'Hitachi', 'Vaillant', 'Buderus'],
  outillage:      ['Bosch', 'DeWalt', 'Makita', 'Milwaukee', 'Stanley', 'Black+Decker', 'Ryobi', 'Festool', 'Hilti', 'Metabo', 'Würth', 'Facom'],
  mobilier:       ['IKEA', 'Conforama', 'But', 'Maisons du Monde', 'Habitat', 'Roche Bobois', 'Fly', 'La Redoute'],
  autre:          [],
}

export const CATEGORY_STORES: Record<string, string[]> = {
  electromenager: ['Darty', 'Boulanger', 'Fnac', 'Conforama', 'But', 'Electro Dépôt', 'Leclerc', 'Amazon', 'Cdiscount'],
  electronique:   ['Fnac', 'Darty', 'Boulanger', 'Amazon', 'Cdiscount', 'Leclerc'],
  informatique:   ['Fnac', 'Darty', 'Boulanger', 'LDLC', 'TopAchat', 'Amazon', 'Cdiscount', 'Apple Store'],
  vehicule:       ['Concessionnaire Renault', 'Concessionnaire Peugeot', 'Concessionnaire Citroën', 'LeBonCoin', 'AutoScout24', 'L\'Argus', 'Moto Axxe'],
  jardinage:      ['Leroy Merlin', 'Castorama', 'Bricorama', 'Brico Dépôt', 'Weldom', 'Point Vert', 'Amazon'],
  musique:        ['Woodbrass', 'Thomann', 'Bax Music', 'Fnac', 'Amazon', 'Cultura', 'Music & Sound'],
  bijoux:         ['Histoire d\'Or', 'Marc Orian', 'Maty', 'Bijouterie Chaumet', 'Amazon', 'La Redoute'],
  sport:          ['Decathlon', 'Go Sport', 'Intersport', 'Sport 2000', 'Amazon', 'Alltricks', 'Ekosport'],
  habitat:        ['Leroy Merlin', 'Castorama', 'Brico Dépôt', 'Bricorama', 'Installateur local', 'Saint-Gobain'],
  outillage:      ['Leroy Merlin', 'Castorama', 'Brico Dépôt', 'Amazon', 'Würth', 'Outillage Online', 'Point P'],
  mobilier:       ['IKEA', 'Conforama', 'But', 'Maisons du Monde', 'Amazon', 'Cdiscount', 'La Redoute', 'Fly'],
  autre:          ['Amazon', 'Fnac', 'Darty', 'Cdiscount', 'Leboncoin', 'Vinted'],
}

export const CATEGORY_PHOTOS: Record<string, string> = {
  electromenager: 'https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=600&q=80',
  electronique:   'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&q=80',
  informatique:   'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80',
  vehicule:       'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80',
  jardinage:      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80',
  musique:        'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600&q=80',
  bijoux:         'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80',
  sport:          'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80',
  habitat:        'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80',
  outillage:      'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&q=80',
  mobilier:       'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
  autre:          'https://images.unsplash.com/photo-1553481187-be93c21490a9?w=600&q=80',
}
