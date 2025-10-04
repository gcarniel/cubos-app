import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  MovieRegister,
  movieRegisterSchema,
} from '../types/movies-register-schema'
import { useMutation, useQuery } from '@tanstack/react-query'
import api from '@/lib/api'
import { toast } from 'sonner'
import { useMovieStore } from '../store/movie-store'

export function useMovieRegister() {
  const { setOpenRegisterModal } = useMovieStore()
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

  const { mutateAsync } = useMutation({
    mutationFn: (data: MovieRegister) => api.post('/movies', data),
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
    await mutateAsync(data)
    toast.success('Filme adicionado com sucesso')
    form.reset()
    setOpenRegisterModal(false)
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

  return {
    form,
    handlers: {
      handleUploadFile,
      handleSubmit,
    },
    data: { genres, isUploadingFile },
  }
}
