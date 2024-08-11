import { useContext, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import Users from './components/Users'
import User from './components/User'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import LoginContext from './reducers/loginContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

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
        <BlogList
          user={user} />
      </div>
    )
  }

  return (
    <Router>
      <div>
        <h2>blogs</h2>
        <p>
          {user.name} logged in
          <button onClick={handleLogout} type="submit">
            logout
          </button>
        </p>
        <Notification />

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/users/*" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
