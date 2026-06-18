import { ChevronLeft, ChevronRight, Search } from 'lucide-react'
import { useState } from 'react'

export const DataTable = ({ 
  columns, 
  data, 
  onRowClick,
  searchable = true,
  pageable = true,
  itemsPerPage = 10,
}) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredData = data.filter((item) =>
    columns.some((col) =>
      String(item[col.key])
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
  )

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const paginatedData = filteredData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  )

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
      {/* Search */}
      {searchable && (
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-light" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(0)
              }}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-30 text-sm"
            />
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-background">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wide"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, idx) => (
                <tr
                  key={idx}
                  onClick={() => onRowClick?.(row)}
                  className="border-b border-border hover:bg-primary/5 transition-colors cursor-pointer"
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="px-6 py-4 text-sm text-text-primary"
                    >
                      {col.render
                        ? col.render(row[col.key], row)
                        : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-8 text-center text-text-secondary"
                >
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pageable && totalPages > 1 && (
        <div className="px-6 py-4 border-t border-border bg-background flex items-center justify-between">
          <div className="text-xs text-text-secondary font-medium">
            Showing {currentPage * itemsPerPage + 1} to{' '}
            {Math.min((currentPage + 1) * itemsPerPage, filteredData.length)} of{' '}
            {filteredData.length}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className="p-2 rounded-md border border-border hover:bg-surface disabled:opacity-50 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`w-8 h-8 rounded-md text-sm font-medium transition-colors ${
                    currentPage === i
                      ? 'bg-primary text-surface'
                      : 'border border-border hover:bg-surface'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages - 1, currentPage + 1))
              }
              disabled={currentPage === totalPages - 1}
              className="p-2 rounded-md border border-border hover:bg-surface disabled:opacity-50 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
