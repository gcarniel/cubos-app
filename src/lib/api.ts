import axios from 'axios'
import { getSession } from 'next-auth/react'
import { handleGlobalError } from './handle-global-errors'
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${await getSession().then((session) => session?.accessToken)}`,
  },
  withCredentials: true,
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    handleGlobalError(error)

    return Promise.reject(error)
  },
)

export default api
