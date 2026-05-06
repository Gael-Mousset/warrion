import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { User } from '../types'
import { DEMO_USER } from '../data/mockData'
import { apiLogin, apiRegister } from '../services/auth.api'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isDemoUser: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    try {
      const session = sessionStorage.getItem('cff_session')
      if (session) setUser(JSON.parse(session))
    } catch { /* ignore */ }
  }, [])

  const isDemoUser = user?.id === DEMO_USER.id

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Compte démo : toujours local, jamais de requête API
    if (email === DEMO_USER.email && password === DEMO_USER.password) {
      setUser(DEMO_USER)
      sessionStorage.setItem('cff_session', JSON.stringify(DEMO_USER))
      return { success: true }
    }
    try {
      const loggedUser = await apiLogin(email, password)
      setUser(loggedUser)
      sessionStorage.setItem('cff_session', JSON.stringify(loggedUser))
      return { success: true }
    } catch (err: any) {
      return { success: false, error: err.message ?? 'Erreur inconnue.' }
    }
  }

  const register = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    if (password.length < 6) return { success: false, error: 'Mot de passe trop court (6 caractères min).' }
    try {
      const newUser = await apiRegister(name, email, password)
      setUser(newUser)
      sessionStorage.setItem('cff_session', JSON.stringify(newUser))
      return { success: true }
    } catch (err: any) {
      return { success: false, error: err.message ?? 'Erreur inconnue.' }
    }
  }

  const logout = () => {
    setUser(null)
    sessionStorage.removeItem('cff_session')
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isDemoUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
