import { ToastContainer } from 'react-toastify'
import GlobalStyle from './common/styles/global'
import AppProvider from './context'
import Routes from './routes/routes'

function App() {
  return (
    <AppProvider>
      <Routes />
      <ToastContainer autoClose={2000} theme="colored" />
      <GlobalStyle />
    </AppProvider>
  )
}

export default App
