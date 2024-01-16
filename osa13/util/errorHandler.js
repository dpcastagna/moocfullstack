const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError' || error.name === 'TypeError') {
    return res.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

module.exports = {
  errorHandler
}