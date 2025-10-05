'use client'

import api from '@/lib/api'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Movie } from '../types/movie'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export function useMovieDetail(id: string) {
  const router = useRouter()
  const { data: session } = useSession()
  const { data, isLoading, isFetching } = useQuery<Movie>({
    queryKey: ['movies-detail', id],
    queryFn: () => api.get(`/movies/${id}`).then((res) => res.data),
    retry: 1,
  })

  const { mutate: deleteMovie } = useMutation({
    mutationFn: (id: string) =>
      api.delete(`/movies/${id}`).then((res) => res.data),
    onSuccess: () => {
      toast.success('Filme deletado com sucesso')
      router.push('/')
    },
    onError: () => {
      toast.error('Erro ao deletar filme')
    },
  })

  const handleDeleteMovie = async (movie: Movie) => {
    if (!movie.id) return

    if (session?.user?.id !== movie.user.id) {
      toast.warning('Acesso negado', {
        description:
          'Você não tem permissão para deletar filme cadastrado por outro usuário',
      })
      return
    }
    deleteMovie(movie.id)
  }

  return {
    data,
    handleDeleteMovie,
    isLoading,
    isFetching,
  }
}
