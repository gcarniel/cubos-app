import { create } from 'zustand'

interface MovieStore {
  openRegisterModal: boolean
  setOpenRegisterModal: (open: boolean) => void
}

const movieStore = create<MovieStore>((set) => ({
  openRegisterModal: false,
  setOpenRegisterModal: (open: boolean) => set({ openRegisterModal: open }),
}))

export const useMovieStore = () => {
  const openRegisterModal = movieStore((state) => state.openRegisterModal)
  const setOpenRegisterModal = movieStore((state) => state.setOpenRegisterModal)

  return {
    openRegisterModal,
    setOpenRegisterModal,
  }
}
