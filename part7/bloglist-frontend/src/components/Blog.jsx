import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { likeBlog, commentBlog } from '../reducers/blogReducer'

const Blog = () => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const addLikes = (blogToLike) => {
    dispatch(likeBlog(blogToLike))
  }

  const blogs = useSelector(state => {
    return state.blogs
  })

  let { id } = useParams()

  const addComment = (e) => {
    e.preventDefault()
    dispatch(commentBlog(id, comment))
    setComment('')
  }

  let blog = []

  if (blogs && blogs.length > 0) {
    blog = blogs.find(i => i.id === id)
  } else {
    return null
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <br></br>
      <span>{blog.likes} likes</span><button onClick={() => addLikes(blog)}>like</button>
      <br></br>
      <span>added by {blog.user === undefined ? 'unknown' : blog.user.name}</span>
      <br></br>
      <h3>comments</h3>
      <form onSubmit={addComment}>
        <div>
          <input
            type="text"
            value={comment}
            name="comment"
            onChange={({ target }) => setComment(target.value)}
          /><button type="submit">add comment</button>
        </div>
      </form>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
