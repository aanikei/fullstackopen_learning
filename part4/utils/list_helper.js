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
  if (blogs.length === 0) {
    return {}
  } else {
    const authorsWithBlogs = _.countBy(blogs, 'author')
    console.log("authorsWithBlogs", authorsWithBlogs)
    const author = _.findLastKey(authorsWithBlogs)
    console.log("author", author)
    const count = authorsWithBlogs[author]
    console.log("count", count)
    
    return { author: author, blogs: count }
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {}
  } else {
    const grouped = _.groupBy(blogs, 'author');
    console.log('grouped', grouped)
    const summed = _.mapValues(grouped, (i) => _.sumBy(i, 'likes'))
    console.log("summed", summed)
    const sorted = _.orderBy(_.toPairs(summed), 1, 'asc');
    console.log("sortedArray", sorted)
    const lastElement = _.last(sorted)
    const author = lastElement[0]
    console.log("author", author)
    const likes = lastElement[1]
    console.log("likes", likes)
    
    return { author: author, likes: likes }
  }
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}