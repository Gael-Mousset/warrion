// src/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { User } from '../types'
import { DEMO_USER } from '../data/mockData'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => { success: boolean; error?: string }
  register: (name: string, email: string, password: string) => { success: boolean; error?: string }
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

function getUsers(): User[] {
  try { return JSON.parse(localStorage.getItem('cff_users') || '[]') } catch { return [] }
}
function saveUsers(users: User[]) {
  localStorage.setItem('cff_users', JSON.stringify(users))
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Init demo user
    const users = getUsers()
    if (!users.find(u => u.email === DEMO_USER.email)) {
      saveUsers([...users, DEMO_USER])
    }
    // Restore session
    try {
      const session = sessionStorage.getItem('cff_session')
      if (session) setUser(JSON.parse(session))
    } catch { /* ignore */ }
  }, [])

  const login = (email: string, password: string) => {
    const users = getUsers()
    const found = users.find(u => u.email === email && u.password === password)
    if (!found) return { success: false, error: 'Email ou mot de passe incorrect.' }
    setUser(found)
    sessionStorage.setItem('cff_session', JSON.stringify(found))
    return { success: true }
  }

  const register = (name: string, email: string, password: string) => {
    if (password.length < 6) return { success: false, error: 'Mot de passe trop court (6 caractères min).' }
    const users = getUsers()
    if (users.find(u => u.email === email)) return { success: false, error: 'Cet email est déjà utilisé.' }
    const newUser: User = {
      id: 'user_' + Date.now(),
      email, name, password,
      createdAt: new Date().toISOString().split('T')[0],
    }
    saveUsers([...users, newUser])
    setUser(newUser)
    sessionStorage.setItem('cff_session', JSON.stringify(newUser))
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    sessionStorage.removeItem('cff_session')
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
