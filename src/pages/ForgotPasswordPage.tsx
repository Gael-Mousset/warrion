import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apiForgotPassword } from '../services/auth.api'

export default function ForgotPasswordPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email) { setError('Veuillez saisir votre email.'); return }
    setLoading(true)
    try {
      const { token } = await apiForgotPassword(email)
      navigate(`/reset-password?token=${token}`)
    } catch (err: any) {
      setError(err.message ?? 'Erreur serveur.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-brand-50 via-white to-slate-50 flex flex-col justify-center px-4 py-8">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-brand-600 font-bold text-lg">
            <svg width="32" height="32" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="8" fill="#004AAD"/>
              <path d="M7 10.5V17.5C7 18.33 7.67 19 8.5 19H19.5C20.33 19 21 18.33 21 17.5V10.5C21 9.67 20.33 9 19.5 9H8.5C7.67 9 7 9.67 7 10.5Z" stroke="white" strokeWidth="1.5"/>
              <path d="M10 9V8C10 6.9 10.9 6 12 6H16C17.1 6 18 6.9 18 8V9" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="14" cy="14" r="2" fill="white"/>
            </svg>
            Warrion
          </Link>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
          <h1 className="text-2xl font-bold text-brand-600 mb-1">Mot de passe oublié</h1>
          <p className="text-sm text-gray-500 mb-7">Saisissez votre email pour réinitialiser votre mot de passe</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="vous@exemple.fr"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-100 transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-600 text-white font-semibold py-3 rounded-xl hover:bg-brand-700 transition-colors disabled:opacity-60 mt-2"
            >
              {loading ? 'Vérification...' : 'Réinitialiser le mot de passe'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-5">
            <Link to="/login" className="text-brand-600 font-medium hover:underline">← Retour à la connexion</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
