const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const logger = require('../utils/logger')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', ['url', 'title', 'author'])
  response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password, blogs} = request.body

  if (password.length < 3) {
    return response.status(400).json({
      error: 'password must be at least 3 characters long'
    })
  }

  const existingUser = await User.findOne({ username })
  if (null !== existingUser) {
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
    password: passwordHash,
    blogs
  })
  //console.log("user", user)

  user.save()
    .then(savedUser => {
      response.status(201).json(savedUser)
    })
    .catch(error => next(error))
})

module.exports = usersRouter