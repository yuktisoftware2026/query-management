import { useState, useEffect } from 'react'
import { Users, BookOpen, Users2, School, BarChart3, Link2, CheckCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button, LoadingState, Breadcrumb, DashboardCard } from '@/shared/components'
import { getAdminDashboard } from '@/modules/admin/api/adminApi'

// Quick actions for the sidebar panel
const quickActions = [
  { label: 'Add Student', path: '/admin/students', icon: Users },
  { label: 'Add Faculty', path: '/admin/faculty', icon: Users2 },
  { label: 'Add Mentor', path: '/admin/mentors', icon: School },
  { label: 'Manage Courses', path: '/admin/courses', icon: BookOpen },
  { label: 'Manage Batches', path: '/admin/batches', icon: BarChart3 },
  { label: 'Student-Batch', path: '/admin/student-batch', icon: Link2 },
]

export const AdminDashboard = () => {
  const navigate = useNavigate()
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true)
        const data = await getAdminDashboard()
        setDashboardData(data)
        setError(null)
      } catch (err) {
        console.log('[v0] Error fetching dashboard:', err)
        setError(err.message || 'Failed to load dashboard')
        // Use default structure if API fails
        setDashboardData({
          totalStudents: 0,
          totalFaculty: 0,
          totalMentors: 0,
          totalCourses: 0,
          totalBatches: 0,
          activeBatches: 0,
          inactiveBatches: 0,
        })
      } finally {
        setLoading(false)
      }
    }

    fetchDashboard()
  }, [])

  // Map backend DTO fields (totalStudents, totalFaculty, ...) to UI metrics
  const metrics = dashboardData ? [
    { label: 'Total Students', value: dashboardData.totalStudents ?? 0, icon: Users, color: 'accent', path: '/admin/students' },
    { label: 'Active Faculty', value: dashboardData.totalFaculty ?? 0, icon: Users2, color: 'warning', path: '/admin/faculty' },
    { label: 'Mentors', value: dashboardData.totalMentors ?? 0, icon: School, color: 'success', path: '/admin/mentors' },
    { label: 'Courses', value: dashboardData.totalCourses ?? 0, icon: BookOpen, color: 'danger', path: '/admin/courses' },
  ] : []

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb />

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-5xl font-black text-primary mb-2">Admin Dashboard</h1>
          <p className="text-lg text-text-secondary">Manage your institution with real-time insights</p>
        </div>
        <Button>Generate Report</Button>
      </div>

      {loading ? (
        <LoadingState message="Loading dashboard..." />
      ) : error && !dashboardData ? (
        <div className="bg-danger/10 border border-danger text-danger p-4 rounded-lg">
          {error}
        </div>
      ) : (
        <>
          {/* Key Metrics - Premium Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, idx) => {
              const Icon = metric.icon
              return (
                <div key={idx} onClick={() => navigate(metric.path)} className="cursor-pointer">
                  <DashboardCard
                    title={metric.label}
                    value={metric.value}
                    icon={Icon}
                    color={metric.color}
                  />
                </div>
              )
            })}
          </div>

          {/* Academic Overview & Quick Actions */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-6">
              {/* Recent Activity */}
              <div className="bg-card rounded-2xl border border-border p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-black text-dark">Recent Activity</h2>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
                <div className="space-y-4">
                  {[
                    { action: 'New student batch created', type: 'batch', time: '2 hours ago' },
                    { action: 'Faculty submitted assignments', type: 'success', time: '4 hours ago' },
                    { action: 'Attendance marked for Session 101', type: 'default', time: '1 day ago' },
                    { action: 'New course module published', type: 'success', time: '2 days ago' },
                  ].map((activity, idx) => (
                    <div key={idx} className="flex items-center gap-4 py-4 border-b border-border last:border-0 hover:bg-background p-3 rounded-lg transition-colors">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <div className="flex-1">
                        <p className="text-text-primary font-medium">{activity.action}</p>
                        <p className="text-text-light text-sm">{activity.time}</p>
                      </div>
                      <CheckCircle className="w-5 h-5 text-success opacity-0 group-hover:opacity-100" />
                    </div>
                  ))}
                </div>
              </div>

              {/* System Health */}
              <div className="bg-card rounded-2xl border border-border p-8">
                <h2 className="text-2xl font-black text-dark mb-6">System Health</h2>
                <div className="space-y-4">
                  {[
                    { service: 'Database Status', status: 'Healthy', uptime: '99.9%' },
                    { service: 'API Services', status: 'Healthy', uptime: '99.95%' },
                    { service: 'Storage', status: 'Healthy', uptime: '100%' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-background rounded-lg hover:bg-border/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-success" />
                        <div>
                          <p className="font-semibold text-text-primary">{item.service}</p>
                          <p className="text-sm text-text-light">Uptime: {item.uptime}</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-success/10 text-success rounded-full text-sm font-medium">
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar: Quick Actions & Stats */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-card rounded-2xl border border-border p-8">
                <h2 className="text-xl font-black text-dark mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  {quickActions.map((action, idx) => {
                    const Icon = action.icon
                    return (
                      <button
                        key={idx}
                        onClick={() => navigate(action.path)}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-border hover:border-primary hover:bg-blue-50 transition-colors text-left group"
                      >
                        <Icon className="w-5 h-5 text-primary" />
                        <span className="text-sm font-medium text-text-primary group-hover:text-primary transition-colors">
                          {action.label}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Key Statistics Card */}
              <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-8 text-white">
                <h3 className="text-lg font-black mb-4">Academic Overview</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="opacity-90">Total Batches</span>
                    <span className="font-bold">{dashboardData?.totalBatches ?? 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-90">Active Batches</span>
                    <span className="font-bold">{dashboardData?.activeBatches ?? 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-90">Inactive Batches</span>
                    <span className="font-bold">{dashboardData?.inactiveBatches ?? 0}</span>
                  </div>
                  <div className="h-px bg-white/20 my-2"></div>
                  <div className="flex justify-between font-bold">
                    <span>Total Courses</span>
                    <span>{dashboardData?.totalCourses ?? 0}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
