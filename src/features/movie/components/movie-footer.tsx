'use client'

import { PaginationCustom } from '@/components/pagination'
import { useMovieFiltersStore } from '../store/movie-filters-store'

export function MovieFooter() {
  const { pagination } = useMovieFiltersStore()
  const { setPagination } = useMovieFiltersStore()

  const handleSetPage = (page: number) => {
    setPagination({ ...pagination, currentPage: page })
  }

  const handlePreviousPage = () => {
    setPagination({ ...pagination, currentPage: pagination.currentPage - 1 })
  }

  const handleNextPage = () => {
    setPagination({ ...pagination, currentPage: pagination.currentPage + 1 })
  }

  return (
    <div>
      <PaginationCustom
        page={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPreviousPage={handlePreviousPage}
        onNextPage={handleNextPage}
        onSetPage={handleSetPage}
      />
    </div>
  )
}
