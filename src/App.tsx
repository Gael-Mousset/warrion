// src/App.tsx
import { useEffect } from 'react'
import { AuthProvider } from './context/AuthContext'
import { WarrantyProvider } from './context/WarrantyContext'
import AppRouter from './router/AppRouter'

export default function App() {
  useEffect(() => {
    const handleFocusIn = (e: FocusEvent) => {
      const tag = (e.target as HTMLElement).tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') {
        setTimeout(() => {
          (e.target as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'center' })
        }, 300)
      }
    }
    document.addEventListener('focusin', handleFocusIn)
    return () => document.removeEventListener('focusin', handleFocusIn)
  }, [])

  return (
    <AuthProvider>
      <WarrantyProvider>
        <AppRouter />
      </WarrantyProvider>
    </AuthProvider>
  )
}
