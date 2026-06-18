import { Outlet } from 'react-router-dom'
import { DashboardLayout } from '@/shared/layouts/DashboardLayout'
import { BarChart3, BookOpen, FileText, CheckSquare, Clock, Users, Home } from 'lucide-react'

export const FacultyLayoutComponent = () => {
  const sidebarItems = [
    {
      title: 'Overview',
      items: [
        { label: 'Dashboard', path: '/faculty', icon: BarChart3 },
        { label: 'Home', path: '/', icon: Home },
      ],
    },
    {
      title: 'Teaching',
      items: [
        { label: 'Modules', path: '/faculty/modules', icon: BookOpen },
        { label: 'Notes', path: '/faculty/notes', icon: FileText },
        { label: 'Assignments', path: '/faculty/assignments', icon: CheckSquare },
      ],
    },
    {
      title: 'Management',
      items: [
        { label: 'Sessions', path: '/faculty/sessions', icon: Clock },
        { label: 'Attendance', path: '/faculty/attendance', icon: Users },
        { label: 'Submissions', path: '/faculty/submissions', icon: CheckSquare },
      ],
    },
  ]

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems}
      userRole="Faculty"
      userName="Faculty User"
      logo="YUKTI LMS"
    >
      <Outlet />
    </DashboardLayout>
  )
}
