import { useContext, useEffect, useRef } from 'react'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import LoginContext from './reducers/loginContext'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Notification from './components/Notification'

import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

const App = () => {
  const [user, userDispatch] = useContext(LoginContext)

  const dispatch = useDispatch()
  const newBlogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  })

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedInUser')
    userDispatch({ type: 'logout' })
  }

  if (user === null) {
    return (
      <LoginForm />
    )
  }

  const Main = () => {
    return (
      <div>
        <Togglable
          buttonOpen="New Blog"
          buttonClose="Cancel"
          ref={newBlogFormRef} >
          <NewBlogForm
            user={user}
            newBlogFormRef={newBlogFormRef} />
        </Togglable>
        <br />
        <Blogs />
      </div>
    )
  }

  return (
    <Router>
      <div>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
              BLOG APP
            </Typography>
            <Box sx={{ display: 'flex', flexGrow: 1, ml: 2 }}>
              <Typography variant="h6" color="inherit" to='/' component={Link}>
                <Button sx={{ color: 'white' }} variant="text">blogs</Button>
              </Typography>
              <Typography variant="h6" color="inherit" to='/users' component={Link}>
                <Button sx={{ color: 'white' }} variant="text">users</Button>
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body1" color="inherit" sx={{ mr: 2 }}>
                {user.name} logged in
              </Typography>
              <Button variant="contained" onClick={handleLogout}>
                logout
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <Notification />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/users/*" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
