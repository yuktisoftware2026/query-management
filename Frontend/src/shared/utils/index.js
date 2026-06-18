// Utility functions for the LMS

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export const formatTime = (time) => {
  return new Date(time).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

export const getInitials = (name) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

export const getStatusColor = (status) => {
  const colors = {
    active: 'green',
    inactive: 'gray',
    pending: 'yellow',
    completed: 'blue',
    failed: 'red',
  }
  return colors[status] || 'gray'
}

// Mock API call placeholder
export const mockApiCall = async (data = null, delay = 500) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, delay)
  })
}
