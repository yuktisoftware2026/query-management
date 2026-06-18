export const LoadingState = ({ message = 'Loading...' }) => {
  return (
    <div className="flex items-center justify-center min-h-96">
      <div className="text-center">
        <div className="inline-block">
          <div className="w-12 h-12 border-4 border-border border-t-accent rounded-full animate-spin" />
        </div>
        <p className="mt-4 text-text-secondary font-medium">{message}</p>
      </div>
    </div>
  )
}
