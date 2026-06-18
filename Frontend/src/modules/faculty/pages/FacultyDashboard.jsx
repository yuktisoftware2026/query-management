import { useState, useEffect } from 'react'
import { DashboardLayout } from '@/shared/layouts/DashboardLayout'
import { DashboardCard, LoadingState } from '@/shared/components'
import { getFacultyDashboard } from '@/modules/faculty/api/facultyApi'
import { BookOpen, FileText, CheckSquare, Calendar, Clock, Send, Grid3X3 } from 'lucide-react'

export const FacultyDashboard = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Hardcoded ID for now since auth isn't fully set up yet
  const facultyId = 1;

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true)
        const res = await getFacultyDashboard(facultyId)
        setData(res)
        setError(null)
      } catch (err) {
        console.error('Failed to load faculty dashboard:', err)
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
        { label: 'Dashboard', path: '/faculty', icon: Grid3X3 },
      ],
    },
    {
      title: 'Teaching',
      items: [
        { label: 'Modules', path: '/faculty/modules', icon: BookOpen },
        { label: 'Notes', path: '/faculty/notes', icon: FileText },
      ],
    },
    {
      title: 'Assignments',
      items: [
        { label: 'Assignments', path: '/faculty/assignments', icon: CheckSquare },
        { label: 'Submission Review', path: '/faculty/submissions', icon: Send },
      ],
    },
    {
      title: 'Classes',
      items: [
        { label: 'Sessions', path: '/faculty/sessions', icon: Calendar },
        { label: 'Attendance', path: '/faculty/attendance', icon: Clock },
      ],
    },
  ]

  const dashboardCards = [
    { title: 'Batches', value: data?.assignedBatches ?? '-', icon: BookOpen, description: 'Assigned batches' },
    { title: 'Students', value: data?.totalStudents ?? '-', icon: BookOpen, description: 'Total students' },
    { title: 'Notes', value: data?.notesUploaded ?? '-', icon: FileText, description: 'Notes uploaded' },
    { title: 'Assignments', value: data?.assignmentsCreated ?? '-', icon: CheckSquare, description: 'Assignments created' },
    { title: 'Sessions', value: data?.sessionsCreated ?? '-', icon: Calendar, description: 'Sessions created' },
  ]

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems}
      userRole="Faculty"
      userName="Faculty User"
      logo="LMS Faculty"
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Faculty Dashboard</h1>
          <p className="text-text-secondary mt-2">Manage your courses, assignments, and sessions</p>
        </div>

        {loading ? (
          <LoadingState message="Loading dashboard data..." />
        ) : error ? (
          <div className="bg-danger/10 border border-danger text-danger p-4 rounded-lg">
            <p className="font-medium">{error}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {dashboardCards.map((card, idx) => (
                <DashboardCard 
                  key={idx}
                  {...card}
                />
              ))}
            </div>
            
            {/* Remove hardcoded sections for now until backend provides them */}
          </>
        )}
      </div>
    </DashboardLayout>
  )
}
