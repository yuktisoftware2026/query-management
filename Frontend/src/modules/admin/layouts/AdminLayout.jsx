import { Outlet } from 'react-router-dom'
import { DashboardLayout } from '@/shared/layouts/DashboardLayout'
import { BarChart3, Users, Users2, School, BookOpen, Link2, Home } from 'lucide-react'

export const AdminLayoutComponent = () => {
  const sidebarItems = [
    {
      title: 'Overview',
      items: [
        { label: 'Dashboard', path: '/admin', icon: BarChart3 },
        { label: 'Home', path: '/', icon: Home },
      ],
    },
    {
      title: 'User Management',
      items: [
        { label: 'Students', path: '/admin/students', icon: Users },
        { label: 'Faculty', path: '/admin/faculty', icon: Users2 },
        { label: 'Mentors', path: '/admin/mentors', icon: School },
      ],
    },
    {
      title: 'Academic',
      items: [
        { label: 'Courses', path: '/admin/courses', icon: BookOpen },
        { label: 'Batches', path: '/admin/batches', icon: Users },
        { label: 'Student-Batch', path: '/admin/student-batch', icon: Link2 },
      ],
    },
  ]

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems}
      userRole="Administrator"
      userName="Admin User"
      logo="YUKTI LMS"
    >
      <Outlet />
    </DashboardLayout>
  )
}
