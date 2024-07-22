import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const newBlogFormRef = useRef()

  const [message, setMessage] = useState(null)

  function compareLikes(a, b) {
    return b.likes - a.likes
  }

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs( blogs.sort(compareLikes) )
      console.log('blogs', blogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      console.log('user.name', user.name)
      setUsername('')
      setPassword('')
    } catch (e) {
      setMessage({ message: 'wrong username or password', success: false })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const addBlog = (newBlog) => {
    blogService
      .create(newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog).sort(compareLikes)) })

    newBlogFormRef.current.toggleVisibility()

    setMessage({ message: `a new blog ${newBlog.title} by ${newBlog.author} added`, success: true })
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const removeBlog = (blog) => {
    //console.log("id to remove", blog.id)
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      blogService
        .remove(blog.id)
        .then(r => {
          setBlogs(blogs.filter(i => i.id !== blog.id)) })
    }
  }

  const addLikes = (blogToUpdate) => {
    //console.log("addLikes invoked", blogToUpdate)
    blogToUpdate.likes += 1
    blogToUpdate.user = blogToUpdate.user.id

    blogService
      .update(blogToUpdate)
      .then(returnedBlog => {
        //console.log("returnedBlog", returnedBlog)
        const updatedBlogs = blogs.map(u => u.id !== returnedBlog.id ? u : returnedBlog)
        setBlogs(updatedBlogs.sort(compareLikes))
      })
  }

  const loginForm = () => (
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
      <button onClick={handleLogin} type="submit">login</button>
    </div>
  )

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} />
        <form>
          { loginForm() }
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogout} type="submit">logout</button></p>
      <Notification message={message} />
      <Togglable buttonOpen="New Blog" buttonClose="Cancel" ref={newBlogFormRef}>
        <NewBlogForm
          createBlog={addBlog}
        />
      </Togglable>
      <br />
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          addLikes={addLikes}
          removeBlog={removeBlog}
          user={user}
        />
      )}
    </div>
  )
}

export default App