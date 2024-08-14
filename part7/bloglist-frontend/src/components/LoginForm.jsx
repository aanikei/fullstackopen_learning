import loginService from '../services/login'
import { useEffect, useState, useContext } from 'react'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import LoginContext from '../reducers/loginContext'
import Notification from '../components/Notification'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

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
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          '& .MuiTextField-root': { m: 0.3, width: '25ch' },
          '& .MuiButton-root': { m: 0.3 },
          border: '1px solid #ccc',
          padding: 2,
          borderRadius: 1,
        }}
        component="form"
        noValidate
      >
        <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
          Log in to application
        </Typography>
        <Grid container direction="column" alignItems="flex-start">
          <Grid item>
            <TextField
              label="Username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              size="small"
              autoComplete="on"
            />
          </Grid>
          <Grid item>
            <TextField
              label="Password"
              type='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              size="small"
              autoComplete="off"
            />
          </Grid>
          <Grid item>
            <Button variant="contained" type="submit" disableElevation onClick={handleLogin}>
              login
            </Button>
            <Notification />
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default LoginForm
