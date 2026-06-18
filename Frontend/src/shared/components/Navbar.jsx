import { Bell, Mail, Calendar, Coins, DollarSign, ChevronDown, Shield, Users, BookOpen, UserCheck, LogOut } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export const Navbar = ({ userRole = 'Admin', userName = 'User' }) => {
  const navigate = useNavigate()
  const [showRoleMenu, setShowRoleMenu] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const menuRef = useRef(null)
  const profileRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowRoleMenu(false)
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const roles = [
    { name: 'Admin', path: '/admin', icon: Shield },
    { name: 'Faculty', path: '/faculty', icon: Users },
    { name: 'Student', path: '/student', icon: BookOpen },
    { name: 'Mentor', path: '/mentor', icon: UserCheck },
  ]

  const handleLogout = () => {
    navigate('/login')
  }

  return (
    <nav className="fixed top-0 left-0 lg:left-64 right-0 h-16 bg-primary border-b border-primary-dark z-20 transition-all-smooth text-white flex items-center justify-between px-6">
      
      {/* Left Side: Role Switcher Only */}
      <div className="flex items-center gap-6">
        {/* Quick Role Switcher (Keeping this utility but styling it for the new theme) */}
        <div className="relative hidden sm:block" ref={menuRef}>
          <button 
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className="flex items-center gap-2 px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors"
          >
            <span>{userRole} Portal</span>
            <ChevronDown size={14} />
          </button>
          
          {showRoleMenu && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 text-text-primary border border-border animate-scale-in">
              {roles.map((role) => (
                <Link
                  key={role.name}
                  to={role.path}
                  onClick={() => setShowRoleMenu(false)}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-surface-hover text-sm"
                >
                  <role.icon size={16} className="text-text-secondary" />
                  {role.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Side: Actions & Profile */}
      <div className="flex items-center gap-6">
        
        {/* Icons */}
        <div className="hidden md:flex items-center gap-5">
          <button className="relative hover:text-blue-200 transition-colors">
            <Bell size={18} fill="currentColor" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full"></span>
          </button>
          <button className="hover:text-blue-200 transition-colors">
            <Mail size={18} fill="currentColor" />
          </button>
          <button className="hover:text-blue-200 transition-colors">
            <Calendar size={18} />
          </button>
        </div>

        {/* Points Pill removed per user request */}

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3 hover:bg-white/10 p-1.5 pr-3 rounded-full transition-colors"
          >
            <div className="w-8 h-8 bg-blue-300 rounded-full border-2 border-white overflow-hidden">
              <img src={`https://ui-avatars.com/api/?name=${userName}&background=0D8ABC&color=fff`} alt={userName} className="w-full h-full object-cover" />
            </div>
            <div className="hidden sm:flex items-center gap-1">
              <span className="text-sm font-medium">Hi, {userName.split(' ')[0]}</span>
              <ChevronDown size={14} />
            </div>
          </button>

          {showProfileMenu && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 text-text-primary border border-border animate-scale-in">
              <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-surface-hover text-sm text-text-secondary">
                Profile Settings
              </button>
              <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 hover:bg-danger/10 text-sm text-danger mt-1 border-t border-border pt-3">
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
