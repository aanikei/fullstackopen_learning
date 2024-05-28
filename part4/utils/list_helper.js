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

module.exports = {
  dummy, totalLikes, favoriteBlog
}