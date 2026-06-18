import { useState, useEffect } from 'react'
import { DataTable, BadgeStatus, LoadingState, Breadcrumb, BackButton, EmptyState, Modal } from '@/shared/components'
import { getAllSessions, createSession, deleteSession } from '@/modules/faculty/api/facultyApi'
import { Clock, Plus, Trash2 } from 'lucide-react'

const EMPTY_FORM = { batchId: '', moduleId: '', title: '', sessionDate: '', startTime: '', endTime: '' }

export const Sessions = () => {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  const fetchSessions = async () => {
    try {
      setLoading(true)
      const data = await getAllSessions()
      setSessions(Array.isArray(data) ? data : data.data || [])
      setError(null)
    } catch (err) {
      setError(err.message || 'Failed to load sessions')
      setSessions([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchSessions() }, [])

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      setSaving(true)
      const payload = { 
        ...form, 
        batchId: Number(form.batchId),
        moduleId: Number(form.moduleId), 
        createdBy: 1 // hardcoded for demo
      }
      await createSession(payload)
      setShowModal(false)
      setForm(EMPTY_FORM)
      await fetchSessions()
    } catch (err) {
      alert('Failed to schedule session: ' + (err.message || 'Unknown error'))
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this session?')) return
    try {
      setDeletingId(id)
      await deleteSession(id)
      await fetchSessions()
    } catch (err) {
      alert('Failed to delete: ' + (err.message || 'Unknown error'))
    } finally {
      setDeletingId(null)
    }
  }

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'title', label: 'Topic' },
    { key: 'batchId', label: 'Batch ID' },
    { key: 'sessionDate', label: 'Date', render: (val) => val ? new Date(val).toLocaleDateString() : '-' },
    { key: 'startTime', label: 'Time', render: (val, row) => `${val} - ${row.endTime}` },
    { key: 'status', label: 'Status', render: (val) => <BadgeStatus status={val} label={val ? val.charAt(0).toUpperCase() + val.slice(1).toLowerCase() : '-'} /> },
    {
      key: 'id', label: 'Actions', render: (val) => (
        <button onClick={() => handleDelete(val)} disabled={deletingId === val}
          className="p-1.5 rounded-lg text-danger hover:bg-danger/10 transition-colors disabled:opacity-50" title="Delete Session">
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
          <h2 className="text-2xl font-bold text-primary">Class Sessions</h2>
          <p className="text-text-secondary mt-1">Schedule and manage your live classes</p>
        </div>
        <button onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-blue-600 transition-colors font-medium">
          <Plus size={18} /> Schedule Session
        </button>
      </div>

      {loading ? <LoadingState message="Loading sessions..." />
        : error ? <div className="bg-danger/10 border border-danger text-danger p-4 rounded-lg"><p>{error}</p></div>
        : sessions.length === 0 ? <EmptyState icon={Clock} title="No sessions" description="No classes scheduled yet." />
        : <DataTable columns={columns} data={sessions} />}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Schedule Session">
        <form onSubmit={handleCreate} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: 'batchId', label: 'Batch ID', type: 'number' },
              { name: 'moduleId', label: 'Module ID', type: 'number' },
            ].map(f => (
              <div key={f.name}>
                <label className="block text-sm font-medium text-text-primary mb-1.5">{f.label}</label>
                <input type={f.type} required value={form[f.name]}
                  onChange={e => setForm(prev => ({ ...prev, [f.name]: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
              </div>
            ))}
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">Session Topic</label>
            <input type="text" required value={form.title}
              onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">Date</label>
            <input type="date" required value={form.sessionDate}
              onChange={e => setForm(prev => ({ ...prev, sessionDate: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Start Time</label>
              <input type="time" required value={form.startTime}
                onChange={e => setForm(prev => ({ ...prev, startTime: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">End Time</label>
              <input type="time" required value={form.endTime}
                onChange={e => setForm(prev => ({ ...prev, endTime: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setShowModal(false)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-border text-text-secondary hover:bg-background transition-colors">Cancel</button>
            <button type="submit" disabled={saving}
              className="flex-1 px-4 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-blue-600 transition-colors disabled:opacity-60">
              {saving ? 'Scheduling...' : 'Schedule Class'}</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
