// src/pages/WarrantyFormPage.tsx
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useWarranties } from '../context/WarrantyContext'
import { useAuth } from '../context/AuthContext'
import { computeExpirationDate, formatDate, CATEGORY_PHOTOS } from '../utils/warrantyUtils'
import type { Category } from '../types'
import { CATEGORY_LABELS } from '../types'

export default function WarrantyFormPage() {
  const { id } = useParams<{ id: string }>()
  const isEdit = Boolean(id)

  const { addWarranty, updateWarranty, getWarranty } = useWarranties()
  const { user } = useAuth()
  const navigate = useNavigate()

  const warranty = id ? getWarranty(id) : undefined

  const [name, setName] = useState(warranty?.name ?? '')
  const [category, setCategory] = useState<Category | ''>(warranty?.category ?? '')
  const [purchaseDate, setPurchaseDate] = useState(warranty?.purchaseDate ?? new Date().toISOString().split('T')[0])
  const [duration, setDuration] = useState(String(warranty?.warrantyDurationMonths ?? ''))
  const [photoUrl, setPhotoUrl] = useState(warranty?.photoUrl ?? '')
  const [photoFileName, setPhotoFileName] = useState('')
  const [photoMode, setPhotoMode] = useState<'fichier' | 'url'>(
    warranty?.photoUrl?.startsWith('data:') ? 'fichier' : 'url'
  )
  const [notes, setNotes] = useState(warranty?.notes ?? '')
  const [isPrecious, setIsPrecious] = useState(warranty?.isPrecious ?? false)
  const [error, setError] = useState('')

  if (isEdit && !warranty) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-12 text-center text-gray-500">
        <p className="text-lg font-semibold mb-3">Objet introuvable</p>
        <button onClick={() => navigate('/dashboard')} className="text-brand-600 hover:underline text-sm">
          ← Retour au dashboard
        </button>
      </div>
    )
  }

  const categories: Category[] = ['electromenager', 'electronique', 'informatique', 'outillage', 'mobilier', 'autre']
  const durations = [
    { value: '6', label: '6 mois' },
    { value: '12', label: '1 an' },
    { value: '24', label: '2 ans' },
    { value: '36', label: '3 ans' },
    { value: '48', label: '4 ans' },
    { value: '60', label: '5 ans' },
  ]

  const expirationDate = purchaseDate && duration
    ? computeExpirationDate(purchaseDate, parseInt(duration))
    : null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!name || !category || !purchaseDate || !duration) {
      setError('Veuillez remplir les champs obligatoires (*)')
      return
    }
    const data = {
      userId: user?.id ?? 'demo',
      name,
      category: category as Category,
      purchaseDate,
      warrantyDurationMonths: parseInt(duration),
      photoUrl: photoUrl || CATEGORY_PHOTOS[category as Category] || '',
      notes,
      isPrecious,
    }
    if (isEdit && warranty) {
      updateWarranty(warranty.id, data)
      navigate(`/warranty/${warranty.id}`)
    } else {
      addWarranty(data)
      navigate('/dashboard')
    }
  }

  const backTarget = isEdit ? `/warranty/${warranty!.id}` : '/dashboard'

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6">
      <button
        onClick={() => navigate(backTarget)}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-600 font-medium mb-5 transition-colors w-fit"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M19 12H5M5 12l7 7M5 12l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Retour
      </button>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          {isEdit ? "Modifier l'objet" : 'Ajouter un objet'}
        </h1>
        <p className="text-sm text-gray-400 mb-7">
          {isEdit ? 'Modifiez les informations de garantie' : 'Renseignez les informations de garantie'}
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm mb-5">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nom */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Nom de l'objet *</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Ex : Lave-linge Samsung"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-100 transition-all"
            />
          </div>

          {/* Catégorie + Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Catégorie *</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as Category)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-100 transition-all bg-white cursor-pointer"
              >
                <option value="">-- Choisir --</option>
                {categories.map(c => (
                  <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Date d'achat *</label>
              <input
                type="date"
                value={purchaseDate}
                onChange={e => setPurchaseDate(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-100 transition-all"
              />
            </div>
          </div>

          {/* Durée */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Durée de garantie *</label>
            <select
              value={duration}
              onChange={e => setDuration(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-100 transition-all bg-white cursor-pointer"
            >
              <option value="">-- Durée --</option>
              {durations.map(d => (
                <option key={d.value} value={d.value}>{d.label}</option>
              ))}
            </select>
            {expirationDate && (
              <div className="mt-2.5 flex items-center justify-between bg-brand-50 border border-brand-100 rounded-xl px-4 py-2.5">
                <span className="text-xs font-semibold text-brand-600 uppercase tracking-wide">📅 Date d'expiration calculée</span>
                <span className="text-sm font-bold text-brand-700">{formatDate(expirationDate)}</span>
              </div>
            )}
          </div>

          {/* Photo */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-medium text-gray-700">Photo du produit</label>
              <div className="flex items-center bg-gray-100 rounded-lg p-0.5 text-xs font-medium">
                <button
                  type="button"
                  onClick={() => { setPhotoMode('fichier'); setPhotoUrl(''); setPhotoFileName('') }}
                  className={`px-3 py-1 rounded-md transition-all ${photoMode === 'fichier' ? 'bg-white text-brand-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Fichier
                </button>
                <button
                  type="button"
                  onClick={() => { setPhotoMode('url'); setPhotoUrl(''); setPhotoFileName('') }}
                  className={`px-3 py-1 rounded-md transition-all ${photoMode === 'url' ? 'bg-white text-brand-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  URL
                </button>
              </div>
            </div>

            {photoMode === 'fichier' ? (
              <label className="flex items-center gap-3 w-full border border-dashed border-gray-300 rounded-lg px-4 py-3 cursor-pointer hover:border-brand-400 hover:bg-brand-50 transition-all group">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gray-400 group-hover:text-brand-500 shrink-0">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="17 8 12 3 7 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="12" y1="3" x2="12" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span className="text-sm text-gray-500 group-hover:text-brand-600 truncate">
                  {photoFileName ? photoFileName : 'Choisir une photo depuis votre ordinateur'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => {
                    const file = e.target.files?.[0]
                    if (!file) return
                    setPhotoFileName(file.name)
                    const reader = new FileReader()
                    reader.onload = ev => setPhotoUrl(ev.target?.result as string)
                    reader.readAsDataURL(file)
                  }}
                />
              </label>
            ) : (
              <input
                type="text"
                value={photoUrl}
                onChange={e => setPhotoUrl(e.target.value)}
                placeholder="https://..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-100 transition-all"
              />
            )}

            {photoUrl && (
              <div className="mt-2 relative">
                <img
                  src={photoUrl}
                  alt="aperçu"
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                  className="w-full h-32 object-cover rounded-xl border border-gray-100"
                />
                <button
                  type="button"
                  onClick={() => { setPhotoUrl(''); setPhotoFileName('') }}
                  className="absolute top-1.5 right-1.5 bg-white border border-gray-200 rounded-full p-1 hover:bg-red-50 hover:border-red-200 transition-colors"
                  title="Supprimer la photo"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            )}
            {!photoUrl && category && (
              <img
                src={CATEGORY_PHOTOS[category as Category]}
                alt="photo par défaut"
                className="mt-2 w-full h-32 object-cover rounded-xl border border-gray-100 opacity-40"
              />
            )}
          </div>

          {/* Objet précieux */}
          <label className="flex items-center gap-3 cursor-pointer select-none w-fit">
            <div className="relative">
              <input
                type="checkbox"
                checked={isPrecious}
                onChange={e => setIsPrecious(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-10 h-6 bg-gray-200 rounded-full peer-checked:bg-brand-600 transition-colors" />
              <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-4" />
            </div>
            <div>
              <span className="text-sm font-medium text-gray-700">Objet précieux</span>
              <p className="text-xs text-gray-400">Une confirmation supplémentaire sera demandée avant suppression</p>
            </div>
          </label>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Notes</label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Numéro de série, informations SAV..."
              rows={3}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-100 transition-all resize-y"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate(backTarget)}
              className="flex-1 text-center text-sm text-gray-500 bg-gray-50 border border-gray-200 hover:bg-gray-100 py-3 rounded-xl font-medium transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-[2] bg-brand-600 text-white font-semibold py-3 rounded-xl hover:bg-brand-700 transition-colors text-sm"
            >
              {isEdit ? 'Enregistrer les modifications' : 'Enregistrer la garantie'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
