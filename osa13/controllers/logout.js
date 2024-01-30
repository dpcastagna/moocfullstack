const jwt = require('jsonwebtoken')
const router = require('express').Router()

const ActiveSession = require('../models/active_session')
const { tokenExtractor } = require('../util/middlewares')

router.delete('/', tokenExtractor, async (req, res) => {
  try {
    const authorization = req.get('authorization')
    // console.log(authorization.substring(7))
    const session = await ActiveSession.findOne({ where: { token: authorization.substring(7) } })
    // console.log('session: ', session)
    if (session){
      // console.log('ifissä')
      await ActiveSession.destroy({ where: { token: authorization.substring(7) }})
      return res.status(204).end()
    } else {
      return res.status(404).end()
    }
  } catch(error) {
    // console.log('halp')
    return res.status(400).json({ error })
  }
})

module.exports = router