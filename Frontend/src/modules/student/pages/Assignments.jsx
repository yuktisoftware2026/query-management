import { useState, useEffect } from 'react'
import { DataTable, BadgeStatus, LoadingState } from '@/shared/components'
import { getAllAssignments } from '@/modules/student/api/studentApi'

export const Assignments = () => {
  const [assignments, setAssignments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true)
        const data = await getAllAssignments()
        setAssignments(Array.isArray(data) ? data : data.data || [])
        setError(null)
      } catch (err) {
        console.log('[v0] Error fetching assignments:', err)
        setError(err.message || 'Failed to load assignments')
        setAssignments([])
      } finally {
        setLoading(false)
      }
    }

    fetchAssignments()
  }, [])

  const columns = [
    { key: 'title', label: 'Assignment' },
    { key: 'course', label: 'Course' },
    { key: 'dueDate', label: 'Due Date' },
    { key: 'status', label: 'Status', render: (val) => <BadgeStatus status={val} label={val.charAt(0).toUpperCase() + val.slice(1)} /> },
    { key: 'score', label: 'Score' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">Assignments</h2>
        <p className="text-text-secondary mt-1">Your assignments and submissions</p>
      </div>
      {loading ? (
        <LoadingState message="Loading assignments..." />
      ) : error ? (
        <div className="bg-error/10 border border-error text-error p-4 rounded-lg">{error}</div>
      ) : (
        <DataTable columns={columns} data={assignments} />
      )}
    </div>
  )
}
