// src/types/index.ts

export type WarrantyStatus = 'active' | 'expiring_soon' | 'expired'

export type Category =
  | 'electromenager'
  | 'electronique'
  | 'informatique'
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

export interface Warranty {
  id: string
  userId: string
  name: string
  category: Category
  purchaseDate: string
  warrantyDurationMonths: number
  photoUrl?: string
  notes?: string
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
  outillage: 'Outillage',
  mobilier: 'Mobilier',
  autre: 'Autre',
}
