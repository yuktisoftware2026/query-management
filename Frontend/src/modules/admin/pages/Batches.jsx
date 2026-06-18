import { useState, useEffect } from 'react'
import { DataTable, BadgeStatus, LoadingState, Breadcrumb, BackButton, EmptyState, Modal } from '@/shared/components'
import { getAllBatches, createBatch, deleteBatch } from '@/modules/admin/api/adminApi'
import { BarChart3, Plus, Trash2 } from 'lucide-react'

const EMPTY_FORM = { courseId: '', batchName: '', description: '', facultyId: '', mentorId: '', startDate: '', endDate: '' }

export const Batches = () => {
  const [batches, setBatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  const fetchBatches = async () => {
    try {
      setLoading(true)
      const data = await getAllBatches()
      setBatches(Array.isArray(data) ? data : [])
      setError(null)
    } catch (err) {
      setError(err.message || 'Failed to load batches')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchBatches() }, [])

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      setSaving(true)
      // Convert ID strings to numbers
      const payload = { ...form, courseId: Number(form.courseId), facultyId: Number(form.facultyId), mentorId: Number(form.mentorId) }
      await createBatch(payload)
      setShowModal(false)
      setForm(EMPTY_FORM)
      await fetchBatches()
    } catch (err) {
      alert('Failed to create batch: ' + (err.message || 'Unknown error'))
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this batch?')) return
    try {
      setDeletingId(id)
      await deleteBatch(id)
      await fetchBatches()
    } catch (err) {
      alert('Failed: ' + (err.message || 'Unknown error'))
    } finally {
      setDeletingId(null)
    }
  }

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'batchName', label: 'Batch Name' },
    { key: 'courseId', label: 'Course ID' },
    { key: 'facultyId', label: 'Faculty ID' },
    { key: 'mentorId', label: 'Mentor ID' },
    { key: 'status', label: 'Status', render: (val) => <BadgeStatus status={val} label={val ? val.charAt(0).toUpperCase() + val.slice(1).toLowerCase() : '-'} /> },
    {
      key: 'id', label: 'Actions', render: (val) => (
        <button onClick={() => handleDelete(val)} disabled={deletingId === val}
          className="p-1.5 rounded-lg text-danger hover:bg-danger/10 transition-colors disabled:opacity-50" title="Delete">
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
          <h2 className="text-2xl font-bold text-primary">Batches</h2>
          <p className="text-text-secondary mt-1">Manage student batches</p>
        </div>
        <button onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-secondary transition-colors font-medium">
          <Plus size={18} /> Add Batch
        </button>
      </div>

      {loading ? <LoadingState message="Loading batches..." />
        : error ? <div className="bg-danger/10 border border-danger text-danger p-4 rounded-lg"><p>{error}</p></div>
        : batches.length === 0 ? <EmptyState icon={BarChart3} title="No batches found" description="Add your first batch." />
        : <DataTable columns={columns} data={batches} />}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Batch">
        <form onSubmit={handleCreate} className="space-y-4">
          {[
            { name: 'courseId', label: 'Course ID', type: 'number' },
            { name: 'batchName', label: 'Batch Name', type: 'text' },
            { name: 'description', label: 'Description', type: 'text' },
            { name: 'facultyId', label: 'Faculty ID', type: 'number' },
            { name: 'mentorId', label: 'Mentor ID', type: 'number' },
            { name: 'startDate', label: 'Start Date', type: 'date' },
            { name: 'endDate', label: 'End Date', type: 'date' },
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
              {saving ? 'Creating...' : 'Create Batch'}</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
