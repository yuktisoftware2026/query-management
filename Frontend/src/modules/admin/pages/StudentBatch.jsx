import { useState, useEffect } from 'react'
import { DataTable, BadgeStatus, LoadingState, Breadcrumb, BackButton, EmptyState, Modal } from '@/shared/components'
import { getAllMappings, assignStudent, removeStudent } from '@/modules/admin/api/adminApi'
import { Link2, Plus, Trash2 } from 'lucide-react'

const EMPTY_FORM = { studentId: '', batchId: '' }

export const StudentBatch = () => {
  const [mapping, setMapping] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  const fetchMapping = async () => {
    try {
      setLoading(true)
      const data = await getAllMappings()
      setMapping(Array.isArray(data) ? data : [])
      setError(null)
    } catch (err) {
      setError(err.message || 'Failed to load student batch mapping')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchMapping() }, [])

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      setSaving(true)
      const payload = { studentId: Number(form.studentId), batchId: Number(form.batchId) }
      await assignStudent(payload)
      setShowModal(false)
      setForm(EMPTY_FORM)
      await fetchMapping()
    } catch (err) {
      alert('Failed to map student to batch: ' + (err.message || 'Unknown error'))
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this mapping?')) return
    try {
      setDeletingId(id)
      await removeStudent(id)
      await fetchMapping()
    } catch (err) {
      alert('Failed: ' + (err.message || 'Unknown error'))
    } finally {
      setDeletingId(null)
    }
  }

  const columns = [
    { key: 'id', label: 'Mapping ID' },
    { key: 'studentId', label: 'Student ID' },
    { key: 'batchId', label: 'Batch ID' },
    { key: 'status', label: 'Status', render: (val) => <BadgeStatus status={val} label={val ? val.charAt(0).toUpperCase() + String(val).slice(1).toLowerCase() : '-'} /> },
    {
      key: 'id', label: 'Actions', render: (val) => (
        <button onClick={() => handleDelete(val)} disabled={deletingId === val}
          className="p-1.5 rounded-lg text-danger hover:bg-danger/10 transition-colors disabled:opacity-50" title="Remove Mapping">
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
          <h2 className="text-2xl font-bold text-primary">Student Batch Mapping</h2>
          <p className="text-text-secondary mt-1">Manage student-batch associations</p>
        </div>
        <button onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-secondary transition-colors font-medium">
          <Plus size={18} /> Assign Student
        </button>
      </div>

      {loading ? <LoadingState message="Loading mappings..." />
        : error ? <div className="bg-danger/10 border border-danger text-danger p-4 rounded-lg"><p>{error}</p></div>
        : mapping.length === 0 ? <EmptyState icon={Link2} title="No mappings found" description="There are no student-batch mappings yet." />
        : <DataTable columns={columns} data={mapping} />}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Assign Student to Batch">
        <form onSubmit={handleCreate} className="space-y-4">
          {[
            { name: 'studentId', label: 'Student ID', type: 'number' },
            { name: 'batchId', label: 'Batch ID', type: 'number' },
          ].map(f => (
            <div key={f.name}>
              <label className="block text-sm font-medium text-text-primary mb-1.5">{f.label}</label>
              <input type={f.type} required value={form[f.name]}
                onChange={e => setForm(prev => ({ ...prev, [f.name]: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
            </div>
          ))}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setShowModal(false)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-border text-text-secondary hover:bg-background transition-colors">Cancel</button>
            <button type="submit" disabled={saving}
              className="flex-1 px-4 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-secondary transition-colors disabled:opacity-60">
              {saving ? 'Assigning...' : 'Assign'}</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
