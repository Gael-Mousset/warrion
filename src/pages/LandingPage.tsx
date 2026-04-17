// src/pages/LandingPage.tsx
import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-slate-50">
      {/* Top nav */}
      <nav className="px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-2 font-bold text-brand-600 text-base">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="8" fill="#004AAD"/>
            <path d="M7 10.5V17.5C7 18.33 7.67 19 8.5 19H19.5C20.33 19 21 18.33 21 17.5V10.5C21 9.67 20.33 9 19.5 9H8.5C7.67 9 7 9.67 7 10.5Z" stroke="white" strokeWidth="1.5"/>
            <path d="M10 9V8C10 6.9 10.9 6 12 6H16C17.1 6 18 6.9 18 8V9" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="14" cy="14" r="2" fill="white"/>
          </svg>
          Warrion
        </div>
        <div className="flex gap-3">
          <Link to="/login" className="text-sm text-gray-600 hover:text-brand-600 font-medium px-4 py-2 rounded-lg hover:bg-brand-50 transition-colors">
            Se connecter
          </Link>
          <Link to="/register" className="text-sm bg-brand-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors">
            Créer un compte
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="max-w-3xl mx-auto text-center px-6 pt-16 pb-20">
        <span className="inline-flex items-center gap-1.5 bg-brand-50 text-brand-600 border border-brand-100 rounded-full px-4 py-1 text-xs font-semibold mb-6">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#004AAD" strokeWidth="2.5" strokeLinejoin="round"/>
          </svg>
          Vos garanties en sécurité
        </span>

        <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-brand-600 mb-5">
          Warrion<br />
          <span className="text-gray-800">vos garanties en sécurité</span>
        </h1>

        <p className="text-lg text-gray-500 leading-relaxed mb-10 max-w-xl mx-auto">
          Centralisez vos factures, suivez vos garanties et recevez des alertes avant expiration.
          Ne perdez plus jamais une garantie.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            to="/register"
            className="bg-brand-600 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-brand-700 transition-colors text-base shadow-sm"
          >
            Créer un compte gratuit
          </Link>
          <Link
            to="/login"
            className="border-2 border-brand-600 text-brand-600 font-semibold px-8 py-3.5 rounded-xl hover:bg-brand-50 transition-colors text-base"
          >
            Se connecter
          </Link>
        </div>

        <p className="text-xs text-gray-400 mt-4">
          Compte démo disponible : <span className="font-mono">demo@coffre.fr</span> / <span className="font-mono">demo123</span>
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-16 text-left">
          {[
            {
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="#004AAD" strokeWidth="1.8"/>
                  <path d="M14 2v6h6M9 13h6M9 17h4" stroke="#004AAD" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              ),
              title: 'Stockage centralisé',
              desc: 'Toutes vos factures et garanties au même endroit, accessibles partout.',
            },
            {
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="#004AAD" strokeWidth="1.8"/>
                  <path d="M12 7v5l3 3" stroke="#004AAD" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              ),
              title: 'Suivi automatique',
              desc: 'Calcul automatique des dates d\'expiration et du temps restant.',
            },
            {
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="#004AAD" strokeWidth="1.8" strokeLinejoin="round"/>
                </svg>
              ),
              title: 'Alertes intelligentes',
              desc: 'Soyez prévenu 30 jours avant la fin de chaque garantie.',
            },
          ].map((f, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center mb-3">
                {f.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-1.5">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
