import axios from 'axios'
import appsettings from 'common/config/appsettings.json' // aqui está minha URL da API
import storageService from './storage.service' // importo meu serviço que interagi com o localStoage
import { ToastService } from './toast.service' // importo meu serviço de toast

// crio/conecto com minha API e passo o tradicional baseURL que é o endereço da API e no header os configs
const HttpService = axios.create({
  baseURL: appsettings.API,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
})

// local aonde chamo meu serviço para pegar o token e o coloco numa const
function BuildAuth() {
  const accessToken = storageService.getAccessToken()
  return accessToken
}

// esse é o interceptor responsável por pegar o token e a cada request o  enviar para a API
HttpService.interceptors.request.use((config: any) => {
  const authentication = BuildAuth() || ''
  if (authentication !== null) {
    config.headers['Authorization'] = 'Bearer ' + authentication
  }

  return config
})

// esse é o interceptor responsável por pegar a resposta da API e verificar em qual toast ela se enquadra e em caso de sucesso já tetorna o response.data
HttpService.interceptors.response.use(function (response: any) {
  ;(response.data.messages || []).forEach(
    (resultMessage: { message: string; type: any }) => {
      if (resultMessage.message) {
        resultMessage.message = resultMessage.message.replaceAll('P0001: ', '')
        // const t = i18n.t;
        switch (resultMessage.type) {
          case 0:
          case 'ERROR':
            ToastService.error(resultMessage.message)
            break
          case 1:
          case 'WARNING':
            ToastService.warn(resultMessage.message)
            break
          case 2:
          case 'INFO':
            ToastService.info(resultMessage.message)
            break
          case 3:
          case 'SUCCESS':
            ToastService.success(resultMessage.message)
            break
          default:
            ToastService.info(resultMessage.message)
            break
        }
      }
    }
  )
  if (response.data.redirectRoute) {
    setTimeout(() => {}, 3000)
  }
  return response.data
})
export { HttpService }
