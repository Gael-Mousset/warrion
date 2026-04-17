// src/components/Navbar.tsx
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const initials = user?.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) ?? '?'

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 h-14 flex items-center justify-between">
      <Link to="/dashboard" className="flex items-center gap-2 font-bold text-brand-600 text-base">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect width="28" height="28" rx="8" fill="#004AAD"/>
          <path d="M7 10.5V17.5C7 18.33 7.67 19 8.5 19H19.5C20.33 19 21 18.33 21 17.5V10.5C21 9.67 20.33 9 19.5 9H8.5C7.67 9 7 9.67 7 10.5Z" stroke="white" strokeWidth="1.5"/>
          <path d="M10 9V8C10 6.9 10.9 6 12 6H16C17.1 6 18 6.9 18 8V9" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="14" cy="14" r="2" fill="white"/>
        </svg>
        Coffre-Fort
      </Link>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <div className="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold text-xs">
            {initials}
          </div>
          <span className="hidden sm:block">{user?.name}</span>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-gray-500 hover:text-gray-800 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors"
        >
          Déconnexion
        </button>
      </div>
    </header>
  )
}
