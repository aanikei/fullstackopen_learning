import { useState } from 'react'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'

const App = () => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogs, setBlogs] = useState([])

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
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
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
        buttonClose="Cancel" >
        <NewBlogForm
          blogs={blogs}
          setBlogs={setBlogs} />
      </Togglable>
      <br />
      <BlogList
        blogs={blogs}
        setBlogs={setBlogs}
        user={user} />
    </div>
  )
}

export default App
