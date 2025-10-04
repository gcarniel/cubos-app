import { Input } from '@/components/ui/input'
import { SearchIcon } from '@/icons/search-icon'
import { Button } from '@/components/ui/button'
import { MovieRegister } from './movie-register'
import { MovieFilters } from './movie-filters'

export function MoviesDashboard() {
  return (
    <section className="flex flex-col sm:flex-row justify-end gap-2">
      <div className="flex items-center gap-2 relative w-full sm:w-[488px]">
        <Input placeholder="Pesquise por filmes" />
        <Button variant="ghost" size="icon" className="absolute right-1">
          <SearchIcon className="size-6" />
        </Button>
      </div>

      <div className="flex gap-2">
        <Button variant="secondary" className="flex-1">
          Filtros
        </Button>
        <Button variant="default" className="flex-2">
          Adicionar Filme
        </Button>
      </div>
      <MovieRegister />
      <MovieFilters />
    </section>
  )
}
