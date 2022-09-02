export const storageService = {
  setUserLoggedIn,
  getAccessToken,
} // aqui exporto meus serviços

// esse é o serviço que uso para setar no local storage o dado do usuário, eu o chamo no service SignIn do AuthService
function setUserLoggedIn(userInfo: any): void {
  localStorage.setItem('blogmovie:userData', JSON.stringify(userInfo))
}

// esse é o serviço aonde pego meu token no localStorage
function getAccessToken() {
  const dataUser: any = localStorage.getItem('blogmovie:userData')

  const dataUserParsed = JSON.parse(dataUser)
  return dataUserParsed?.token || ''
}

export default storageService
