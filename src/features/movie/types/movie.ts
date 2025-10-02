export type Movie = {
  id: string
  popularity: number
  release_date: string
  title: string
  original_title: string
  vote_average: number
  vote_count: number
  duration: number
  situation: string
  budget: number
  revenue: number
  profit: number
  sinopsis: string
  genre: string[]
  poster_url: string
  cover_url: string
  language: string
  trailer_url: string
  status: 'released' | 'upcoming'
}
