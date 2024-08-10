import loginService from '../services/login'
import { useEffect, useState, useContext } from 'react'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import LoginContext from '../reducers/loginContext'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const [user, userDispatch] = useContext(LoginContext)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      userDispatch({ type: 'login', payload: user })
      blogService.setToken(user.token)
    }
  })

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      userDispatch({ type: 'login', payload: user })
      blogService.setToken(user.token)
      console.log('user.name', user.name)
      setUsername('')
      setPassword('')
    } catch (e) {
      dispatch(setNotification({ message: 'wrong username or password', success: false }))
    }
  }

  return (
    <form>
      <div>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              name="username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              name="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button onClick={handleLogin} type="submit">
          login
        </button>
      </div>
    </form>
  )
}

export default LoginForm