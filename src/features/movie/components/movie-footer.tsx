'use client'

import { PaginationCustom } from '@/components/pagination'

const pagination = {
  totalItems: 100,
  totalPages: 10,
  currentPage: 1,
}

export function MovieFooter() {
  return (
    <div>
      <PaginationCustom
        page={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPreviousPage={() => pagination.currentPage--}
        onNextPage={() => pagination.currentPage++}
        onSetPage={(page) => (pagination.currentPage = page)}
      />
    </div>
  )
}
