import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { Warranty } from '../types'
import { MOCK_WARRANTIES } from '../data/mockData'
import { useAuth } from './AuthContext'
import { apiGetWarranties, apiCreateWarranty, apiUpdateWarranty, apiDeleteWarranty } from '../services/warranties.api'

interface WarrantyContextType {
  warranties: Warranty[]
  loading: boolean
  addWarranty: (w: Omit<Warranty, 'id' | 'createdAt'>) => Promise<void>
  updateWarranty: (id: string, w: Omit<Warranty, 'id' | 'createdAt'>) => Promise<void>
  deleteWarranty: (id: string) => Promise<void>
  getWarranty: (id: string) => Warranty | undefined
}

const WarrantyContext = createContext<WarrantyContextType | null>(null)

function loadDemo(): Warranty[] {
  try {
    const stored = localStorage.getItem('cff_warranties')
    return stored ? JSON.parse(stored) : MOCK_WARRANTIES
  } catch { return MOCK_WARRANTIES }
}
function saveDemo(ws: Warranty[]) {
  localStorage.setItem('cff_warranties', JSON.stringify(ws))
}

export function WarrantyProvider({ children }: { children: ReactNode }) {
  const { user, isDemoUser } = useAuth()
  const [warranties, setWarranties] = useState<Warranty[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!user) { setWarranties([]); return }
    if (isDemoUser) { setWarranties(loadDemo()); return }
    setLoading(true)
    apiGetWarranties(user.id)
      .then(setWarranties)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [user?.id, isDemoUser])

  useEffect(() => {
    if (isDemoUser && warranties.length > 0) saveDemo(warranties)
  }, [isDemoUser, warranties])

  const addWarranty = async (data: Omit<Warranty, 'id' | 'createdAt'>): Promise<void> => {
    if (isDemoUser) {
      const newW: Warranty = { ...data, id: 'w' + Date.now(), createdAt: new Date().toISOString().split('T')[0] }
      setWarranties(prev => [newW, ...prev])
      return
    }
    const created = await apiCreateWarranty(data)
    setWarranties(prev => [created, ...prev])
  }

  const updateWarranty = async (id: string, data: Omit<Warranty, 'id' | 'createdAt'>): Promise<void> => {
    if (isDemoUser) {
      setWarranties(prev => prev.map(w => w.id === id ? { ...w, ...data } : w))
      return
    }
    const updated = await apiUpdateWarranty(id, data)
    setWarranties(prev => prev.map(w => w.id === id ? updated : w))
  }

  const deleteWarranty = async (id: string): Promise<void> => {
    if (isDemoUser) {
      setWarranties(prev => prev.filter(w => w.id !== id))
      return
    }
    await apiDeleteWarranty(id)
    setWarranties(prev => prev.filter(w => w.id !== id))
  }

  const getWarranty = (id: string) => warranties.find(w => w.id === id)

  return (
    <WarrantyContext.Provider value={{ warranties, loading, addWarranty, updateWarranty, deleteWarranty, getWarranty }}>
      {children}
    </WarrantyContext.Provider>
  )
}

export function useWarranties() {
  const ctx = useContext(WarrantyContext)
  if (!ctx) throw new Error('useWarranties must be used within WarrantyProvider')
  return ctx
}
