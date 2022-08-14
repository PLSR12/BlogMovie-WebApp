import axios from 'axios'
import appsettings from 'common/config/appsettings.json'
import storageService from './storage.service'

const HttpService = axios.create({
  baseURL: appsettings.API,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
})

function BuildAuth() {
  const accessToken = storageService.getAccessToken()
  return accessToken
}

HttpService.interceptors.request.use((config: any) => {
  const authentication = BuildAuth() || ''
  if (authentication !== null) {
    config.headers['Authorization'] = 'Bearer ' + authentication
  }

  return config
})

HttpService.interceptors.response.use((config) => {
  const authentication = BuildAuth() || ''
  if (authentication !== null) {
    config.headers['Authorization'] = 'Bearer ' + authentication
  }

  return config
})

export { HttpService }
