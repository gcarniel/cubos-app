import { z } from 'zod'

export const movieRegisterSchema = z.object({
  id: z.string().optional().nullable(),
  title: z.string().min(1, 'Campo título é obrigatório'),
  originalTitle: z.string().min(1, 'Campo título original é obrigatório'),
  duration: z.number().min(1, 'Campo duração é obrigatório'),
  budget: z.number().min(1, 'Campo orçamento é obrigatório'),
  revenue: z.number().min(1, 'Campo receita é obrigatório'),
  profit: z.number().min(1, 'Campo lucro é obrigatório'),
  sinopsis: z.string().min(1, 'Campo sinopse é obrigatório'),
  genre: z
    .array(z.object({ id: z.string(), name: z.string() }))
    .min(1, 'Campo gênero é obrigatório'),
  language: z.string().min(1, 'Campo idioma é obrigatório'),
  releaseDate: z.date().min(1, 'Campo data de lançamento é obrigatório'),
  popularity: z.number().min(1, 'Campo popularidade é obrigatório'),
  voteAverage: z.number().min(1, 'Campo média de votos é obrigatório'),
  voteCount: z.number().min(1, 'Campo contagem de votos é obrigatório'),
  posterUrl: z.url({ message: 'Foto de capa é obrigatória' }),
  coverUrl: z.url().optional().nullable(),
  trailerUrl: z.url({ message: 'Campo link do trailer é obrigatório' }),
})

export type MovieRegister = z.infer<typeof movieRegisterSchema>
