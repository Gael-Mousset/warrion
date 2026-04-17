// src/components/ConfirmDialog.tsx
import { useState } from 'react'

interface ConfirmDialogProps {
  title: string
  message: React.ReactNode
  confirmLabel?: string
  cancelLabel?: string
  requireWord?: string
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmDialog({
  title,
  message,
  confirmLabel = 'Confirmer',
  cancelLabel = 'Annuler',
  requireWord,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const [typed, setTyped] = useState('')
  const canConfirm = requireWord ? typed === requireWord : true

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-red-600">
            <path d="M3 6h18M8 6V4h8v2M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 className="text-lg font-bold text-gray-900 text-center mb-1">{title}</h2>
        <p className="text-sm text-gray-500 text-center mb-4">{message}</p>

        {requireWord && (
          <div className="mb-4">
            <p className="text-xs text-gray-500 text-center mb-2">
              Tapez <span className="font-mono font-bold text-red-600">{requireWord}</span> pour confirmer
            </p>
            <input
              type="text"
              value={typed}
              onChange={e => setTyped(e.target.value)}
              placeholder={requireWord}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-center outline-none focus:border-red-400 focus:ring-1 focus:ring-red-100 transition-all font-mono"
            />
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            disabled={!canConfirm}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
