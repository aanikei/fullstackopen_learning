const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog').model
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.blogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned in correct amount and as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, helper.blogs.length)
})

test('unique identifier property of the blog posts is named id', async () => {
  const response = await api
    .get('/api/blogs')
  
  assert.notStrictEqual(response.body[0]['id'], undefined)
})

test('new blog is correctly added', async () => {
  const newBlog = {
    "title": "Test Blog",
    "author": "Test Author",
    "url": "http://localhost:12345",
    "likes": 0
  }

  const response = await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(201)
  .expect('Content-Type', /application\/json/)

  console.log("response", response.text)

  const allBlogs = await api.get('/api/blogs')

  assert.strictEqual(allBlogs.body.length, helper.blogs.length + 1)

  const lastBlog = allBlogs.body[allBlogs.body.length - 1]

  const { __v, id, ...strippedLastBlog } = lastBlog;

  console.log("strippedLastBlog", strippedLastBlog)

  assert.deepStrictEqual(newBlog, strippedLastBlog)
})

after(async () => {
  await mongoose.connection.close()
})