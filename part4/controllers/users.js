const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const logger = require('../utils/logger')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password} = request.body

  if (password.length < 3) {
    return response.status(400).json({
      error: 'password must be at least 3 characters long'
    })
  }

  // const existingUser = await User.findOne({ username: username })
  // if (null !== existingUser) {
  //   //logger.info("not unique")
  //   return response.status(400).json({
  //     error: 'username must be unique'
  //   })
  // }
  
  const users = await User.find({})
  const usernames = users.map(u => u.username)
  if (-1 !== usernames.indexOf(username)) {
    //logger.info("not unique")
    return response.status(400).json({
      error: 'username must be unique'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds) 

  const user = new User({
    username,
    name,
    password: passwordHash
  })
  //console.log("user", user)

  user.save()
    .then(savedUser => {
      response.status(201).json(savedUser)
    })
    .catch(error => next(error))
})

module.exports = usersRouter