import { create } from 'zustand'
import { Filters, Movie, MovieWithPagination } from '../types/movie'

interface MovieFiltersStore {
  openFiltersModal: boolean
  setOpenFiltersModal: (open: boolean) => void
  filters: Filters
  pagination: {
    movies: Movie[]
    totalMovies: number
    totalPages: number
    currentPage: number
    hasNextPage: boolean
    hasPreviousPage: boolean
  }
  setFilters: (filters: Filters) => void
  setPagination: (pagination: MovieWithPagination) => void
}

const movieFilterStore = create<MovieFiltersStore>((set) => ({
  filters: {},
  pagination: {
    movies: [],
    totalMovies: 0,
    totalPages: 0,
    currentPage: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  },
  openFiltersModal: false,
  setOpenFiltersModal: (open: boolean) => set({ openFiltersModal: open }),
  setFilters: (filters: Filters) => set({ filters }),
  setPagination: (pagination: MovieWithPagination) => set({ pagination }),
}))

export const useMovieFiltersStore = () => {
  const openFiltersModal = movieFilterStore((state) => state.openFiltersModal)
  const setOpenFiltersModal = movieFilterStore(
    (state) => state.setOpenFiltersModal,
  )
  const filters = movieFilterStore((state) => state.filters)
  const pagination = movieFilterStore((state) => state.pagination)
  const setFilters = movieFilterStore((state) => state.setFilters)
  const setPagination = movieFilterStore((state) => state.setPagination)

  return {
    openFiltersModal,
    setOpenFiltersModal,
    filters,
    pagination,
    setFilters,
    setPagination,
  }
}
