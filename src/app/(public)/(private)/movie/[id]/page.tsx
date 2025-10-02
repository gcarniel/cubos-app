import { MovieDetails } from '@/features/movie/components/movie-details'

export default async function MoviePage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = await params

  return <MovieDetails id={id} />
}
