import { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()
  const newBlogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  })

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm
          setUser={setUser} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in
        <button onClick={handleLogout} type="submit">
          logout
        </button>
      </p>
      <Notification />
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

export default App
