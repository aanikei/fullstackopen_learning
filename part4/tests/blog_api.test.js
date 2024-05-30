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
  console.log("response.body", response.body)
  assert.notStrictEqual(response.body[0]['id'], undefined)
})

after(async () => {
  await mongoose.connection.close()
})