import { movies } from '../types/movies-mock'
import { MovieItemCard } from './movie-item-card'

export function MovieCard() {
  return (
    <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {movies.map((movie, index) => (
        <MovieItemCard key={index} movie={movie} />
      ))}
    </section>
  )
}
