import { z } from 'zod'

export const registerFormSchema = z
  .object({
    name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres').trim(),
    email: z.email({ message: 'Informe um email válido.' }).trim(),
    password: z
      .string()
      .min(6, 'Senha deve ter pelo menos 6 caracteres')
      .trim(),
    confirmPassword: z.string().trim(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirmPassword'],
        message: 'As senhas não coincidem.',
      })
    }
  })

export type RegisterFormType = z.infer<typeof registerFormSchema>
