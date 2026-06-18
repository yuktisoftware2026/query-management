import { useState, useEffect } from 'react'
import { DataTable, BadgeStatus, LoadingState, Breadcrumb, BackButton, EmptyState, Modal } from '@/shared/components'
import { getAllModules, createModule, completeModule } from '@/modules/faculty/api/facultyApi'
import { BookOpen, Plus, CheckCircle } from 'lucide-react'

const EMPTY_FORM = { courseId: '', title: '', description: '', sequenceNo: '' }

export const Modules = () => {
  const [modules, setModules] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [completingId, setCompletingId] = useState(null)

  const fetchModules = async () => {
    try {
      setLoading(true)
      const data = await getAllModules()
      setModules(Array.isArray(data) ? data : data.data || [])
      setError(null)
    } catch (err) {
      setError(err.message || 'Failed to load modules')
      setModules([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchModules() }, [])

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      setSaving(true)
      const payload = { ...form, courseId: Number(form.courseId), sequenceNo: Number(form.sequenceNo) }
      await createModule(payload)
      setShowModal(false)
      setForm(EMPTY_FORM)
      await fetchModules()
    } catch (err) {
      alert('Failed to create module: ' + (err.message || 'Unknown error'))
    } finally {
      setSaving(false)
    }
  }

  const handleComplete = async (id) => {
    if (!window.confirm('Mark this module as complete?')) return
    try {
      setCompletingId(id)
      await completeModule(id)
      await fetchModules()
    } catch (err) {
      alert('Failed: ' + (err.message || 'Unknown error'))
    } finally {
      setCompletingId(null)
    }
  }

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'title', label: 'Module' },
    { key: 'courseId', label: 'Course ID' },
    { key: 'sequenceNo', label: 'Sequence' },
    { key: 'status', label: 'Status', render: (val) => <BadgeStatus status={val} label={val ? val.charAt(0).toUpperCase() + val.slice(1).toLowerCase() : '-'} /> },
    {
      key: 'id', label: 'Actions', render: (val) => (
        <button onClick={() => handleComplete(val)} disabled={completingId === val}
          className="p-1.5 rounded-lg text-success hover:bg-success/10 transition-colors disabled:opacity-50" title="Mark Complete">
          <CheckCircle size={16} />
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
          <h2 className="text-2xl font-bold text-primary">Modules</h2>
          <p className="text-text-secondary mt-1">Manage course modules and lessons</p>
        </div>
        <button onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-blue-600 transition-colors font-medium">
          <Plus size={18} /> Add Module
        </button>
      </div>

      {loading ? <LoadingState message="Loading modules..." />
        : error ? <div className="bg-danger/10 border border-danger text-danger p-4 rounded-lg"><p>{error}</p></div>
        : modules.length === 0 ? <EmptyState icon={BookOpen} title="No modules" description="No modules have been created yet." />
        : <DataTable columns={columns} data={modules} />}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Create Module">
        <form onSubmit={handleCreate} className="space-y-4">
          {[
            { name: 'courseId', label: 'Course ID', type: 'number' },
            { name: 'title', label: 'Module Title', type: 'text' },
            { name: 'description', label: 'Description', type: 'text' },
            { name: 'sequenceNo', label: 'Sequence Number', type: 'number' },
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
              {saving ? 'Creating...' : 'Create Module'}</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
