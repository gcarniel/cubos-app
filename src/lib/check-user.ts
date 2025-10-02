'use server'

import { auth } from './auth'
import { redirect } from 'next/navigation'
import { routesMap } from '@/routes'

export const checkUser = async () => {
  try {
    const session = await auth()

    if (!session || !session?.user || !session?.user?.id) {
      redirect(routesMap.login)
    }

    if (session?.expires && new Date(session?.expires) < new Date()) {
      redirect(routesMap.login)
    }

    return { user: { ...session.user, id: session.user.id } }
  } catch (err) {
    console.error(err)
    redirect(routesMap.login)
  }
}
