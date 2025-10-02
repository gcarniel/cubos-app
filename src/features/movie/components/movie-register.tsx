'use client'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useMovieRegister } from '@/features/hooks/use-movie-register'
import { Textarea } from '@/components/ui/textarea'
import { Controller } from 'react-hook-form'
import { DatePicker } from '@/components/date-picker'
import { ShowError } from '@/components/show-error'

export function MovieRegister() {
  const { form, handlers } = useMovieRegister()
  const { register, formState } = form

  console.log(formState.errors)

  return (
    <Sheet>
      <SheetTrigger>Open</SheetTrigger>
      <SheetContent className="md:w-md p-4">
        <SheetHeader>
          <SheetTitle className="font-bold ">Adicionar Filme</SheetTitle>
        </SheetHeader>

        <form
          onSubmit={form.handleSubmit(handlers.handleSubmit)}
          className="flex flex-col gap-4 h-full"
        >
          <section className="flex flex-col gap-4 h-5/6 overflow-y-auto p-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Título</Label>
              <Input id="title" type="text" {...register('title')} />
              <ShowError name="title" errors={form.formState.errors} />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="original_title">Título Original</Label>
              <Input
                id="original_title"
                type="text"
                {...register('originalTitle')}
              />
              <ShowError name="originalTitle" errors={form.formState.errors} />
            </div>

            <div className="flex gap-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="budget">Orçamento ($)</Label>
                <Input id="budget" type="text" {...register('budget')} />
                <ShowError name="budget" errors={form.formState.errors} />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="revenue">Receita ($)</Label>
                <Input id="revenue" type="text" {...register('revenue')} />
                <ShowError name="revenue" errors={form.formState.errors} />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="profit">Lucro ($)</Label>
                <Input id="profit" type="text" {...register('profit')} />
                <ShowError name="profit" errors={form.formState.errors} />
              </div>
            </div>

            <div className="flex gap-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="popularity">Nota do público</Label>
                <Input
                  id="popularity"
                  type="text"
                  {...register('popularity', { valueAsNumber: true })}
                />
                <ShowError name="popularity" errors={form.formState.errors} />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="vote_average">Nota média</Label>
                <Input
                  id="vote_average"
                  type="text"
                  {...register('voteAverage', { valueAsNumber: true })}
                />
                <ShowError name="voteAverage" errors={form.formState.errors} />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="vote_count">Qtd. votos</Label>
                <Input
                  id="vote_count"
                  type="text"
                  {...register('voteCount', { valueAsNumber: true })}
                />
                <ShowError name="voteCount" errors={form.formState.errors} />
              </div>
            </div>

            <div className="flex gap-2">
              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="duration">Duração (min)</Label>
                <Input id="duration" type="text" {...register('duration')} />
                <ShowError name="duration" errors={form.formState.errors} />
              </div>

              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="language">Idioma</Label>
                <Input id="language" type="text" {...register('language')} />
                <ShowError name="language" errors={form.formState.errors} />
              </div>

              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="release_date">Data lançamento</Label>
                <Controller
                  name="releaseDate"
                  control={form.control}
                  render={({ field }) => (
                    <DatePicker
                      disabled={(date) => date < new Date()}
                      className="w-full"
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
                    />
                  )}
                />
                <ShowError name="releaseDate" errors={form.formState.errors} />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="poster_url">Poster</Label>
              <Input
                id="poster_url"
                accept="image/*"
                placeholder="Selecione uma imagem"
                type="file"
                className="p-0 pe-3 file:me-3 file:border-0 file:border-border file:border-e"
                onChange={async (e) => {
                  const file = e.target.files?.[0]
                  console.log(file)
                  if (!file) return

                  // faz upload
                  // const url = await handlers.uploadPoster(file)

                  // atualiza o campo que realmente será enviado ao backend
                  form.setValue(
                    'posterUrl',
                    'https://via.placeholder.com/150',
                    { shouldValidate: true },
                  )

                  // opcional: guarda o File localmente caso queira
                  // form.setValue('posterFile', file)
                }}
              />
              <ShowError name="posterUrl" errors={form.formState.errors} />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="cover_url">Cover</Label>
              <Input
                id="cover_url"
                accept="image/*"
                placeholder="Selecione uma imagem"
                type="file"
                className="p-0 pe-3 file:me-3 file:border-0 file:border-border file:border-e"
                onChange={async (e) => {
                  const file = e.target.files?.[0]
                  console.log(file)
                  if (!file) return

                  // faz upload
                  // const url = await handlers.uploadPoster(file)

                  // atualiza o campo que realmente será enviado ao backend
                  form.setValue('coverUrl', 'https://via.placeholder.com/150', {
                    shouldValidate: true,
                  })

                  // opcional: guarda o File localmente caso queira
                  // form.setValue('posterFile', file)
                }}
              />
              <ShowError name="coverUrl" errors={form.formState.errors} />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="trailer_url">Link do trailer</Label>
              <Input id="trailer_url" type="text" {...register('trailerUrl')} />
              <ShowError name="trailerUrl" errors={form.formState.errors} />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="sinopsis">Sinopse</Label>
              <Textarea id="sinopsis" {...register('sinopsis')} />
              <ShowError name="sinopsis" errors={form.formState.errors} />
            </div>
          </section>

          <div className="flex justify-end items-end gap-2 h-1/6 ">
            <Button variant="secondary">Cancelar</Button>
            <Button type="submit">Adicionar Filme</Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}
