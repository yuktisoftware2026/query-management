import { Sidebar, Navbar } from '@/shared/components'

export const DashboardLayout = ({ 
  children, 
  sidebarItems, 
  userRole = 'Admin',
  userName = 'User',
  logo = 'LMS'
}) => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar items={sidebarItems} logo={logo} />
      
      <div className="flex-1 lg:ml-64">
        <Navbar userRole={userRole} userName={userName} />
        
        <main className="pt-20 px-6 pb-12">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
