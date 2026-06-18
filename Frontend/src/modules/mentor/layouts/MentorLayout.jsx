import { Outlet } from 'react-router-dom'
import { DashboardLayout } from '@/shared/layouts/DashboardLayout'
import { BarChart3, Users, Home } from 'lucide-react'

export const MentorLayoutComponent = () => {
  const sidebarItems = [
    {
      title: 'Overview',
      items: [
        { label: 'Dashboard', path: '/mentor', icon: BarChart3 },
        { label: 'Home', path: '/', icon: Home },
      ],
    },
    {
      title: 'Mentorship',
      items: [
        { label: 'Students', path: '/mentor/students', icon: Users },
        { label: 'Attendance', path: '/mentor/attendance', icon: Users },
      ],
    },
  ]

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems}
      userRole="Mentor"
      userName="Mentor User"
      logo="YUKTI LMS"
    >
      <Outlet />
    </DashboardLayout>
  )
}
