import { useState, useEffect } from 'react'
import { DataTable, BadgeStatus, LoadingState, Breadcrumb, BackButton, EmptyState, Modal } from '@/shared/components'
import { getAllStudents, createStudent, deleteStudent } from '@/modules/admin/api/adminApi'
import { Users, Plus, Trash2 } from 'lucide-react'

const EMPTY_FORM = { name: '', email: '', phone: '' }

export const Students = () => {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  const fetchStudents = async () => {
    try {
      setLoading(true)
      const data = await getAllStudents()
      setStudents(Array.isArray(data) ? data : [])
      setError(null)
    } catch (err) {
      setError(err.message || 'Failed to load students')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchStudents() }, [])

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      setSaving(true)
      await createStudent(form)
      setShowModal(false)
      setForm(EMPTY_FORM)
      await fetchStudents()
    } catch (err) {
      alert('Failed to create student: ' + (err.message || 'Unknown error'))
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to deactivate this student?')) return
    try {
      setDeletingId(id)
      await deleteStudent(id)
      await fetchStudents()
    } catch (err) {
      alert('Failed to delete student: ' + (err.message || 'Unknown error'))
    } finally {
      setDeletingId(null)
    }
  }

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'status', label: 'Status', render: (val) => <BadgeStatus status={val} label={val ? val.charAt(0).toUpperCase() + val.slice(1).toLowerCase() : '-'} /> },
    {
      key: 'id', label: 'Actions', render: (val) => (
        <button
          onClick={() => handleDelete(val)}
          disabled={deletingId === val}
          className="p-1.5 rounded-lg text-danger hover:bg-danger/10 transition-colors disabled:opacity-50"
          title="Deactivate student"
        >
          <Trash2 size={16} />
        </button>
      )
    },
  ]

  return (
    <div className="space-y-6">
      <Breadcrumb />
      <BackButton to="/admin" />

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary">Students</h2>
          <p className="text-text-secondary mt-1">Manage all students in the system</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-secondary transition-colors font-medium"
        >
          <Plus size={18} />
          Add Student
        </button>
      </div>

      {loading ? (
        <LoadingState message="Loading students..." />
      ) : error ? (
        <div className="bg-danger/10 border border-danger text-danger p-4 rounded-lg"><p>{error}</p></div>
      ) : students.length === 0 ? (
        <EmptyState icon={Users} title="No students found" description="Add your first student to get started." />
      ) : (
        <DataTable columns={columns} data={students} />
      )}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add New Student">
        <form onSubmit={handleCreate} className="space-y-4">
          {[
            { name: 'name', label: 'Full Name', placeholder: 'e.g. Narayan Singh', type: 'text', required: true },
            { name: 'email', label: 'Email', placeholder: 'student@example.com', type: 'email', required: true },
            { name: 'phone', label: 'Phone', placeholder: '9876543210', type: 'text', required: true },
          ].map(f => (
            <div key={f.name}>
              <label className="block text-sm font-medium text-text-primary mb-1.5">{f.label}</label>
              <input
                type={f.type}
                required={f.required}
                placeholder={f.placeholder}
                value={form[f.name]}
                onChange={e => setForm(prev => ({ ...prev, [f.name]: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-text-primary placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>
          ))}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setShowModal(false)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-border text-text-secondary hover:bg-background transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={saving}
              className="flex-1 px-4 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-secondary transition-colors disabled:opacity-60">
              {saving ? 'Creating...' : 'Create Student'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
