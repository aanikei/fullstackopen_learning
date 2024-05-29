const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const blogs =  require('./dummy_list')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('when list has no blogs, equals to 0', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes([blogs[0]])
    assert.strictEqual(result, 7)
  })

  test('when list has many blogs, sum of likes of all blogs', () => {
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 36)
  })
})

describe('favorites', () => {
  test('when list has no blogs, equals to undefined', () => {
    const result = listHelper.favoriteBlog([])
    assert.strictEqual(result, undefined)
  })

  test('when list has one blog, equals to that', () => {
    const singleObject = {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    }

    const result = listHelper.favoriteBlog([blogs[0]])
    assert.deepStrictEqual(result, singleObject)
  })

  test('when list has many blogs, equals to blog with maximum likes', () => {
    const singleObject = {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    }

    const result = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(result, singleObject)
  })
})

describe('authors', () => {
  test('when list has no blogs, equals to {}', () => {
    const result = listHelper.mostBlogs([])
    assert.deepStrictEqual(result, {})
  })

  test('when list has one blog, equals to that', () => {
    const singleObject = {
      author: "Michael Chan",
      blogs: 1
    }

    const result = listHelper.mostBlogs([blogs[0]])
    assert.deepStrictEqual(result, singleObject)
  })

  test('when list has many blogs, equals to the most prolific author', () => {
    const singleObject = {
      author: "Robert C. Martin",
      blogs: 3
    }

    const result = listHelper.mostBlogs(blogs)
    assert.deepStrictEqual(result, singleObject)
  })
})