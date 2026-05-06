import { useParams, useNavigate } from 'react-router-dom'
import { useWarranties } from '../context/WarrantyContext'
import type { DocumentItem } from '../types'

function openDocument(doc: DocumentItem) {
  const [meta, b64] = doc.dataUrl.split(',')
  const mime = meta.split(':')[1].split(';')[0]
  const bytes = atob(b64)
  const buffer = new Uint8Array(bytes.length)
  for (let i = 0; i < bytes.length; i++) buffer[i] = bytes.charCodeAt(i)
  const blob = new Blob([buffer], { type: mime })
  window.open(URL.createObjectURL(blob), '_blank')
}

export default function WarrantyDocumentsPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { getWarranty } = useWarranties()

  const warranty = id ? getWarranty(id) : undefined
  if (!warranty) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-12 text-center text-gray-500">
        <p className="text-lg font-semibold mb-3">Garantie introuvable</p>
        <button onClick={() => navigate('/dashboard')} className="text-brand-600 hover:underline text-sm">
          ← Retour au dashboard
        </button>
      </div>
    )
  }

  const docs = warranty.documents ?? []

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6">
      <button
        onClick={() => navigate(`/warranty/${id}`)}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-600 font-medium mb-5 transition-colors w-fit"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M19 12H5M5 12l7 7M5 12l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Retour
      </button>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 sm:p-8">
        <h1 className="text-xl font-bold text-gray-900 mb-1">Documents</h1>
        <p className="text-sm text-gray-400 mb-6">{warranty.name}</p>

        {docs.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-10">Aucun document enregistré</p>
        ) : (
          <ul className="space-y-3">
            {docs.map((doc, i) => (
              <li key={i} className="flex items-center justify-between bg-gray-50 rounded-xl p-4 gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  {doc.type === 'application/pdf' ? (
                    <div className="w-10 h-10 flex items-center justify-center bg-red-50 border border-red-200 rounded-lg shrink-0">
                      <span className="text-xs font-bold text-red-500">PDF</span>
                    </div>
                  ) : (
                    <img
                      src={doc.dataUrl}
                      alt={doc.name}
                      className="w-10 h-10 object-cover rounded-lg border border-gray-200 shrink-0"
                    />
                  )}
                  <span className="text-sm font-medium text-gray-700 truncate">{doc.name}</span>
                </div>
                <button
                  onClick={() => openDocument(doc)}
                  className="flex items-center gap-1.5 text-sm text-brand-600 bg-brand-50 border border-brand-200 hover:bg-brand-100 px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Voir
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
