import { useState, useEffect } from 'react'
import { DashboardLayout } from '@/shared/layouts/DashboardLayout'
import { DashboardCard, LoadingState } from '@/shared/components'
import { getMentorDashboard } from '@/modules/mentor/api/mentorApi'
import { Users, Clock, Grid3X3, BookOpen } from 'lucide-react'

export const MentorDashboard = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const mentorId = 1; // Hardcoded until auth is ready

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true)
        const res = await getMentorDashboard(mentorId)
        setData(res)
        setError(null)
      } catch (err) {
        console.error('Failed to load mentor dashboard:', err)
        setError(err.message || 'Failed to load dashboard data')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboard()
  }, [])

  const sidebarItems = [
    {
      title: 'Dashboard',
      items: [
        { label: 'Dashboard', path: '/mentor', icon: Grid3X3 },
      ],
    },
    {
      title: 'Management',
      items: [
        { label: 'Students', path: '/mentor/students', icon: Users },
        { label: 'Attendance', path: '/mentor/attendance', icon: Clock },
      ],
    },
  ]

  const dashboardCards = [
    { title: 'Batches', value: data?.assignedBatches ?? '-', icon: BookOpen, description: 'Assigned batches' },
    { title: 'Mentees', value: data?.totalStudents ?? '-', icon: Users, description: 'Assigned students' },
    { title: 'Sessions', value: data?.sessions ?? '-', icon: Clock, description: 'Total sessions' },
  ]

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems}
      userRole="Mentor"
      userName="Mentor User"
      logo="LMS Mentor"
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Mentor Dashboard</h1>
          <p className="text-text-secondary mt-2">Monitor your mentees' progress and attendance</p>
        </div>

        {loading ? (
          <LoadingState message="Loading dashboard data..." />
        ) : error ? (
          <div className="bg-danger/10 border border-danger text-danger p-4 rounded-lg">
            <p className="font-medium">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardCards.map((card, idx) => (
              <DashboardCard 
                key={idx}
                {...card}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
