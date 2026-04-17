// src/App.tsx
import { AuthProvider } from './context/AuthContext'
import { WarrantyProvider } from './context/WarrantyContext'
import AppRouter from './router/AppRouter'

export default function App() {
  return (
    <AuthProvider>
      <WarrantyProvider>
        <AppRouter />
      </WarrantyProvider>
    </AuthProvider>
  )
}
