'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { MovieLabel } from './movie-label'
import { formatCurrency } from '@/lib/utils'
import CircularProgress from './movie-vote'
import { MovieGenreTag } from './movie-genre-tag'
import ReactPlayer from 'react-player'
import { useMovieDetail } from '../hooks/use-movies-detail'
import { useMovieStore } from '../store/movie-store'
import { MovieRegister } from './movie-register'

import cubosLogoMobile from '@/assets/cubos-logo-mobile.svg'

export function MovieDetails({ id }: { id: string }) {
  const {
    data: movie,
    handleDeleteMovie,
    isLoading,
    isFetching,
  } = useMovieDetail(id)
  const { setMovie } = useMovieStore()

  if (isLoading || isFetching) {
    return (
      <div className="flex items-center justify-center h-full">
        <Image
          src={cubosLogoMobile}
          alt="loading"
          width={100}
          height={100}
          className="animate-spin w-20 h-20 duration-500"
        />
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="flex items-center justify-center h-full">
        <h1 className="text-2xl font-bold">Filme não encontrado</h1>
      </div>
    )
  }

  const isReleased =
    new Date(movie?.releaseDate) > new Date() ? 'Em breve' : 'Lançado'

  return (
    <main className="flex flex-col gap-4 w-full h-full p-8 font-montserrat">
      {/* secao de detalhes */}
      <section
        className="p-8 flex flex-col gap-4"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.85) 100%, rgba(0,0,0,.85) 100%),
            url(${movie?.coverUrl || movie?.posterUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* titulo */}
        <section className="flex gap-2 font-montserrat">
          <div className="flex flex-col gap-1 flex-1 font-montserrat">
            <p className="text-2xl font-bold">{movie?.title}</p>
            <p className="text-base">{movie?.originalTitle}</p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => handleDeleteMovie(movie)}
              variant="secondary"
            >
              Deletar
            </Button>
            <Button onClick={() => setMovie(movie)}>Editar</Button>
          </div>
        </section>

        {/* content */}
        <section className="flex gap-4 font-montserrat">
          <div className="min-w-[274px]">
            <Image
              src={movie?.posterUrl || ''}
              alt=""
              width={374}
              height={560}
            />
          </div>
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col lg:flex-row gap-2 font-montserrat">
              <p className="flex-1 w-full">{movie?.originalTitle}</p>
              <div className="flex items-center gap-2">
                <MovieLabel
                  label="popularidade"
                  value={movie?.popularity || ''}
                  className="w-fit"
                />
                <MovieLabel
                  label="votos"
                  value={movie?.voteCount || ''}
                  className="w-fit"
                />

                <div>
                  <CircularProgress value={movie?.voteAverage || 0} />
                </div>
              </div>
            </div>

            <section className="flex flex-col lg:flex-row gap-2 justify-between font-montserrat">
              <section className="flex-1 flex flex-col gap-2">
                <div className="flex-1 flex flex-col gap-2 bg-[#232225BF] rounded-sm p-4">
                  <p>{movie?.sinopsis}</p>
                </div>

                <div className="flex flex-col gap-2 bg-[#232225BF] rounded-sm p-4 w-fit">
                  <div className="flex flex-col gap-1">
                    <p>Generos</p>
                    <div className="flex gap-2">
                      {movie?.genre.map((genre) => (
                        <MovieGenreTag key={genre.id} label={genre.name} />
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <section className="flex-1 flex flex-col gap-2">
                <div className=" flex gap-2 justify-between">
                  <MovieLabel
                    label="lançamento"
                    value={
                      movie?.releaseDate
                        ? new Date(movie?.releaseDate).toLocaleDateString(
                            'pt-BR',
                          )
                        : ''
                    }
                  />
                  <MovieLabel label="Duração" value={movie?.duration || ''} />
                </div>

                <div className="flex-1 flex gap-2 justify-between">
                  <MovieLabel label="Situação" value={isReleased} />
                  <MovieLabel label="Idioma" value={movie?.language || ''} />
                </div>

                <div className="flex-1 flex gap-2 justify-between">
                  <MovieLabel
                    label="orçamento"
                    value={formatCurrency(movie?.budget || 0)}
                  />
                  <MovieLabel
                    label="receita"
                    value={formatCurrency(movie?.revenue || 0)}
                  />
                  <MovieLabel
                    label="lucro"
                    value={formatCurrency(movie?.profit || 0)}
                  />
                </div>
              </section>
            </section>
          </div>
        </section>
      </section>

      {/* secao trailer */}
      <section className="flex flex-col gap-2 h-full p-8 lg:min-h-[760px]">
        <p className="font-montserrat text-2xl font-bold"> Trailer</p>
        <ReactPlayer
          src={movie?.trailerUrl}
          width={'100%'}
          height={'100%'}
          controls
        />
      </section>

      <MovieRegister />
    </main>
  )
}
