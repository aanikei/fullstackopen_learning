import { useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'

const Blog = () => {
  const dispatch = useDispatch()

  const addLikes = (blogToLike) => {
    dispatch(likeBlog(blogToLike))
  }

  const blogs = useSelector(state => {
    return state.blogs
  })

  let { id } = useParams()
  console.log('id', id)

  let blog = []

  if (blogs && blogs.length > 0) {
    blog = blogs.filter(i => i.id === id)[0]
  } else {
    return null
  }
  console.log('blogs', blogs)

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
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
