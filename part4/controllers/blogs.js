const blogsRouter = require('express').Router()
const Blog = require('../models/blog').model
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', ['username', 'name'])
  response.json(blogs)
})
  
blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)

  try {
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
  
    const user = await User.findById(decodedToken.id)
  
    if (blog["title"] === undefined || blog["url"] === undefined) {
      response.status(400).json({ error: "title or url are missing"})
    } else {
      blog.user = user._id
      const savedBlog = await blog.save()
      response.status(201).json(savedBlog)
    }  
  } catch (err) {
    next(err)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = { ...request.body }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

module.exports = blogsRouter