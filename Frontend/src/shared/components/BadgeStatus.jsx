export const BadgeStatus = ({ status, label }) => {
  const statusStyles = {
    active: 'bg-green-50 text-green-700 border-green-200',
    inactive: 'bg-gray-100 text-gray-700 border-gray-200',
    pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    completed: 'bg-accent/10 text-accent border-accent/20',
    failed: 'bg-danger/10 text-danger border-danger/20',
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1.5 rounded-md text-xs font-semibold border ${
        statusStyles[status] || statusStyles.inactive
      }`}
    >
      {label}
    </span>
  )
}
