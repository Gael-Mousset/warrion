// src/context/WarrantyContext.tsx
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { Warranty } from '../types'
import { MOCK_WARRANTIES } from '../data/mockData'

interface WarrantyContextType {
  warranties: Warranty[]
  addWarranty: (w: Omit<Warranty, 'id' | 'createdAt'>) => void
  updateWarranty: (id: string, w: Omit<Warranty, 'id' | 'createdAt'>) => void
  deleteWarranty: (id: string) => void
  getWarranty: (id: string) => Warranty | undefined
}

const WarrantyContext = createContext<WarrantyContextType | null>(null)

function load(): Warranty[] {
  try {
    const stored = localStorage.getItem('cff_warranties')
    return stored ? JSON.parse(stored) : MOCK_WARRANTIES
  } catch { return MOCK_WARRANTIES }
}
function save(ws: Warranty[]) {
  localStorage.setItem('cff_warranties', JSON.stringify(ws))
}

export function WarrantyProvider({ children }: { children: ReactNode }) {
  const [warranties, setWarranties] = useState<Warranty[]>(load)

  useEffect(() => { save(warranties) }, [warranties])

  const addWarranty = (data: Omit<Warranty, 'id' | 'createdAt'>) => {
    const newW: Warranty = {
      ...data,
      id: 'w' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
    }
    setWarranties(prev => [newW, ...prev])
  }

  const updateWarranty = (id: string, data: Omit<Warranty, 'id' | 'createdAt'>) => {
    setWarranties(prev => prev.map(w => w.id === id ? { ...w, ...data } : w))
  }

  const deleteWarranty = (id: string) => {
    setWarranties(prev => prev.filter(w => w.id !== id))
  }

  const getWarranty = (id: string) => warranties.find(w => w.id === id)

  return (
    <WarrantyContext.Provider value={{ warranties, addWarranty, updateWarranty, deleteWarranty, getWarranty }}>
      {children}
    </WarrantyContext.Provider>
  )
}

export function useWarranties() {
  const ctx = useContext(WarrantyContext)
  if (!ctx) throw new Error('useWarranties must be used within WarrantyProvider')
  return ctx
}
