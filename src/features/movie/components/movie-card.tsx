'use client'

import { MovieItemCard } from './movie-item-card'
import { useMovieFiltersStore } from '../store/movie-filters-store'
import { Loader2 } from 'lucide-react'
import { useMovies } from '../hooks/use-movies'

export function MovieCard() {
  const { pagination } = useMovieFiltersStore()
  useMovies()

  if (!pagination) {
    return (
      <section className="flex justify-center items-center h-[400px]">
        <Loader2 className="size-12 animate-spin" />
      </section>
    )
  }

  return (
    <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {pagination.movies.map((movie, index) => (
        <MovieItemCard key={index} movie={movie} />
      ))}
    </section>
  )
}
