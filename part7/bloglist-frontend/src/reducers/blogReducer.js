import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const compareLikes = (a, b) => b.likes - a.likes

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      console.log('action.payload', action.payload)
      return action.payload
    },
    addBlog(state, action) {
      state.push(action.payload)
    },
    addLike(state, action) {
      const id = action.payload
      const blogToVote = state.find(n => n.id === id)
      //console.log('blogToVote', blogToVote)
      const likedBlog = {
        ...blogToVote,
        likes: blogToVote.likes + 1
      }
      return state.map(blog =>
        blog.id !== id ? blog : likedBlog
      ).sort(compareLikes)
    },
    removeBlog(state, action) {
      console.log('action', action)
      const id = action.payload
      return state.filter(i => i.id !== id)
    }
  }
})

export const { setBlogs, addBlog, addLike, removeBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs.sort(compareLikes)))
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    //console.log('newBlog', newBlog)
    dispatch(addBlog(newBlog))
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    //console.log('blog', blog.user)
    const likedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    const responseBlog = await blogService.update(likedBlog)
    //console.log('responseBlog', responseBlog)
    dispatch(addLike(responseBlog.id))
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch(removeBlog(id))
  }
}

export default blogSlice.reducer