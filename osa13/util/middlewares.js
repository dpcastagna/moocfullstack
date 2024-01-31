const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')

const ActiveSession = require('../models/active_session')

const errorHandler = (error, req, res, next) => {
  console.error(error.message)
  // console.log("errorHandlerissa")
  if (error.name === 'CastError' || error.name === 'TypeError') {
    return res.status(400).send({ error: 'malformatted id' })
  }

  if (error.name === "SequelizeValidationError") {
    return res.status(400).send({ error: 'Username must be an email address!' })
  }

  next(error)
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      // console.log(authorization.substring(7))
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch (error){
      console.log(error)
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

const sessionCheck = async (req, res, next) => {
  const authorization = req.get('authorization').substring(7)
  // console.log('sessionCheck', authorization)
  const session = await ActiveSession.findOne({ where: { token: authorization } })
  // console.log(session)
  if (!session) {
    console.log('jee')
    throw new Error('Session not found!')
  } 
  next()
}

const banCheck = (user, res) => {
  // console.log(user)
  if (!user.disabled) {
    // console.log(user.disabled)
    return
  } else {
    return res.status(401).json({
      error: 'account disabled, please contact admin'
    })
  }
}

module.exports = {
  errorHandler, tokenExtractor, sessionCheck, banCheck
}