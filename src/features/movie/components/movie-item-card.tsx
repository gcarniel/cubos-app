import { Movie } from '@/features/movie/types/movie'

import poster from '@/assets/poster.png'
import Image from 'next/image'

export function MovieItemCard({ movie }: { movie: Movie }) {
  return (
    <div className="flex flex-col gap-4 border border-white/10 rounded-sm h-[281px] max-w-[183px] sm:h-[355px] sm:max-w-[235px]">
      <div className="flex flex-col gap-2 opacity-90 hover:opacity-100 transition cursor-pointer">
        <div className="w-full flex-1 relative">
          <Image
            src={poster}
            alt=""
            className="w-full h-full object-cover"
            width={183}
            height={281}
          />
          <div className="absolute bottom-0 w-full px-2 py-2 h-1/3 bg-gradient-to-b from-black/0 to-black/100">
            <p className="font-roboto text-base font-semibold leading-5 text-white flex items-end h-full">
              {movie.title}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
