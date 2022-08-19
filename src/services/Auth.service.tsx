import { HttpService } from './http.service'
import { storageService } from './storage.service'

const basePath = '/sessions'

export const AuthService = {
  signIn,
}

interface AuthProps {
  email: string
  password: string
}

async function signIn(data: AuthProps) {
  HttpService.post(`${basePath}`, data).then((response) =>
    storageService.setUserLoggedIn(response)
  )

  return HttpService.post(`${basePath}`, data)
}

export default AuthService
