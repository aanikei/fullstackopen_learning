const { test, after, beforeEach, describe } = require('node:test')
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

describe('testing GET /api/blogs', () => {
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
})

describe('testing POST /api/blogs', () => {
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

    const allBlogs = await api.get('/api/blogs')

    assert.strictEqual(allBlogs.body.length, helper.blogs.length + 1)

    const lastBlog = allBlogs.body[allBlogs.body.length - 1]
    const { __v, id, ...strippedLastBlog } = lastBlog;

    assert.deepStrictEqual(strippedLastBlog, newBlog)
  })

  test('if the likes property is missing, defaults to 0', async () => {
    const newBlog = {
      "title": "Test Blog",
      "author": "Test Author",
      "url": "http://localhost:12345"
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const allBlogs = await api.get('/api/blogs')
    const lastBlog = allBlogs.body[allBlogs.body.length - 1]
    const { __v, id, ...strippedLastBlog } = lastBlog;

    const updatedNewBlog = { ...newBlog, likes: 0 }

    assert.deepStrictEqual(strippedLastBlog, updatedNewBlog)
  })

  test('if the title or url properties are missing, respond 400 Bad Request', async () => {
    const newBlogNoTitle = {
      "author": "Test Author",
      "url": "http://localhost:12345"
    }

    const responseForNoTitle = await api
      .post('/api/blogs')
      .send(newBlogNoTitle)
      .expect(400)

    const newBlogNoURL = {
      "title": "Test Blog",
      "author": "Test Author"
    }

    const responseForNoURL = await api
      .post('/api/blogs')
      .send(newBlogNoURL)
      .expect(400)
  })
})

describe('testing DELETE /api/blogs/:id', () => {
  test('deleting a single blog post resource', async () => {
    const response = await api
      .delete('/api/blogs/5a422a851b54a676234d17f7')
      .expect(204)
  })
})

describe('testing PUT /api/blogs/:id', () => {
  test('updating the number of likes of an individual blog post', async () => {
    const firstBlog = helper.blogs[0]
    const { _id, ...FirstBlogWithoutID } = firstBlog
    const updatedFirstBlog = { ...FirstBlogWithoutID, likes: 123, id: firstBlog['_id'] }

    const response = await api
      .put(`/api/blogs/${updatedFirstBlog['id']}`)
      .send(updatedFirstBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

      console.log("response", response._body)

    assert.deepStrictEqual(response._body, updatedFirstBlog)

    const allBlogs = await api.get('/api/blogs')
    assert.deepStrictEqual(allBlogs.body[0], updatedFirstBlog)
  })
})

after(async () => {
  await mongoose.connection.close()
})