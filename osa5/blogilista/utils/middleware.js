const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const tokenExtractor = (request, response, next) => {
  
  const authorization = request.get('authorization')
  if ( authorization && authorization.toLowerCase().startsWith('bearer ') ) {
    //console.log('auth:', authorization.substring(7))
    request.token = authorization.substring(7)
  } else {
    request.token = null
  }

  //console.log(request.token)

  next()
}

const userExtractor = async (request, response, next) => {
  
  const authorization = request.get('authorization')
  if ( authorization && authorization.toLowerCase().startsWith('bearer ')) {
    //console.log('auth:', authorization.substring(7))
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const user = await User.findById(decodedToken.id)
    request.user = user
  } else {
    request.user = null
  }

  //console.log(request.token)

  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }

  next(error)
}

module.exports = {
  requestLogger,
  tokenExtractor,
  userExtractor,
  unknownEndpoint,
  errorHandler
}