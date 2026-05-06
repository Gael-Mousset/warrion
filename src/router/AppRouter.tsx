// src/router/AppRouter.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import ProtectedRoute from '../components/ProtectedRoute'
import Navbar from '../components/Navbar'
import LandingPage from '../pages/LandingPage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import DashboardPage from '../pages/DashboardPage'
import WarrantyDetailPage from '../pages/WarrantyDetailPage'
import WarrantyFormPage from '../pages/WarrantyFormPage'
import WarrantyDocumentsPage from '../pages/WarrantyDocumentsPage'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>{children}</main>
    </div>
  )
}

function RootRedirect() {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <LandingPage />
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Layout><DashboardPage /></Layout>
          </ProtectedRoute>
        } />
        <Route path="/warranty/:id" element={
          <ProtectedRoute>
            <Layout><WarrantyDetailPage /></Layout>
          </ProtectedRoute>
        } />
        <Route path="/add" element={
          <ProtectedRoute>
            <Layout><WarrantyFormPage /></Layout>
          </ProtectedRoute>
        } />
        <Route path="/warranty/:id/edit" element={
          <ProtectedRoute>
            <Layout><WarrantyFormPage /></Layout>
          </ProtectedRoute>
        } />
        <Route path="/warranty/:id/documents" element={
          <ProtectedRoute>
            <Layout><WarrantyDocumentsPage /></Layout>
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
