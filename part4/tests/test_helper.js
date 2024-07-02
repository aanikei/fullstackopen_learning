const initialBlogs =  require('./dummy_list')
const User = require('../models/user')

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

let authToken = "";

const setToken = x => {
  authToken = x
}

const getToken = () => {
  return authToken
}

let userId = "";

const setUserId = x => {
  userId = x
}

const getUserId = () => {
  return userId
}

module.exports = {
  initialBlogs, usersInDb, setToken, getToken, setUserId, getUserId
}