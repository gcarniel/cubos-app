import api from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

export function useMovies() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['movies'],
    queryFn: () => api.get('/movies').then((res) => res.data),
    retry: 1,
  })

  return {
    data,
    isLoading,
    error,
  }
}
