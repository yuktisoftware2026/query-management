import { Outlet } from 'react-router-dom'
import { DashboardLayout } from '@/shared/layouts/DashboardLayout'
import { BarChart3, BookOpen, CheckSquare, Users, Home } from 'lucide-react'

export const StudentLayoutComponent = () => {
  const sidebarItems = [
    {
      title: 'Overview',
      items: [
        { label: 'Dashboard', path: '/student', icon: BarChart3 },
        { label: 'Home', path: '/', icon: Home },
      ],
    },
    {
      title: 'Learning',
      items: [
        { label: 'Notes', path: '/student/notes', icon: BookOpen },
        { label: 'Assignments', path: '/student/assignments', icon: CheckSquare },
        { label: 'Submissions', path: '/student/submissions', icon: CheckSquare },
      ],
    },
    {
      title: 'Progress',
      items: [
        { label: 'Attendance', path: '/student/attendance', icon: Users },
      ],
    },
  ]

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems}
      userRole="Student"
      userName="Student User"
      logo="YUKTI LMS"
    >
      <Outlet />
    </DashboardLayout>
  )
}
