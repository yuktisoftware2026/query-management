import { useState, useEffect } from 'react'
import { DataTable, LoadingState, Breadcrumb, BackButton, EmptyState } from '@/shared/components'
import { getAllAttendance } from '@/modules/faculty/api/facultyApi'
import { Users } from 'lucide-react'

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
    { key: 'date', label: 'Date' },
    { key: 'present', label: 'Present' },
    { key: 'absent', label: 'Absent' },
    { key: 'percentage', label: 'Attendance %' },
  ]

  return (
    <div className="space-y-6">
      <Breadcrumb />
      <BackButton to="/faculty" />
      
      <div>
        <h2 className="text-2xl font-bold text-primary">Attendance</h2>
        <p className="text-text-secondary mt-1">Track and manage student attendance</p>
      </div>

      {loading ? (
        <LoadingState message="Loading attendance records..." />
      ) : error ? (
        <div className="bg-danger/10 border border-danger text-danger p-4 rounded-lg">
          <p className="font-medium">{error}</p>
        </div>
      ) : attendance.length === 0 ? (
        <EmptyState 
          icon={Users}
          title="No attendance records"
          description="No attendance records yet."
        />
      ) : (
        <DataTable columns={columns} data={attendance} />
      )}
    </div>
  )
}
