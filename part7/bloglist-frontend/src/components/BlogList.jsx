import { useSelector, useDispatch } from 'react-redux'
import Blog from '../components/Blog'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'

const BlogList = ({ user }) => {
  const dispatch = useDispatch()

  const blogs = useSelector(state => {
    return state.blogs
  })

  const removeBlog = (blog) => {
    console.log('id to remove', blog.id)
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      //console.log('inside window.confirm')
      dispatch(deleteBlog(blog.id))
    }
  }

  const addLikes = (blogToLike) => {
    //console.log('addLikes invoked', blogToLike)
    dispatch(likeBlog(blogToLike))
  }

  return (
    <div data-testid="bloglist">
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          addLikes={addLikes}
          removeBlog={removeBlog}
          user={user}
        />
      ))}
    </div>
  )
}

export default BlogList