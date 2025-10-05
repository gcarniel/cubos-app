import { MovieDetailsWrapper } from '@/features/movie/components/movie-details-wrapper'

export default async function MoviePage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = await params

  return <MovieDetailsWrapper id={id} />
}
