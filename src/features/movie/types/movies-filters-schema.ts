import { z } from 'zod'

export const movieFiltersSchema = z
  .object({
    minDuration: z.string().optional(),
    maxDuration: z.string().optional(),
    minReleaseDate: z.string().optional(),
    maxReleaseDate: z.string().optional(),
    minVoteAverage: z.string().optional(),
    maxVoteAverage: z.string().optional(),
    custom: z.string().optional().nullable(),
  })
  .superRefine((data, ctx) => {
    if (
      !data.minDuration &&
      !data.maxDuration &&
      !data.minReleaseDate &&
      !data.maxReleaseDate &&
      !data.minVoteAverage &&
      !data.maxVoteAverage
    ) {
      ctx.addIssue({
        code: 'custom',
        message: 'Pelo menos um filtro deve ser informado',
        path: ['custom'],
      })
    }

    if (
      (data.minDuration && !data.maxDuration) ||
      (data.maxDuration && !data.minDuration)
    ) {
      ctx.addIssue({
        code: 'custom',
        message: 'A duração mínima e máxima devem ser informadas',
        path: ['custom'],
      })
    }

    if (
      (data.minReleaseDate && !data.maxReleaseDate) ||
      (data.maxReleaseDate && !data.minReleaseDate)
    ) {
      ctx.addIssue({
        code: 'custom',
        message: 'A data mínima e máxima devem ser informadas',
        path: ['custom'],
      })
    }

    if (
      (data.minVoteAverage && !data.maxVoteAverage) ||
      (data.maxVoteAverage && !data.minVoteAverage)
    ) {
      ctx.addIssue({
        code: 'custom',
        message: 'A nota mínima e máxima devem ser informadas',
        path: ['custom'],
      })
    }

    if (
      data.minDuration &&
      data.maxDuration &&
      data.minDuration > data.maxDuration
    ) {
      ctx.addIssue({
        code: 'custom',
        message: 'A duração mínima deve ser menor que a duração máxima',
        path: ['custom'],
      })
    }

    if (
      data.minReleaseDate &&
      data.maxReleaseDate &&
      data.minReleaseDate > data.maxReleaseDate
    ) {
      ctx.addIssue({
        code: 'custom',
        message: 'A data mínima deve ser menor que a data máxima',
        path: ['custom'],
      })
    }

    if (
      data.minVoteAverage &&
      data.maxVoteAverage &&
      data.minVoteAverage > data.maxVoteAverage
    ) {
      ctx.addIssue({
        code: 'custom',
        message: 'A nota mínima deve ser menor que a nota máxima',
        path: ['custom'],
      })
    }
  })

export type MovieFilters = z.infer<typeof movieFiltersSchema>
