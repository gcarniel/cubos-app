'use client'

import { ThemeToggle } from './theme-toggle'

import { Button } from './ui/button'
import { LogoSvg } from './logo'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { routesMap } from '@/routes'

export default function Header() {
  const { data: session } = useSession()

  const hasSession = !!session?.user

  return (
    <header className="border-b">
      <div className="flex items-center justify-between h-18 p-4 container max-w-[1366px] min-w-[314px] mx-auto">
        <div className="flex items-center gap-4 flex-1">
          <Link href={routesMap.root}>
            <LogoSvg className="text-black dark:text-white" />
          </Link>
          <span className="text-xl font-bold hidden md:block">Movies</span>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {hasSession ? (
            <Button onClick={() => signOut()}>Logout</Button>
          ) : (
            <Link href={routesMap.register}>
              <Button>Cadastrar</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
