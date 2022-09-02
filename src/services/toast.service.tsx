import { toast, ToastContainer, ToastOptions } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const ToastService = {
  success,
  error,
  info,
  warn,
  normal,
  dark,
} // exporto meu serviços de Toast

const options: ToastOptions = {
  position: 'top-right',
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
} /* configuro meu toast, como posição do toast,tempo de fechamento e etc... 
Pode ser encontardo mais opções na documentação .*/

// tenho os serviços de toast para chamar de acordo com os casos de uso
function success(message: string) {
  toast.success(message, options)
}

function normal(message: string) {
  toast(message, options)
}

function dark(message: string) {
  toast.dark(message, options)
}

function error(message: string) {
  toast.error(message, options)
}

function info(message: string) {
  toast.info(message, options)
}

function warn(message: string) {
  toast.warn(message, options)
}

export { ToastContainer, ToastService }
