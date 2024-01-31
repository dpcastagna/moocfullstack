const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const User = require('../models/user')
const ActiveSession = require('../models/active_session')
const { banCheck } = require('../util/middlewares')

router.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({
    where: {
      username: body.username
    }
  })

  const passwordCorrect = body.password === 'salainen'

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  banCheck(user, response)

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET)
  // console.log(token)

  await ActiveSession.create({ token: token })

  if (!user.disabled) {
    response
    .status(200)
    .send({ token, username: user.username, name: user.name })
  }
})

module.exports = router