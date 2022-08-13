import axios from 'axios'
import appsettings from 'common/config/appsettings.json'

const HttpService = axios.create({
  baseURL: appsettings.API,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
})

export { HttpService }
