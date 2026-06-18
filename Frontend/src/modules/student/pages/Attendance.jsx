import { useState, useEffect } from 'react'
import { DataTable, BadgeStatus, LoadingState } from '@/shared/components'
import { getAllAttendance } from '@/modules/student/api/studentApi'

export const Attendance = () => {
  const [attendance, setAttendance] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        setLoading(true)
        const data = await getAllAttendance()
        setAttendance(Array.isArray(data) ? data : data.data || [])
        setError(null)
      } catch (err) {
        console.log('[v0] Error fetching attendance:', err)
        setError(err.message || 'Failed to load attendance')
        setAttendance([])
      } finally {
        setLoading(false)
      }
    }

    fetchAttendance()
  }, [])

  const columns = [
    { key: 'course', label: 'Course' },
    { key: 'present', label: 'Present' },
    { key: 'total', label: 'Total Classes' },
    { key: 'percentage', label: 'Attendance %' },
    { key: 'status', label: 'Status', render: (val) => <BadgeStatus status={val} label={val.charAt(0).toUpperCase() + val.slice(1)} /> },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">Attendance Records</h2>
        <p className="text-text-secondary mt-1">Your attendance in each course</p>
      </div>
      {loading ? (
        <LoadingState message="Loading attendance records..." />
      ) : error ? (
        <div className="bg-error/10 border border-error text-error p-4 rounded-lg">{error}</div>
      ) : (
        <DataTable columns={columns} data={attendance} />
      )}
    </div>
  )
}
