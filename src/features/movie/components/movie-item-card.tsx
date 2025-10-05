'use client'

import { Movie } from '@/features/movie/types/movie'

import Image from 'next/image'
import Link from 'next/link'
import CircularProgress from './movie-vote'

interface MovieItemCardProps {
  movie: Movie
}

export function MovieItemCard({ movie }: MovieItemCardProps) {
  return (
    <Link href={`/movie/${movie.id}`} className="relative group">
      <div className="flex flex-col gap-4 border border-white/10 rounded-sm h-[281px] max-w-[183px] sm:h-[355px] sm:max-w-[235px]">
        <div className="flex flex-col gap-2 cursor-pointer">
          <div className="w-full flex-1 relative">
            <Image
              src={movie.posterUrl}
              alt={movie.title}
              className="w-full h-full object-cover"
              width={183}
              height={281}
            />
            <div className="absolute bottom-0 w-full px-2 py-2 h-1/3 bg-gradient-to-b from-black/0 to-black/100 group-hover:opacity-0 transition">
              <p className="font-roboto text-base font-semibold leading-5 text-white flex items-end h-full">
                {movie.title}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 w-full flex flex-col gap-2 px-2 py-2 h-full bg-gradient-to-b from-black/0 to-black/100 opacity-0 group-hover:opacity-100 transition">
        <div className="flex justify-center items-center flex-1 h-full">
          <CircularProgress value={movie.voteAverage} size={150} />
        </div>
        <p className="font-roboto text-base font-semibold leading-5 text-white px-2 truncate overflow-hidden">
          {movie.title}
        </p>
        <div className="flex gap-2 text-muted-foreground text-xs truncate overflow-hidden">
          {movie.genre?.map((genre) => genre.name).join(', ')}
        </div>
      </div>
    </Link>
  )
}
