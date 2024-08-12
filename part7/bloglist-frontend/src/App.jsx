import { useContext, useEffect, useRef } from 'react'
import Notification from './components/Notification'
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
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm />
      </div>
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

  const padding = {
    paddingRight: 5
  }

  return (
    <Router>
      <div>
        <Link to='/' style={padding}>blogs</Link>
        <Link to='/users' style={padding}>users</Link>
        {user.name} logged in
        <button onClick={handleLogout} type="submit">
          logout
        </button>
        <h2>blog app</h2>

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
