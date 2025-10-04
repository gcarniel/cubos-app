import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  MovieFilters,
  movieFiltersSchema,
} from '../movie/types/movies-filters-schema'
import { useMovies } from './use-movies'

export function useMovieFilters() {
  const { data } = useMovies()
  const form = useForm<MovieFilters>({
    resolver: zodResolver(movieFiltersSchema),
    defaultValues: {
      minDuration: '',
      maxDuration: '',
      minReleaseDate: '',
      maxReleaseDate: '',
      minVoteAverage: '',
      maxVoteAverage: '',
    },
  })

  console.log(form.formState.errors)

  const handleSubmit = (data: MovieFilters) => {
    console.log(data)
  }

  return {
    form,
    handlers: {
      handleSubmit,
    },
  }
}
