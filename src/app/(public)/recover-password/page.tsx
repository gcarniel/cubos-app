'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { routesMap } from '@/routes'
import { toast } from 'sonner'
import { ShowError } from '@/components/show-error'
import {
  recoverPasswordSchema,
  RecoverPasswordType,
} from '@/features/recover-password/types/recover-password-schema'

export default function RecoverPasswordPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RecoverPasswordType>({
    resolver: zodResolver(recoverPasswordSchema),
    defaultValues: {
      token: token || '',
      password: '',
      passwordConfirmation: '',
    },
  })

  const router = useRouter()

  const onSubmit = async (data: RecoverPasswordType) => {
    try {
      const registerRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        },
      )

      if (!registerRes.ok) {
        toast.error('Erro ao redefinir senha. Tente novamente.')
        return
      }

      toast.success('Senha redefinida com sucesso!')
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
          <Label htmlFor="password">Senha</Label>
          <Input
            type="password"
            id="password"
            className="md:w-full"
            placeholder="Digite sua senha"
            {...register('password')}
          />
          <ShowError errors={errors} name="password" />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="passwordConfirmation">Confirmar Senha</Label>
          <Input
            type="password"
            id="passwordConfirmation"
            className="md:w-full"
            placeholder="Digite sua senha"
            {...register('passwordConfirmation')}
          />
          <ShowError errors={errors} name="passwordConfirmation" />
        </div>

        <div className="flex items-center justify-between">
          <Link
            href="/login"
            className="text-sm text-muted-foreground underline"
          >
            Voltar para login
          </Link>
          <Button type="submit">Redefinir senha</Button>
        </div>
      </form>
    </main>
  )
}
