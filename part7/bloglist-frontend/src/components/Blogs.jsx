import { useSelector, useDispatch } from 'react-redux'
//import Blog from '../components/Blog'
//import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'

const Blogs = () => {
  //const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 5,
    display: 'block'
  }

  const blogs = useSelector(state => {
    return state.blogs
  })

  // const removeBlog = (blog) => {
  //   console.log('id to remove', blog.id)
  //   if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
  //     //console.log('inside window.confirm')
  //     dispatch(deleteBlog(blog.id))
  //   }
  // }

  // const addLikes = (blogToLike) => {
  //   //console.log('addLikes invoked', blogToLike)
  //   dispatch(likeBlog(blogToLike))
  // }

  return (
    <div data-testid="bloglist">
      {blogs.map((blog) => (
        <div key={blog.id}>
          <Link to={`/blogs/${blog.id}`} style={blogStyle}>{blog.title}</Link>
        </div>
      ))}
    </div>
  )
}

export default Blogs