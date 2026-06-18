import { useState, useEffect } from 'react'
import { DataTable, BadgeStatus, LoadingState } from '@/shared/components'
import { getAllStudents } from '@/modules/mentor/api/mentorApi'

export const Students = () => {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true)
        const data = await getAllStudents()
        setStudents(Array.isArray(data) ? data : data.data || [])
        setError(null)
      } catch (err) {
        console.log('[v0] Error fetching students:', err)
        setError(err.message || 'Failed to load students')
        setStudents([])
      } finally {
        setLoading(false)
      }
    }

    fetchStudents()
  }, [])

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'id', label: 'Student ID' },
    { key: 'batch', label: 'Batch' },
    { key: 'attendance', label: 'Attendance' },
    { key: 'status', label: 'Status', render: (val) => <BadgeStatus status={val} label={val.charAt(0).toUpperCase() + val.slice(1)} /> },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">My Mentees</h2>
        <p className="text-text-secondary mt-1">Track and manage your mentees</p>
      </div>
      {loading ? (
        <LoadingState message="Loading mentees..." />
      ) : error ? (
        <div className="bg-error/10 border border-error text-error p-4 rounded-lg">{error}</div>
      ) : (
        <DataTable columns={columns} data={students} />
      )}
    </div>
  )
}
