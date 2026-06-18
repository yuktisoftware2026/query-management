import { useState, useEffect } from 'react'
import { DataTable, BadgeStatus, LoadingState, Breadcrumb, BackButton, EmptyState } from '@/shared/components'
import { getAllSubmissions } from '@/modules/faculty/api/facultyApi'
import { CheckSquare } from 'lucide-react'

export const Submissions = () => {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true)
        const data = await getAllSubmissions()
        setSubmissions(Array.isArray(data) ? data : data.data || [])
        setError(null)
      } catch (err) {
        console.log('[v0] Error fetching submissions:', err)
        setError(err.message || 'Failed to load submissions')
        setSubmissions([])
      } finally {
        setLoading(false)
      }
    }

    fetchSubmissions()
  }, [])

  const columns = [
    { key: 'assignmentId', label: 'Assignment ID' },
    { key: 'studentId', label: 'Student ID' },
    { key: 'submissionType', label: 'Type' },
    { key: 'marks', label: 'Marks', render: (val) => val ?? '-' },
    { key: 'feedback', label: 'Feedback', render: (val) => val ?? '-' },
    { key: 'status', label: 'Status', render: (val) => <BadgeStatus status={val} label={val ? val.charAt(0).toUpperCase() + val.slice(1).toLowerCase() : '-'} /> },
  ]

  return (
    <div className="space-y-6">
      <Breadcrumb />
      <BackButton to="/faculty" />
      <div>
        <h2 className="text-2xl font-bold text-primary">Submissions</h2>
        <p className="text-text-secondary mt-1">Review and grade student submissions</p>
      </div>
      {loading ? (
        <LoadingState message="Loading submissions..." />
      ) : error ? (
        <div className="bg-danger/10 border border-danger text-danger p-4 rounded-lg"><p className="font-medium">{error}</p></div>
      ) : submissions.length === 0 ? (
        <EmptyState icon={CheckSquare} title="No submissions" description="No submissions received yet." />
      ) : (
        <DataTable columns={columns} data={submissions} />
      )}
    </div>
  )
}
