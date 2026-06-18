import { useState, useEffect } from 'react'
import { DataTable, BadgeStatus, LoadingState, Breadcrumb, BackButton, EmptyState, Modal } from '@/shared/components'
import { getAllSubmissions, createSubmission } from '@/modules/student/api/studentApi'
import { CheckSquare, Plus, CheckCircle } from 'lucide-react'

const EMPTY_FORM = { assignmentId: '', submissionType: 'GITHUB', githubLink: '', fileUrl: '', codeSnippet: '' }

export const Submissions = () => {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)

  const fetchSubmissions = async () => {
    try {
      setLoading(true)
      const data = await getAllSubmissions()
      setSubmissions(Array.isArray(data) ? data : data.data || [])
      setError(null)
    } catch (err) {
      setError(err.message || 'Failed to load submissions')
      setSubmissions([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchSubmissions() }, [])

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      setSaving(true)
      const payload = { 
        ...form, 
        assignmentId: Number(form.assignmentId),
        studentId: 1 // hardcoded for demo
      }
      await createSubmission(payload)
      setShowModal(false)
      setForm(EMPTY_FORM)
      await fetchSubmissions()
    } catch (err) {
      alert('Failed to submit assignment: ' + (err.message || 'Unknown error'))
    } finally {
      setSaving(false)
    }
  }

  const columns = [
    { key: 'assignmentId', label: 'Assignment ID' },
    { key: 'submissionType', label: 'Type' },
    { key: 'submissionDate', label: 'Date', render: (val) => val ? new Date(val).toLocaleDateString() : '-' },
    { key: 'status', label: 'Status', render: (val) => <BadgeStatus status={val} label={val ? val.charAt(0).toUpperCase() + val.slice(1).toLowerCase() : '-'} /> },
    { key: 'marksObtained', label: 'Marks', render: (val) => val != null ? val : '-' },
    { key: 'githubLink', label: 'Link', render: (val) => val ? <a href={val} target="_blank" rel="noreferrer" className="text-primary hover:underline">View</a> : '-' },
  ]

  return (
    <div className="space-y-6">
      <Breadcrumb />
      <BackButton to="/student" />
      
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary">My Submissions</h2>
          <p className="text-text-secondary mt-1">Track and submit your assignments</p>
        </div>
        <button onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-blue-600 transition-colors font-medium">
          <Plus size={18} /> Submit Assignment
        </button>
      </div>

      {loading ? <LoadingState message="Loading submissions..." />
        : error ? <div className="bg-danger/10 border border-danger text-danger p-4 rounded-lg"><p>{error}</p></div>
        : submissions.length === 0 ? <EmptyState icon={CheckSquare} title="No submissions" description="You haven't submitted any assignments yet." />
        : <DataTable columns={columns} data={submissions} />}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Submit Assignment">
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">Assignment ID</label>
            <input type="number" required value={form.assignmentId}
              onChange={e => setForm(prev => ({ ...prev, assignmentId: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">Submission Type</label>
            <select value={form.submissionType}
              onChange={e => setForm(prev => ({ ...prev, submissionType: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors">
              <option value="GITHUB">GitHub Repository</option>
              <option value="FILE">File Upload</option>
              <option value="CODE">Code Snippet</option>
            </select>
          </div>
          {form.submissionType === 'GITHUB' && (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">GitHub Link</label>
              <input type="url" required value={form.githubLink}
                onChange={e => setForm(prev => ({ ...prev, githubLink: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
            </div>
          )}
          {form.submissionType === 'FILE' && (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">File URL</label>
              <input type="url" required value={form.fileUrl}
                onChange={e => setForm(prev => ({ ...prev, fileUrl: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
            </div>
          )}
          {form.submissionType === 'CODE' && (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Code Snippet</label>
              <textarea required rows={4} value={form.codeSnippet}
                onChange={e => setForm(prev => ({ ...prev, codeSnippet: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
            </div>
          )}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setShowModal(false)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-border text-text-secondary hover:bg-background transition-colors">Cancel</button>
            <button type="submit" disabled={saving}
              className="flex-1 px-4 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-blue-600 transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
              {saving ? 'Submitting...' : <><CheckCircle size={18} /> Submit</>}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
