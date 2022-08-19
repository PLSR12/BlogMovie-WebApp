import axios from 'axios'
import appsettings from 'common/config/appsettings.json'
import storageService from './storage.service'
import { ToastService } from './toast.service'

let showError = true
let alertSessionExpired = false

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

HttpService.interceptors.response.use(
  function (response: any) {
    ;(response.data.messages || []).forEach(
      (resultMessage: { message: string; type: any }) => {
        if (resultMessage.message) {
          resultMessage.message = resultMessage.message.replaceAll(
            'P0001: ',
            ''
          )
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
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      if (alertSessionExpired === false) {
        alertSessionExpired = true
        localStorage.clear()
        //Alert.error(dictionary?.expired_session_do_logon);

        setTimeout(() => {
          // history.push("/Login");
          alertSessionExpired = false
        }, 1000)
      }
    } else {
      if (showError) {
        showError = false
        //Alert.error(dictionary?.unexpected_error_contact_administrator);
      }
      setTimeout(() => {
        showError = true
      }, 3000)
    }
    return Promise.reject(error)
  }
)
export { HttpService }
