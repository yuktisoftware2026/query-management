export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  onClick,
  disabled = false,
  className = '',
  ...props 
}) => {
  const baseStyles = 'font-medium rounded-md transition-colors duration-200 flex items-center justify-center gap-2'
  
  const variants = {
    primary: 'bg-primary text-surface hover:bg-secondary disabled:bg-gray-400 disabled:cursor-not-allowed',
    secondary: 'bg-gray-100 text-primary hover:bg-gray-200 disabled:bg-gray-50 disabled:cursor-not-allowed',
    outline: 'border border-primary text-primary hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed',
    ghost: 'text-primary hover:bg-background disabled:opacity-50 disabled:cursor-not-allowed',
  }

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
