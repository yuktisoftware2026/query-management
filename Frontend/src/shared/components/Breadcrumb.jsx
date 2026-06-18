import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

export const Breadcrumb = () => {
  const location = useLocation()
  const pathSegments = location.pathname.split('/').filter(Boolean)

  const breadcrumbs = [
    { label: 'Home', path: '/' },
    ...pathSegments.map((segment, index) => {
      const path = '/' + pathSegments.slice(0, index + 1).join('/')
      const label = segment.charAt(0).toUpperCase() + segment.slice(1)
      return { label, path }
    }),
  ]

  return (
    <nav className="flex items-center gap-2 mb-6">
      <Link
        to="/"
        className="flex items-center gap-1 text-text-secondary hover:text-primary transition-colors"
        title="Go to home"
      >
        <Home size={16} />
        <span className="text-sm">Home</span>
      </Link>

      {breadcrumbs.slice(1).map((crumb, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <ChevronRight size={16} className="text-border" />
          {idx === breadcrumbs.length - 2 ? (
            <span className="text-sm font-medium text-primary">{crumb.label}</span>
          ) : (
            <Link
              to={crumb.path}
              className="text-sm text-text-secondary hover:text-primary transition-colors"
            >
              {crumb.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}
