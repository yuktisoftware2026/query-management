import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export const Sidebar = ({ items, logo = 'LMS' }) => {
  const [isOpen, setIsOpen] = useState(true)
  const location = useLocation()

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-primary text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-white border-r border-border transition-transform duration-300 ease-in-out z-40 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-16 flex items-center px-6 border-b border-border">
          <div className="flex items-center gap-2">
            {/* Imitating the Brain Station logo with Yukti styles */}
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center p-1 relative overflow-hidden">
               <div className="absolute inset-0.5 bg-white rounded-md"></div>
               <span className="relative text-blue-600 font-black text-sm">Y</span>
            </div>
            <h1 className="text-xl font-bold text-secondary-dark tracking-tight">{logo}</h1>
          </div>
        </div>

        <nav className="mt-6 px-3 space-y-6">
          {items.map((section) => (
            <div key={section.title}>
              {section.title && (
                <h3 className="text-[11px] font-bold text-text-light uppercase tracking-widest px-4 mb-3">
                  {section.title}
                </h3>
              )}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = location.pathname === item.path
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all-smooth relative overflow-hidden ${
                        isActive
                          ? 'bg-surface-hover text-primary font-semibold'
                          : 'text-text-secondary hover:bg-gray-50 hover:text-secondary-dark'
                      }`}
                    >
                      {isActive && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-md"></div>
                      )}
                      <div className={isActive ? 'text-primary' : 'text-text-light'}>
                        {item.icon && <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />}
                      </div>
                      <span className="text-sm">{item.label}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
