import { useState } from 'react'

export const storageService = {
  setUserLoggedIn,
  getAccessToken,
}

function setUserLoggedIn(userInfo: any): void {
  localStorage.setItem('blogmovie:userData', JSON.stringify(userInfo))
}

function getAccessToken() {
  const dataUser: any = localStorage.getItem('blogmovie:userData')

  const dataUserParsed = JSON.parse(dataUser)
  return dataUserParsed?.token || ''
}

export default storageService
