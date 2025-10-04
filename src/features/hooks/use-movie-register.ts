import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  MovieRegister,
  movieRegisterSchema,
} from '../movie/types/movies-register-schema'
import { useMutation, useQuery } from '@tanstack/react-query'
import api from '@/lib/api'
import { toast } from 'sonner'

export function useMovieRegister() {
  const form = useForm<MovieRegister>({
    resolver: zodResolver(movieRegisterSchema),
    defaultValues: {
      title: '',
      originalTitle: '',
      duration: 0,
      budget: 0,
      revenue: 0,
      profit: 0,
      sinopsis: '',
      genre: [],
      language: '',
      releaseDate: new Date(),
      popularity: 0,
      voteAverage: 0,
      voteCount: 0,
      posterUrl: '',
      coverUrl: '',
      trailerUrl: '',
    },
  })

  const { mutateAsync } = useMutation({
    mutationFn: (data: MovieRegister) => api.post('/movies', data),
  })

  const { data: genres } = useQuery({
    queryKey: ['genres'],
    queryFn: () => api.get('/movies/genres').then((res) => res.data),
    retry: 1,
  })

  const handleSubmit = async (data: MovieRegister) => {
    await mutateAsync(data)
    toast.success('Filme adicionado com sucesso')
  }

  return {
    form,
    handlers: {
      handleSubmit,
    },
    data: { genres },
  }
}
