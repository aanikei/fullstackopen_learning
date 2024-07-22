const blogsRouter = require('express').Router()
const Blog = require('../models/blog').model
const logger = require('../utils/logger')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', ['username', 'name'])
  response.json(blogs)
})
  
blogsRouter.post('/', middleware.userExtractor, async (request, response, next) => {
  const blog = new Blog(request.body)

  const user = request.user

  if (blog["title"] === undefined || blog["url"] === undefined) {
    response.status(400).json({ error: "title or url are missing"})
  } else {
    blog.user = user._id
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  }
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)
  
  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = { ...request.body }
  //console.log("blog", blog)

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).populate('user', ['username', 'name'])
  response.json(updatedBlog)
})

module.exports = blogsRouter