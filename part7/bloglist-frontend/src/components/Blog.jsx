import { useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'

const Blog = () => {
  // const [visible, setVisible] = useState(false)

  // const hideWhenVisible = { display: visible ? 'none' : '' }
  // const showWhenVisible = { display: visible ? '' : 'none' }

  // let userdata = blog.user
  // if (userdata === undefined) {
  //   userdata = new Object()
  //   userdata.name = 'unknown'
  // }

  // console.log('user', user)
  // console.log('userdata', userdata)

  // const blogStyle = {
  //   paddingTop: 10,
  //   paddingLeft: 2,
  //   border: 'solid',
  //   borderWidth: 1,
  //   marginBottom: 5,
  // }

  // const toggleVisibility = () => {
  //   setVisible(!visible)
  // }

  // return (
  //   <div style={blogStyle}>
  //     <div style={hideWhenVisible}>
  //       {`${blog.title} ${blog.author}`}
  //       <button onClick={toggleVisibility}>view</button>
  //     </div>

  //     <div style={showWhenVisible}>
  //       {`${blog.title} ${blog.author}`}
  //       <button onClick={toggleVisibility}>hide</button>
  //       <br />
  //       {blog.url}
  //       <br />
  //       <span className="likes">likes: {blog.likes}</span>
  //       <button onClick={() => addLikes(blog)}>like</button>
  //       <br />
  //       {userdata.name}
  //       {console.log('user.username', user.username)}
  //       {console.log('userdata.username', userdata.username)}
  //       {user.username === userdata.username && user.name === userdata.name ? (
  //         <button onClick={() => removeBlog(blog)}>remove</button>
  //       ) : null}
  //     </div>
  //   </div>
  // )

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
    </div>
  )
}

// Blog.propTypes = {
//   blog: PropTypes.object.isRequired,
//   addLikes: PropTypes.func.isRequired,
//   removeBlog: PropTypes.func.isRequired,
//   user: PropTypes.object.isRequired,
// }

export default Blog
