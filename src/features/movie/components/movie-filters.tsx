'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useMovieFilters } from '@/features/movie/hooks/use-movie-filters'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ShowError } from '@/components/show-error'
import { Button } from '@/components/ui/button'
import { useMovieFiltersStore } from '@/features/movie/store/movie-filters-store'
import { DatePicker } from '@/components/date-picker'
import { Controller } from 'react-hook-form'

export function MovieFilters() {
  const { openFiltersModal, setOpenFiltersModal } = useMovieFiltersStore()
  const { form, handlers } = useMovieFilters()
  const { registerWithMask, handleClearFilters } = handlers

  return (
    <Dialog open={openFiltersModal} onOpenChange={setOpenFiltersModal}>
      <DialogContent className="w-full sm:w-[570px] p-4 flex flex-col gap-4">
        <DialogHeader className="flex items-start">
          <DialogTitle>Filtros</DialogTitle>
        </DialogHeader>
        <form
          className="flex flex-col gap-4 p-4 h-full w-full"
          onSubmit={form.handleSubmit(handlers.handleSubmit)}
        >
          <section className="flex flex-col gap-4 w-full">
            <div className="flex gap-2 justify-between">
              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="minDuration">Duração mínima</Label>
                <Input
                  id="minDuration"
                  type="text"
                  {...registerWithMask('minDuration', 'decimal', {
                    allowMinus: false,
                    min: 1,
                  })}
                />
                <ShowError name="minDuration" errors={form.formState.errors} />
              </div>

              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="maxDuration">Duração máxima</Label>
                <Input
                  id="maxDuration"
                  type="text"
                  {...registerWithMask('maxDuration', 'decimal', {
                    allowMinus: false,
                    min: 1,
                  })}
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
                <Controller
                  name="minReleaseDate"
                  control={form.control}
                  render={({ field }) => (
                    <DatePicker
                      placeholder="Data mínima"
                      className="w-full"
                      value={field.value ? new Date(field.value) : undefined}
                      onChange={(value) => field.onChange(value.toISOString())}
                    />
                  )}
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
                <Controller
                  name="maxReleaseDate"
                  control={form.control}
                  render={({ field }) => (
                    <DatePicker
                      className="w-full"
                      placeholder="Data máxima"
                      value={field.value ? new Date(field.value) : undefined}
                      onChange={(value) => field.onChange(value.toISOString())}
                    />
                  )}
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
                <Label htmlFor="minVoteAverage">
                  Nota mínima
                  <span className="text-xs text-muted-foreground">(1-100)</span>
                </Label>
                <Input
                  id="minVoteAverage"
                  type="text"
                  {...registerWithMask('minVoteAverage', 'decimal', {
                    allowMinus: false,
                    min: 1,
                    max: 100,
                  })}
                />
                <ShowError
                  name="minVoteAverage"
                  errors={form.formState.errors}
                />
              </div>

              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="maxVoteAverage">
                  Nota máxima
                  <span className="text-xs text-muted-foreground">(1-100)</span>
                </Label>
                <Input
                  id="maxVoteAverage"
                  type="text"
                  {...registerWithMask('maxVoteAverage', 'decimal', {
                    allowMinus: false,
                    min: 1,
                    max: 100,
                  })}
                />
                <ShowError
                  name="maxVoteAverage"
                  errors={form.formState.errors}
                />
              </div>
            </div>
          </section>

          <ShowError name="custom" errors={form.formState.errors} />

          <div className="flex flex-col sm:flex-row justify-end gap-2">
            <Button
              onClick={handleClearFilters}
              type="button"
              variant="outline"
            >
              Limpar Filtros
            </Button>
            <Button
              onClick={() => setOpenFiltersModal(false)}
              type="button"
              variant="secondary"
            >
              Cancelar
            </Button>
            <Button type="submit">Aplicar Filtros</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
