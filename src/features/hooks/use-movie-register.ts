import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  MovieRegister,
  movieRegisterSchema,
} from '../movie/types/movies-register-schema'

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

  const handleSubmit = (data: MovieRegister) => {
    console.log(data)
  }

  return {
    form,
    handlers: {
      handleSubmit,
    },
  }
}
