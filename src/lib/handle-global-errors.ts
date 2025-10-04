import { AxiosError } from 'axios'
import { toast } from 'sonner'

interface ApiErrorResponse {
  code?: string
  message?: string
}

export function handleGlobalError(error: AxiosError<ApiErrorResponse>) {
  const { response, code: networkCode } = error

  if (!response) {
    if (networkCode === 'ECONNABORTED') {
      toast.error('Tempo limite excedido', {
        description: 'A requisição demorou muito para responder',
      })
    } else {
      toast.error('Erro de conexão', {
        description: 'Verifique sua conexão com a internet',
      })
    }
    return
  }

  const { status, data } = response

  if (status === 401) return

  const message = data?.message

  if (message) {
    toast.error('Ops, algo deu errado', {
      description: message,
      duration: status >= 500 ? 6000 : 4000,
    })
    return
  }

  let fallbackMessage = 'Erro desconhecido'

  switch (status) {
    case 500:
      fallbackMessage = 'Erro interno do servidor'
      break
    case 502:
    case 503:
    case 504:
      fallbackMessage = 'Serviço temporariamente indisponível'
      break
    default:
      fallbackMessage = `Erro ${status}`
  }

  toast.error(fallbackMessage, {
    duration: status >= 500 ? 6000 : 4000,
  })
}
