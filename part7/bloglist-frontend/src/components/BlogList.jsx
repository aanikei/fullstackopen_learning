import { useEffect } from 'react'
import Blog from '../components/Blog'
import blogService from '../services/blogs'

const BlogList = ({ blogs, setBlogs, user }) => {
  console.log(blogs)
  const compareLikes = (a, b) => b.likes - a.likes

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs.sort(compareLikes))
      console.log('blogs', blogs)
    })
  }, [setBlogs])

  const removeBlog = (blog) => {
    console.log('id to remove', blog.id)
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      console.log('inside window.confirm')
      blogService.remove(blog.id).then((r) => {
        setBlogs(blogs.filter((i) => i.id !== blog.id))
      })
    }
  }

  const addLikes = (blogToUpdate) => {
    //console.log("addLikes invoked", blogToUpdate)
    blogToUpdate.likes += 1
    blogToUpdate.user = blogToUpdate.user.id

    blogService.update(blogToUpdate).then((returnedBlog) => {
      //console.log("returnedBlog", returnedBlog)
      const updatedBlogs = blogs.map((u) =>
        u.id !== returnedBlog.id ? u : returnedBlog,
      )
      setBlogs(updatedBlogs.sort(compareLikes))
    })
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