import { createContext, useReducer, useContext } from 'react'
import loginService from '../services/login'

const loginReducer = (state, action) => {
  console.log('loginReducer', action)
  switch (action.type) {
  case 'login':
    console.log('state', state)
    console.log('action', action)
    return action.payload ///FIX
  default:
    return null
  }
}

const LoginContext = createContext()

export const LoginContextProvider = (props) => {
  const [login, loginDispatch] = useReducer(loginReducer, null)

  return (
    <LoginContext.Provider value={[login, loginDispatch] }>
      {props.children}
    </LoginContext.Provider>
  )
}

// export const useLoginDispatch = () => {
//   const loginAndDispatch = useContext(LoginContext)
//   return loginAndDispatch[1]
// }

export default LoginContext