export const StatCard = ({ number, label, icon: Icon }) => {
  return (
    <div className="flex flex-col items-center justify-center py-8 px-6 bg-surface rounded-lg border border-border hover:border-accent transition-colors">
      {Icon && <Icon className="w-8 h-8 text-accent mb-3" />}
      <div className="text-5xl font-black text-accent mb-2">{number}</div>
      <div className="text-text-secondary text-center text-sm font-medium">{label}</div>
    </div>
  )
}
