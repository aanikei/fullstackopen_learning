import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, addLikes, removeBlog, user }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  let userdata = blog.user
  if (userdata === undefined) {
    userdata = new Object()
    userdata.name = 'unknown'
  }

  //console.log("user", user)
  //console.log("userdata", userdata)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {`${blog.title} ${blog.author}`}
        <button onClick={toggleVisibility}>view</button>
      </div>

      <div style={showWhenVisible}>
        {`${blog.title} ${blog.author}`}
        <button onClick={toggleVisibility}>hide</button>
        <br/>
        {blog.url}
        <br/>
        <span>likes: </span>{blog.likes}
        <button onClick={() => addLikes(blog)}>like</button>
        <br/>
        {userdata.name}
        { user.username === userdata.username && user.name === userdata.name
          ? <button onClick={() => removeBlog(blog)}>remove</button> : null }
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLikes: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog