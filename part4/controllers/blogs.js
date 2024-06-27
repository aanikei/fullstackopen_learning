const blogsRouter = require('express').Router()
const Blog = require('../models/blog').model
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', ['username', 'name'])
  response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if (blog["title"] === undefined || blog["url"] === undefined) {
    response.status(400).json({ error: "title or url are missing"})
  } else {
    const user = await User.findById('6675e6f5199dfb6a1efd1f29')
    blog.user = user.id
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
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