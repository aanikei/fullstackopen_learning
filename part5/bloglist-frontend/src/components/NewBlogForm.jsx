import { useState } from 'react'

const NewBlogForm = ({createBlog}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleBlogCreate = (event) => {
    event.preventDefault()

    createBlog ({
      title,
      author,
      url
    })

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
          title: 
            <input
            type="text"
            value={title}
            name="title"
            onChange={event => setTitle(event.target.value)}
          />
        </div>
        <div>
          author: 
            <input
            type="text"
            value={author}
            name="author"
            onChange={event => setAuthor(event.target.value)}
          />
        </div>
        <div>
          url: 
            <input
            type="text"
            value={url}
            name="url"
            onChange={event => setUrl(event.target.value)}
          />
        </div>
        <button onClick={handleBlogCreate} type="submit">create</button>
      </div>   
    </form>
    </div>
  )
}

export default NewBlogForm
