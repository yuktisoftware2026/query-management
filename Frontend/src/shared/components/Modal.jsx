import { X } from 'lucide-react'

/**
 * Reusable modal dialog for create/edit forms.
 * Usage: <Modal isOpen={...} onClose={...} title="..."><form fields/></Modal>
 */
export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative bg-white rounded-2xl shadow-2xl border border-border w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h3 className="text-xl font-bold text-text-primary">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-background text-text-secondary hover:text-text-primary transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}
