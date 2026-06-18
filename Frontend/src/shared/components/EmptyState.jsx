import { AlertCircle } from 'lucide-react'

export const EmptyState = ({ 
  icon: Icon = AlertCircle, 
  title = 'No data found', 
  description = 'There is no data to display',
  action,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-96 text-center">
      <div className="mb-4 p-4 bg-yellow-50 rounded-lg">
        <Icon className="w-12 h-12 text-accent" />
      </div>
      <h3 className="text-lg font-bold text-primary mb-2">{title}</h3>
      <p className="text-text-secondary mb-6 max-w-sm text-sm">{description}</p>
      {action && <>{action}</>}
    </div>
  )
}
