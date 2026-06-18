import { useState, useEffect } from 'react'
import { DataTable, LoadingState } from '@/shared/components'
import { getAllNotes } from '@/modules/student/api/studentApi'

export const Notes = () => {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true)
        const data = await getAllNotes()
        setNotes(Array.isArray(data) ? data : data.data || [])
        setError(null)
      } catch (err) {
        console.log('[v0] Error fetching notes:', err)
        setError(err.message || 'Failed to load notes')
        setNotes([])
      } finally {
        setLoading(false)
      }
    }

    fetchNotes()
  }, [])

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'course', label: 'Course' },
    { key: 'instructor', label: 'Instructor' },
    { key: 'date', label: 'Published' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">Study Notes</h2>
        <p className="text-text-secondary mt-1">Access your course study materials</p>
      </div>
      {loading ? (
        <LoadingState message="Loading notes..." />
      ) : error ? (
        <div className="bg-error/10 border border-error text-error p-4 rounded-lg">{error}</div>
      ) : (
        <DataTable columns={columns} data={notes} />
      )}
    </div>
  )
}
