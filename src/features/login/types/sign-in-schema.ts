import { z } from 'zod'

export const signInFormSchema = z.object({
  email: z.email({ message: 'Informe um email válido.' }).trim(),
  password: z.string().trim(),
})

export type SignInFormType = z.infer<typeof signInFormSchema>
