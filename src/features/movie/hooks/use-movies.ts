'use client'

import api from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import { MovieWithPagination } from '../types/movie'
import { useMovieFiltersStore } from '../store/movie-filters-store'
import { useEffect } from 'react'

export function useMovies() {
  const { setPagination, filters, pagination } = useMovieFiltersStore()

  const { data } = useQuery<MovieWithPagination>({
    queryKey: ['movies', filters, pagination.currentPage],
    queryFn: () =>
      api
        .get('/movies', {
          params: {
            minDuration: filters.minDuration
              ? Number(filters.minDuration)
              : undefined,
            maxDuration: filters.maxDuration
              ? Number(filters.maxDuration)
              : undefined,
            minReleaseDate: filters.minReleaseDate
              ? new Date(filters.minReleaseDate).toISOString()
              : undefined,
            maxReleaseDate: filters.maxReleaseDate
              ? new Date(filters.maxReleaseDate).toISOString()
              : undefined,
            minRating: filters.minRating
              ? Number(filters.minRating)
              : undefined,
            maxRating: filters.maxRating
              ? Number(filters.maxRating)
              : undefined,
            page: pagination.currentPage,
            search: filters.search ? filters.search : undefined,
          },
        })
        .then((res) => res.data),
    retry: 1,
  })

  useEffect(() => {
    if (data) {
      setPagination(data)
    }
  }, [data, setPagination])

  return {}
}
