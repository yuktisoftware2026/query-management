export const DashboardCard = ({ title, value, icon: Icon, description, onClick, className = '', color = 'accent' }) => {
  const colorClasses = {
    accent: 'bg-yellow-50 text-accent',
    success: 'bg-green-50 text-success',
    warning: 'bg-orange-50 text-warning',
    danger: 'bg-red-50 text-danger',
  }

  return (
    <div
      onClick={onClick}
      className={`bg-white border border-border rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer animate-fade-in ${className}`}
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-text-secondary font-medium text-sm uppercase tracking-wide">{title}</h3>
        {Icon && (
          <div className={`p-2 rounded-md ${colorClasses[color]}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      <div className="mb-2">
        <p className="text-4xl font-black text-primary">{value}</p>
      </div>
      {description && (
        <p className="text-text-light text-xs font-medium">{description}</p>
      )}
    </div>
  )
}
