import { useState, useEffect } from 'react'
import { DataTable, BadgeStatus, LoadingState, Breadcrumb, BackButton, EmptyState, Modal } from '@/shared/components'
import { getAllAssignments, createAssignment, deleteAssignment } from '@/modules/faculty/api/facultyApi'
import { CheckSquare, Plus, Trash2 } from 'lucide-react'

const EMPTY_FORM = { moduleId: '', batchId: '', title: '', description: '', dueDate: '' }

export const Assignments = () => {
  const [assignments, setAssignments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  const fetchAssignments = async () => {
    try {
      setLoading(true)
      const data = await getAllAssignments()
      setAssignments(Array.isArray(data) ? data : data.data || [])
      setError(null)
    } catch (err) {
      setError(err.message || 'Failed to load assignments')
      setAssignments([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchAssignments() }, [])

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      setSaving(true)
      const payload = { 
        ...form, 
        moduleId: Number(form.moduleId), 
        batchId: Number(form.batchId),
        dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : null,
        createdBy: 1 // hardcoded for demo
      }
      await createAssignment(payload)
      setShowModal(false)
      setForm(EMPTY_FORM)
      await fetchAssignments()
    } catch (err) {
      alert('Failed to create assignment: ' + (err.message || 'Unknown error'))
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this assignment?')) return
    try {
      setDeletingId(id)
      await deleteAssignment(id)
      await fetchAssignments()
    } catch (err) {
      alert('Failed to delete: ' + (err.message || 'Unknown error'))
    } finally {
      setDeletingId(null)
    }
  }

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'title', label: 'Title' },
    { key: 'moduleId', label: 'Module ID' },
    { key: 'dueDate', label: 'Due Date', render: (val) => val ? new Date(val).toLocaleDateString() : '-' },
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
      <BackButton to="/faculty" />
      
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary">Assignments</h2>
          <p className="text-text-secondary mt-1">Manage assignments and due dates</p>
        </div>
        <button onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-blue-600 transition-colors font-medium">
          <Plus size={18} /> Create Assignment
        </button>
      </div>

      {loading ? <LoadingState message="Loading assignments..." />
        : error ? <div className="bg-danger/10 border border-danger text-danger p-4 rounded-lg"><p>{error}</p></div>
        : assignments.length === 0 ? <EmptyState icon={CheckSquare} title="No assignments" description="No assignments have been created yet." />
        : <DataTable columns={columns} data={assignments} />}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Create Assignment">
        <form onSubmit={handleCreate} className="space-y-4">
          {[
            { name: 'moduleId', label: 'Module ID', type: 'number' },
            { name: 'batchId', label: 'Batch ID', type: 'number' },
            { name: 'title', label: 'Assignment Title', type: 'text' },
            { name: 'description', label: 'Description', type: 'text' },
            { name: 'dueDate', label: 'Due Date', type: 'datetime-local' },
          ].map(f => (
            <div key={f.name}>
              <label className="block text-sm font-medium text-text-primary mb-1.5">{f.label}</label>
              <input type={f.type} required value={form[f.name]}
                onChange={e => setForm(prev => ({ ...prev, [f.name]: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
            </div>
          ))}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setShowModal(false)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-border text-text-secondary hover:bg-background transition-colors">Cancel</button>
            <button type="submit" disabled={saving}
              className="flex-1 px-4 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-blue-600 transition-colors disabled:opacity-60">
              {saving ? 'Creating...' : 'Create Assignment'}</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
