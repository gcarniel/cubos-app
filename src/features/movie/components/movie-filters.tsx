'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useMovieFilters } from '@/features/movie/hooks/use-movie-filters'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ShowError } from '@/components/show-error'
import { Button } from '@/components/ui/button'

export function MovieFilters() {
  const { form, handlers } = useMovieFilters()
  const { register } = form
  return (
    <Dialog>
      <DialogTrigger>Filtros</DialogTrigger>
      <DialogContent className="md:w-[570px] p-4">
        <DialogHeader>
          <DialogTitle>Filtros</DialogTitle>
        </DialogHeader>
        <form
          className="flex flex-col gap-4 p-4 h-full"
          onSubmit={form.handleSubmit(handlers.handleSubmit)}
        >
          <section className="flex flex-col gap-4 w-full">
            <div className="flex gap-2 justify-between">
              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="minDuration">Duração mínima (min)</Label>
                <Input
                  id="minDuration"
                  type="text"
                  {...register('minDuration')}
                />
                <ShowError name="minDuration" errors={form.formState.errors} />
              </div>

              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="maxDuration">Duração máxima (min)</Label>
                <Input
                  id="maxDuration"
                  type="text"
                  {...register('maxDuration')}
                />
                <ShowError name="maxDuration" errors={form.formState.errors} />
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-4 w-full">
            <div className="flex gap-2 justify-between">
              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="minReleaseDate">
                  Data de lançamento mínima
                </Label>
                <Input
                  id="minReleaseDate"
                  type="date"
                  {...register('minReleaseDate')}
                />
                <ShowError
                  name="minReleaseDate"
                  errors={form.formState.errors}
                />
              </div>

              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="maxReleaseDate">
                  Data de lançamento máxima
                </Label>
                <Input
                  id="maxReleaseDate"
                  type="date"
                  {...register('maxReleaseDate')}
                />
                <ShowError
                  name="maxReleaseDate"
                  errors={form.formState.errors}
                />
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-4 w-full">
            <div className="flex gap-2 justify-between">
              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="minVoteAverage">Nota média mínima</Label>
                <Input
                  id="minVoteAverage"
                  type="number"
                  {...register('minVoteAverage')}
                />
                <ShowError
                  name="minVoteAverage"
                  errors={form.formState.errors}
                />
              </div>

              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="maxVoteAverage">Nota média máxima</Label>
                <Input
                  id="maxVoteAverage"
                  type="number"
                  {...register('maxVoteAverage')}
                />
                <ShowError
                  name="maxVoteAverage"
                  errors={form.formState.errors}
                />
              </div>
            </div>
          </section>

          <ShowError name="custom" errors={form.formState.errors} />

          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary">
              Cancelar
            </Button>
            <Button type="submit">Aplicar Filtros</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
