export interface MovieWithPagination {
  movies: Movie[]
  totalMovies: number
  totalPages: number
  currentPage: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export interface Movie {
  id: string
  title: string
  originalTitle: string
  duration: number
  budget: number
  revenue: number
  profit: number
  sinopsis: string
  genre: Genre[]
  language: string
  releaseDate: string
  popularity: number
  voteAverage: number
  voteCount: number
  posterUrl: string
  coverUrl?: string
  trailerUrl: string
}

export interface Genre {
  id: string
  name: string
}

export interface Filters {
  search?: string
  page?: number
  take?: number
  minRating?: number
  maxRating?: number
  minReleaseDate?: string
  maxReleaseDate?: string
  minDuration?: number
  maxDuration?: number
  sort?: string
}
