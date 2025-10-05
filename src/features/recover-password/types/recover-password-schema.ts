import { z } from 'zod'

export const recoverPasswordSchema = z
  .object({
    token: z.uuid(),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
    passwordConfirmation: z
      .string()
      .min(6, 'A senha deve ter pelo menos 6 caracteres'),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirmation) {
      ctx.addIssue({
        code: 'custom',
        path: ['passwordConfirmation'],
        message: 'As senhas não coincidem.',
      })
    }
  })

export type RecoverPasswordType = z.infer<typeof recoverPasswordSchema>
