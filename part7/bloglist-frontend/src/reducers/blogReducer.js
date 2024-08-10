import { createSlice, current } from '@reduxjs/toolkit'
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
    }
  }
})

export const { setBlogs, addBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs.sort(compareLikes)))
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    console.log('newBlog', newBlog)
    dispatch(addBlog(newBlog))
  }
}

export default blogSlice.reducer