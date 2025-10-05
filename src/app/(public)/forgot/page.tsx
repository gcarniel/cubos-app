'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { routesMap } from '@/routes'
import { toast } from 'sonner'
import { ShowError } from '@/components/show-error'
import {
  forgotPasswordSchema,
  ForgotPasswordType,
} from '@/features/forgot/types/forgot-schema'

export default function ForgotPasswordPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ForgotPasswordType>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const router = useRouter()

  const onSubmit = async (data: ForgotPasswordType) => {
    try {
      const registerRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        },
      )

      if (!registerRes.ok) {
        toast.error('Erro ao enviar e-mail. Tente novamente.')
        return
      }

      toast.success(
        'Caso exista uma conta com o e-mail informado, enviaremos um link para redefinir a senha!',
      )
      router.push(routesMap.login)
    } catch (err) {
      console.error(err)
      toast.error('Ops, algo deu errado aqui, tente novamente mais tarde.')
    }
  }

  return (
    <main className="flex flex-col items-center justify-center h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-card w-full max-w-[400px] p-6 flex flex-col gap-4 rounded-sm "
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            type="email"
            id="email"
            className="w-full"
            placeholder="Digite seu e-mail"
            {...register('email')}
          />
          <ShowError errors={errors} name="email" />
        </div>

        <div className="flex items-center justify-between">
          <Link
            href="/login"
            className="text-sm text-muted-foreground underline"
          >
            Voltar para Login
          </Link>
          <Button type="submit">Recuperar Senha</Button>
        </div>
      </form>
    </main>
  )
}
