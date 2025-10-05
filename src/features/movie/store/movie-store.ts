import { create } from 'zustand'
import { Movie } from '../types/movie'

interface MovieStore {
  openRegisterModal: boolean
  setOpenRegisterModal: (open: boolean) => void
  movie: Movie | null
  setMovie: (movie: Movie | null) => void
}

const movieStore = create<MovieStore>((set) => ({
  openRegisterModal: false,
  movie: null,
  setOpenRegisterModal: (open: boolean) => set({ openRegisterModal: open }),
  setMovie: (movie: Movie | null) => set({ movie, openRegisterModal: true }),
}))

export const useMovieStore = () => {
  const openRegisterModal = movieStore((state) => state.openRegisterModal)
  const setOpenRegisterModal = movieStore((state) => state.setOpenRegisterModal)
  const movie = movieStore((state) => state.movie)
  const setMovie = movieStore((state) => state.setMovie)

  return {
    openRegisterModal,
    setOpenRegisterModal,
    movie,
    setMovie,
  }
}
