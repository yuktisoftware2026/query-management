import { useState, useEffect } from 'react'
import { DataTable, BadgeStatus, LoadingState, Breadcrumb, BackButton, EmptyState, Modal } from '@/shared/components'
import { getAllCourses, createCourse, deleteCourse } from '@/modules/admin/api/adminApi'
import { BookOpen, Plus, Trash2 } from 'lucide-react'

const EMPTY_FORM = { courseName: '', description: '' }

export const Courses = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  const fetchCourses = async () => {
    try {
      setLoading(true)
      const data = await getAllCourses()
      setCourses(Array.isArray(data) ? data : [])
      setError(null)
    } catch (err) {
      setError(err.message || 'Failed to load courses')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchCourses() }, [])

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      setSaving(true)
      await createCourse(form)
      setShowModal(false)
      setForm(EMPTY_FORM)
      await fetchCourses()
    } catch (err) {
      alert('Failed to create course: ' + (err.message || 'Unknown error'))
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this course?')) return
    try {
      setDeletingId(id)
      await deleteCourse(id)
      await fetchCourses()
    } catch (err) {
      alert('Failed: ' + (err.message || 'Unknown error'))
    } finally {
      setDeletingId(null)
    }
  }

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'courseName', label: 'Course Name' },
    { key: 'description', label: 'Description' },
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
          <h2 className="text-2xl font-bold text-primary">Courses</h2>
          <p className="text-text-secondary mt-1">Manage all courses in the system</p>
        </div>
        <button onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-secondary transition-colors font-medium">
          <Plus size={18} /> Add Course
        </button>
      </div>

      {loading ? <LoadingState message="Loading courses..." />
        : error ? <div className="bg-danger/10 border border-danger text-danger p-4 rounded-lg"><p>{error}</p></div>
        : courses.length === 0 ? <EmptyState icon={BookOpen} title="No courses found" description="Add your first course." />
        : <DataTable columns={columns} data={courses} />}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Course">
        <form onSubmit={handleCreate} className="space-y-4">
          {[
            { name: 'courseName', label: 'Course Name', placeholder: 'e.g. Advanced Java', type: 'text' },
            { name: 'description', label: 'Description', placeholder: 'Course description...', type: 'text' },
          ].map(f => (
            <div key={f.name}>
              <label className="block text-sm font-medium text-text-primary mb-1.5">{f.label}</label>
              <input type={f.type} required placeholder={f.placeholder} value={form[f.name]}
                onChange={e => setForm(prev => ({ ...prev, [f.name]: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-text-primary placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
            </div>
          ))}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setShowModal(false)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-border text-text-secondary hover:bg-background transition-colors">Cancel</button>
            <button type="submit" disabled={saving}
              className="flex-1 px-4 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-secondary transition-colors disabled:opacity-60">
              {saving ? 'Creating...' : 'Create Course'}</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
