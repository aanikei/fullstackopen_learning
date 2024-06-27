const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog').model
const User = require('../models/user')
const logger = require('../utils/logger')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
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

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
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

    assert.strictEqual(allBlogs.body.length, helper.initialBlogs.length + 1)

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

    await api
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
    const firstBlog = helper.initialBlogs[0]
    const { _id, ...FirstBlogWithoutID } = firstBlog
    const updatedFirstBlog = { ...FirstBlogWithoutID, likes: 123, id: firstBlog['_id'] }

    const response = await api
      .put(`/api/blogs/${updatedFirstBlog['id']}`)
      .send(updatedFirstBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

      //console.log("response", response._body)

    assert.deepStrictEqual(response._body, updatedFirstBlog)

    const allBlogs = await api.get('/api/blogs')
    assert.deepStrictEqual(allBlogs.body[0], updatedFirstBlog)
  })
})

describe('testing POST /api/users', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const password = await bcrypt.hash('seckret', 10)
    const user = new User({ username: 'testuser0', name: 'User 0', password })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()
    //logger.info("usersAtStart", usersAtStart)

    const newUser = {
      username: 'aanikei',
      name: 'Artur',
      password: 'seckret'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    //logger.info("usersAtEnd", usersAtEnd)

    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('username must be at least 3 characters long', async () => {
    const newUser = {
      username: 'aa',
      name: 'Artur',
      password: 'seckret'
    }

    const test = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
    //logger.info("error", test.body.error)
    assert(test.body.error.includes('is shorter than the minimum allowed length (3).'))
  })

  test('password must be at least 3 characters long', async () => {
    const newUser = {
      username: 'aanikei',
      name: 'Artur',
      password: 'se'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
      .expect({ error: 'password must be at least 3 characters long' })
  })

  test('username must be unique', async () => {
    const newUser = {
      username: 'testuser0', 
      name: 'User 0',
      password: 'seckret'
    }

    const usersAtStart = await helper.usersInDb()
    //logger.info("usersAtStart", usersAtStart)

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
      .expect({ error: 'username must be unique' })
  })
})

after(async () => {
  await mongoose.connection.close()
})