'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  signInFormSchema,
  SignInFormType,
} from '@/features/login/types/sign-in-schema'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { routesMap } from '@/routes'
import { toast } from 'sonner'
import { signIn } from 'next-auth/react'
import { ShowError } from '@/components/show-error'

export default function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignInFormType>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const router = useRouter()

  const onSubmit = async (data: SignInFormType) => {
    const registerData = {
      email: data.email,
      password: data.password,
    }

    try {
      const res = await signIn('credentials', {
        ...registerData,
        redirect: false,
      })

      if (res.error === 'CredentialsSignin') {
        toast.error('Email ou senha incorretos!')
        return
      }

      router.push(routesMap.root)
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
          <Label htmlFor="email">Nome/E-mail</Label>
          <Input
            type="email"
            id="email"
            className="w-full"
            placeholder="Digite seu nome/e-mail"
            {...register('email')}
          />
          <ShowError errors={errors} name="email" />
        </div>

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

        <div className="flex items-center justify-between">
          <Link href="/register" className="text-sm text-primary underline">
            Esqueci minha senha
          </Link>
          <Button type="submit">Entrar</Button>
        </div>
      </form>
    </main>
  )
}
