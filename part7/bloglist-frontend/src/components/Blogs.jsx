import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const Blogs = () => {
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

  return (
    <div data-testid="bloglist">
      {blogs.map((blog) => (
        <div key={blog.id}>
          <Link to={`/blogs/${blog.id}`} style={blogStyle}>{blog.title} {blog.author}</Link>
        </div>
      ))}
    </div>
  )
}

export default Blogs