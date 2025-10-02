import { redirect } from 'next/navigation'
import { checkUser } from '@/lib/check-user'
import { routesMap } from '@/routes'
import { MovieFooter } from '@/features/movie/components/movie-footer'
import { MoviesDashboard } from '@/features/movie/components/movies-dashboard'
import { MovieCard } from '@/features/movie/components/movie-card'

export default async function PrivatePage() {
  const { user } = await checkUser()

  if (!user) {
    return redirect(routesMap.login)
  }
  return (
    <main className="flex flex-col p-6 gap-6">
      <MoviesDashboard />
      <MovieCard />
      <MovieFooter />
    </main>
  )
}
