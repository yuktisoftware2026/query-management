import { useState, useEffect } from 'react'
import { DataTable, LoadingState } from '@/shared/components'
import { getAllAttendance } from '@/modules/mentor/api/mentorApi'

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
    { key: 'date', label: 'Date' },
    { key: 'present', label: 'Present' },
    { key: 'absent', label: 'Absent' },
    { key: 'total', label: 'Total' },
    { key: 'percentage', label: 'Attendance %' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">Attendance Records</h2>
        <p className="text-text-secondary mt-1">View batch attendance history</p>
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
