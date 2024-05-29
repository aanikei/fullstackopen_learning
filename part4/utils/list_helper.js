var _ = require('lodash')

const dummy = (blogs) => {
  return 1
} 

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.reduce(reducer, 0)
} 

const favoriteBlog = (blogs) => {
  const reducer = (previous, current) => {
    return (previous && previous.likes > current.likes) ? previous : current
  }

  return blogs.reduce(reducer, blogs[0])
}

const mostBlogs = (blogs) => {
  const authorsWithBlogs = _.countBy(blogs, 'author')
  console.log("authorsWithBlogs", authorsWithBlogs)
  const author = _.findLastKey(authorsWithBlogs)
  console.log("author", author)
  const count = authorsWithBlogs[author]
  console.log("count", count)
  
  return author === undefined ? { } : { author: author, blogs: count }
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs 
}