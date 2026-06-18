import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export const BackButton = ({ to = null }) => {
  const navigate = useNavigate()

  const handleBack = () => {
    if (to) {
      navigate(to)
    } else {
      navigate(-1)
    }
  }

  return (
    <button
      onClick={handleBack}
      className="flex items-center gap-2 px-4 py-2 text-primary hover:bg-background rounded-md transition-colors mb-4"
      title="Go back"
    >
      <ArrowLeft size={18} />
      <span className="text-sm font-medium">Back</span>
    </button>
  )
}
