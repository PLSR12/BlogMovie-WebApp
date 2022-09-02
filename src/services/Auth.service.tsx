import { HttpService } from './http.service'
// importo meu http service o qual é o meu "arquivo principal", aonde tenho os interceptors e o create da api
import { storageService } from './storage.service'
// importo meu service de storage service aonde tenho meu service para pegar os dados do usuário e jogar no meu local Storage

const basePath = '/sessions'
// aqui passo o 'endereço' de onde irei fazer as req na api

export const AuthService = {
  signIn,
} // aqui exporto meus serviços para chamar no pages

interface AuthProps {
  email: string
  password: string
} // no meu caso estou usando typescript, então tenho uma interface para tipar meu dado

/* aqui tenho meu serviço aonde envio meu dado de login a API e se tiver um succeso ,
 chamo o service do storage que realiza pegar os dados do usuário e jogar no local storage */
async function signIn(data: AuthProps) {
  HttpService.post(`${basePath}`, data).then((response) =>
    storageService.setUserLoggedIn(response)
  )

  return HttpService.post(`${basePath}`, data)
}

export default AuthService
