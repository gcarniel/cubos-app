'use client'

import { useEffect, useState } from 'react'
import { MovieDetails } from './movie-details'
import { MovieDetailsMobile } from './movie-details-mobile'

export function MovieDetailsWrapper({ id }: { id: string }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const isClient = typeof window !== 'undefined'
      if (!isClient) return
      if (window.innerWidth < 768) {
        setIsMobile(true)
      } else {
        setIsMobile(false)
      }
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [id])

  return isMobile ? <MovieDetailsMobile id={id} /> : <MovieDetails id={id} />
}
