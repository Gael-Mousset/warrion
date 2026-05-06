// src/types/index.ts

export type WarrantyStatus = 'active' | 'expiring_soon' | 'expired'

export type Category =
  | 'electromenager'
  | 'electronique'
  | 'informatique'
  | 'vehicule'
  | 'jardinage'
  | 'musique'
  | 'bijoux'
  | 'sport'
  | 'habitat'
  | 'outillage'
  | 'mobilier'
  | 'autre'

export interface User {
  id: string
  email: string
  name: string
  password: string
  createdAt: string
}

export interface DocumentItem {
  name: string
  dataUrl: string
  type: string
}

export interface Warranty {
  id: string
  userId: string
  name: string
  category: Category
  purchaseDate: string
  warrantyDurationMonths: number
  brand?: string
  serialNumber?: string
  store?: string
  photoUrl?: string
  notes?: string
  isPrecious?: boolean
  documents?: DocumentItem[]
  createdAt: string
}

export interface WarrantyWithStatus extends Warranty {
  expirationDate: string
  status: WarrantyStatus
  daysRemaining: number
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

export const CATEGORY_LABELS: Record<Category, string> = {
  electromenager: 'Électroménager',
  electronique: 'Électronique',
  informatique: 'Informatique',
  vehicule: 'Véhicule',
  jardinage: 'Jardinage',
  musique: 'Musique & Instruments',
  bijoux: 'Bijoux & Montres',
  sport: 'Sport & Loisirs',
  habitat: 'Habitat & Énergie',
  outillage: 'Outillage',
  mobilier: 'Mobilier',
  autre: 'Autre',
}

export const CATEGORIES: Category[] = [
  'electromenager',
  'electronique',
  'informatique',
  'vehicule',
  'jardinage',
  'musique',
  'bijoux',
  'sport',
  'habitat',
  'outillage',
  'mobilier',
  'autre',
]
