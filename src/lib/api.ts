import axios from 'axios'
import { getSession } from 'next-auth/react'
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${await getSession().then((session) => session?.accessToken)}`,
  },
  withCredentials: true,
})

export default api
