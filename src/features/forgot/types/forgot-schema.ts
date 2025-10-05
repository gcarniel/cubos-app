import { z } from 'zod'

export const forgotPasswordSchema = z.object({
  email: z.email({ message: 'Informe um email válido.' }).trim(),
})

export type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>
