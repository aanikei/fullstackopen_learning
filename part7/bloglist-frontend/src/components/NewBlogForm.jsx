import { useState } from 'react'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const NewBlogForm = ({ user }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const handleBlogCreate = (event) => {
    event.preventDefault()

    dispatch(createBlog({ title, author, url, likes: 0, user }))

    dispatch(setNotification({
      message: `a new blog ${title} by ${author} added`,
      success: true,
    }))

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create New</h2>
      <form>
        <div>
          <div>
            <label>
              title:
              <input
                type="text"
                value={title}
                name="title"
                onChange={(event) => setTitle(event.target.value)}
                data-testid="input_title"
              />
            </label>
          </div>
          <div>
            <label>
              author:
              <input
                type="text"
                value={author}
                name="author"
                onChange={(event) => setAuthor(event.target.value)}
                data-testid="input_author"
              />
            </label>
          </div>
          <div>
            <label>
              url:
              <input
                type="text"
                value={url}
                name="url"
                onChange={(event) => setUrl(event.target.value)}
                data-testid="input_url"
              />
            </label>
          </div>
          <button onClick={handleBlogCreate} type="submit">
            create
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewBlogForm
