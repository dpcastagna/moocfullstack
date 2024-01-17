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

module.exports = {
  errorHandler
}