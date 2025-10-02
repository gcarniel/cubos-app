import z from 'zod'

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

export const movieRegisterSchema = z.object({
  id: z.string().nullable(),
  title: z.string().min(1, 'Campo título é obrigatório'),
  originalTitle: z.string().min(1, 'Campo título original é obrigatório'),
  duration: z.number().min(1, 'Campo duração é obrigatório'),
  budget: z.number().min(1, 'Campo orçamento é obrigatório'),
  revenue: z.number().min(1, 'Campo receita é obrigatório'),
  profit: z.number().min(1, 'Campo lucro é obrigatório'),
  sinopsis: z.string().min(1, 'Campo sinopse é obrigatório'),
  genre: z.array(z.string()).min(1, 'Campo gênero é obrigatório'),
  language: z.string().min(1, 'Campo idioma é obrigatório'),
  releaseDate: z.date().min(1, 'Campo data de lançamento é obrigatório'),
  popularity: z.number().min(1, 'Campo popularidade é obrigatório'),
  voteAverage: z.number().min(1, 'Campo média de votos é obrigatório'),
  voteCount: z.number().min(1, 'Campo contagem de votos é obrigatório'),
  posterUrl: z.url(),
  coverUrl: z.url().optional(),
  trailerUrl: z.url({ message: 'Campo link do trailer é obrigatório' }),
})

export type MovieRegister = z.infer<typeof movieRegisterSchema>
