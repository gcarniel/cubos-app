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
import {
  registerFormSchema,
  RegisterFormType,
} from '@/features/register/types/register-schema'

export default function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterFormType>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  })

  const router = useRouter()

  const onSubmit = async (data: RegisterFormType) => {
    const registerData = {
      email: data.email,
      password: data.password,
      name: data.name,
    }

    try {
      // chamando a funcao abaixo apenas pra simular o registro
      const res = await signIn('credentials', {
        ...registerData,
        redirect: false,
      })
      // TODO: implementar registro

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
          <Label htmlFor="name">Nome</Label>
          <Input
            type="text"
            id="name"
            className="w-full"
            placeholder="Digite seu nome"
            {...register('name')}
          />
          <ShowError errors={errors} name="name" />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            type="email"
            id="email"
            className="w-full"
            placeholder="Digite seu email"
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

        <div className="flex flex-col gap-2">
          <Label htmlFor="confirmPassword">Confirmar Senha</Label>
          <Input
            type="password"
            id="confirmPassword"
            className="md:w-full"
            placeholder="Digite sua senha"
            {...register('confirmPassword')}
          />
          <ShowError errors={errors} name="confirmPassword" />
        </div>

        <div className="flex items-center justify-end">
          <Button type="submit">Cadastrar</Button>
        </div>
      </form>
    </main>
  )
}
