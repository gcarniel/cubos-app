'use client'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { useEffect, useState } from 'react'

interface PaginationCustomProps {
  page: number
  totalPages: number
  onPreviousPage: () => void
  onNextPage: () => void
  onSetPage: (page: number) => void
}

export function PaginationCustom({
  page,
  totalPages,
  onPreviousPage,
  onNextPage,
  onSetPage,
}: PaginationCustomProps) {
  const isFirstPage = page === 1
  const isLastPage = page === totalPages

  const [isMobile, setIsMobile] = useState(false)

  const maxPagesToShow = isMobile ? 3 : 5

  const getPageRange = () => {
    const pages: number[] = []

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
      return pages
    }

    let start = Math.max(1, page - 2)
    const end = Math.min(totalPages, start + maxPagesToShow - 1)

    if (end - start < maxPagesToShow - 1) {
      start = Math.max(1, end - maxPagesToShow + 1)
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    return pages
  }

  const pagesToShow = getPageRange()

  useEffect(() => {
    if (typeof window === 'undefined') return
    const handleResize = () => {
      setIsMobile(window.innerWidth < 480)
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <Pagination className="mt-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            isActive={isFirstPage}
            href={'#'}
            onClick={onPreviousPage}
            className={isFirstPage ? 'pointer-events-none' : 'cursor-pointer'}
            aria-disabled={isFirstPage}
          />
        </PaginationItem>

        {pagesToShow.map((p) => {
          const isActive = p === page
          return (
            <PaginationItem key={p} onClick={() => onSetPage(p)}>
              <PaginationLink href="#" isActive={isActive}>
                {p}
              </PaginationLink>
            </PaginationItem>
          )
        })}

        {isMobile && page !== totalPages && (
          <PaginationItem className="cursor-not-allowed">
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            isActive={isLastPage}
            href={'#'}
            onClick={onNextPage}
            className={isLastPage ? 'pointer-events-none' : 'cursor-pointer'}
            aria-disabled={isLastPage}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
