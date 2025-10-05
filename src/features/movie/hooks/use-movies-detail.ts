'use client'

import api from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import { Movie } from '../types/movie'

export function useMovieDetail(id: string) {
  const { data } = useQuery<Movie>({
    queryKey: ['movies-detail', id],
    queryFn: () => api.get(`/movies/${id}`).then((res) => res.data),
    retry: 1,
  })

  return {
    data,
  }
}
