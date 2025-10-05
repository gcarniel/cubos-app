'use client'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useMovieRegister } from '@/features/movie/hooks/use-movie-register'
import { Textarea } from '@/components/ui/textarea'
import { Controller } from 'react-hook-form'
import { DatePicker } from '@/components/date-picker'
import { ShowError } from '@/components/show-error'
import { GenreSelector } from '@/components/genres-selector'
import { useMovieStore } from '@/features/movie/store/movie-store'
import InputFile from '@/components/input-file'
import { useHookFormMask } from 'use-mask-input'

export function MovieRegister() {
  const { form, handlers, data } = useMovieRegister()
  const { register } = form
  const { openRegisterModal, setOpenRegisterModal } = useMovieStore()
  const registerWithMask = useHookFormMask(form.register)

  return (
    <Sheet open={openRegisterModal} onOpenChange={setOpenRegisterModal}>
      <SheetContent className="md:w-md p-4">
        <SheetHeader>
          <SheetTitle className="font-bold ">Adicionar Filme</SheetTitle>
        </SheetHeader>

        <form
          onSubmit={form.handleSubmit(handlers.handleSubmit)}
          className="flex flex-col gap-4 h-full justify-between overflow-y-auto"
        >
          <section className="flex-1 flex flex-col gap-4 max-h-[800px] overflow-y-auto p-4">
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

            <div className="flex flex-col gap-2">
              <Label htmlFor="genre">Gêneros</Label>
              <Controller
                name="genre"
                control={form.control}
                render={({ field }) => (
                  <GenreSelector
                    value={field.value}
                    options={data.genres}
                    onChange={(value) => field.onChange(value)}
                  />
                )}
              />
              <ShowError name="genre" errors={form.formState.errors} />
            </div>

            <div className="flex gap-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="budget">Orçamento (R$)</Label>
                <Input
                  id="budget"
                  type="text"
                  {...registerWithMask('budget', 'brl-currency', {
                    valueAsNumber: true,
                  })}
                />
                <ShowError name="budget" errors={form.formState.errors} />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="revenue">Receita (R$)</Label>
                <Input
                  id="revenue"
                  type="text"
                  {...registerWithMask('revenue', 'brl-currency', {
                    valueAsNumber: true,
                  })}
                />
                <ShowError name="revenue" errors={form.formState.errors} />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="profit">Lucro (R$)</Label>
                <Input
                  id="profit"
                  type="text"
                  {...registerWithMask('profit', 'brl-currency', {
                    valueAsNumber: true,
                  })}
                />
                <ShowError name="profit" errors={form.formState.errors} />
              </div>
            </div>

            <div className="flex gap-2">
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="popularity"
                  className="flex items-baseline gap-[2px]"
                >
                  Nota público <span className="text-[10px]">(1-100)</span>
                </Label>
                <Input
                  id="popularity"
                  type="text"
                  {...registerWithMask('popularity', 'decimal', {
                    valueAsNumber: true,
                    max: 100,
                    min: 1,
                    allowMinus: false,
                  })}
                />
                <ShowError name="popularity" errors={form.formState.errors} />
              </div>

              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="vote_average"
                  className="flex items-baseline gap-1"
                >
                  Nota média <span className="text-[10px]">(1-100)</span>
                </Label>
                <Input
                  id="vote_average"
                  type="text"
                  {...registerWithMask('voteAverage', 'decimal', {
                    valueAsNumber: true,
                    max: 100,
                    min: 1,
                    allowMinus: false,
                  })}
                />
                <ShowError name="voteAverage" errors={form.formState.errors} />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="vote_count">Qtd. votos</Label>
                <Input
                  id="vote_count"
                  type="text"
                  {...registerWithMask('voteCount', 'decimal', {
                    valueAsNumber: true,
                    allowMinus: false,
                    min: 1,
                  })}
                />
                <ShowError name="voteCount" errors={form.formState.errors} />
              </div>
            </div>

            <div className="flex gap-2">
              <div
                className="flex flex-col gap-2 w-full"
                title="Duração em minutos"
              >
                <Label htmlFor="duration">Duração (min)</Label>
                <Input
                  id="duration"
                  type="text"
                  {...registerWithMask('duration', 'decimal', {
                    valueAsNumber: true,
                    allowMinus: false,
                    min: 1,
                  })}
                />
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
                      className="w-full"
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
                    />
                  )}
                />
                <ShowError name="releaseDate" errors={form.formState.errors} />
              </div>
            </div>

            <div className="flex gap-2 justify-between">
              <div className="flex flex-col gap-2">
                <Label htmlFor="cover_url">Poster</Label>
                <Controller
                  name="posterUrl"
                  control={form.control}
                  render={({ field }) => (
                    <InputFile
                      accept="image/jpeg, image/png, image/jpg, image/webp"
                      buttonLabel="Upload de poster"
                      value={field.value}
                      onRemoveFileUrl={() => field.onChange(null)}
                      onChange={async (file) => {
                        const { url } = await handlers.handleUploadFile(file)
                        field.onChange(url)
                      }}
                    />
                  )}
                />
                <ShowError name="posterUrl" errors={form.formState.errors} />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="cover_url">Cover</Label>
                <Controller
                  name="coverUrl"
                  control={form.control}
                  render={({ field }) => (
                    <InputFile
                      accept="image/jpeg, image/png, image/jpg, image/webp"
                      buttonLabel="Upload de cover"
                      value={field.value}
                      onRemoveFileUrl={() => field.onChange(null)}
                      onChange={async (file) => {
                        const { url } = await handlers.handleUploadFile(file)
                        field.onChange(url)
                      }}
                    />
                  )}
                />
                <ShowError name="coverUrl" errors={form.formState.errors} />
              </div>
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

          <div className="flex justify-end items-end gap-2 h-fit">
            <Button type="button" variant="secondary">
              Cancelar
            </Button>
            <Button type="submit" loading={data.isUploadingFile}>
              {form.getValues('id') ? 'Editar' : 'Adicionar'} Filme
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}
