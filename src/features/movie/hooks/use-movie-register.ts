import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  MovieRegister,
  movieRegisterSchema,
} from '../types/movies-register-schema'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/api'
import { toast } from 'sonner'
import { useMovieStore } from '../store/movie-store'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'

export function useMovieRegister() {
  const { data: session } = useSession()
  const { setOpenRegisterModal, movie, setMovie } = useMovieStore()
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
      coverUrl: null,
      trailerUrl: '',
    },
  })

  const queryClient = useQueryClient()

  const { mutateAsync: createMovie } = useMutation({
    mutationFn: (data: MovieRegister) => api.post('/movies', data),
    onSuccess: () => {
      toast.success('Filme adicionado com sucesso')
      form.reset()
      setOpenRegisterModal(false)
    },
  })

  const { mutateAsync: updateMovie } = useMutation({
    mutationFn: (data: MovieRegister) => api.put(`/movies/${data.id}`, data),
    onSuccess: () => {
      toast.success('Filme editado com sucesso')
      form.reset()

      queryClient.invalidateQueries({
        queryKey: ['movies-detail', movie?.id],
      })
      setMovie(null)
      setOpenRegisterModal(false)
    },
  })

  const { mutateAsync: uploadFile, isPending: isUploadingFile } = useMutation({
    mutationFn: (formData: FormData) =>
      api.post('/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
  })

  const { data: genres } = useQuery({
    queryKey: ['genres'],
    queryFn: () => api.get('/movies/genres').then((res) => res.data),
    retry: 1,
  })

  const handleSubmit = async (data: MovieRegister) => {
    if (data.id) {
      if (!movie?.id) return
      if (session?.user?.id !== movie.userId) {
        toast.warning('Acesso negado', {
          description:
            'Você não tem permissão para editar filme cadastrado por outro usuário',
        })
        return
      }
      await updateMovie({ ...data, id: movie?.id })
    } else {
      await createMovie(data)
    }
  }

  const handleUploadFile = async (file: File) => {
    if (!file) return

    if (file.size > 1024 * 1024 * 5) {
      toast.error('Arquivo deve ter no máximo 5MB')
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    const response = await uploadFile(formData)
    toast.success('Arquivo enviado com sucesso')
    return response.data
  }

  useEffect(() => {
    if (movie) {
      form.reset({
        id: movie.id,
        title: movie.title,
        originalTitle: movie.originalTitle,
        duration: movie.duration,
        budget: movie.budget,
        revenue: movie.revenue,
        profit: movie.profit,
        sinopsis: movie.sinopsis,
        genre: movie.genre,
        language: movie.language,
        releaseDate: movie.releaseDate
          ? new Date(movie.releaseDate)
          : new Date(),
        popularity: movie.popularity,
        voteAverage: movie.voteAverage,
        voteCount: movie.voteCount,
        posterUrl: movie.posterUrl,
        coverUrl: movie.coverUrl,
        trailerUrl: movie.trailerUrl,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movie])

  return {
    form,
    handlers: {
      handleUploadFile,
      handleSubmit,
    },
    data: { genres, isUploadingFile },
  }
}
