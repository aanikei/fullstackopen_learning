import ReactDOM from 'react-dom/client'
import store from './store'
import { Provider } from 'react-redux'
import App from './App'
import '../style.css'
import { LoginContextProvider } from './reducers/loginContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <LoginContextProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </LoginContextProvider>
)