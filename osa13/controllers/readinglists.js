const router = require('express').Router()

const { Blog, User, ReadingList } = require('../models')
const { tokenExtractor, sessionCheck } = require('../util/middlewares')

router.post('/',sessionCheck, async (req, res) => {
  try {
    const user = await User.findByPk(req.body.user_id)
    const blog = await Blog.findByPk(req.body.blog_id)
    // console.log(req.body, user, blog)
    if (!user || !blog) {
      return res.status(400).json({ error : 'Could not find user or blog!' })
    }
    const newReading = await ReadingList.create({ userId: req.body.user_id, blogId: req.body.blog_id })
    return res.json(newReading)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

router.put('/:id', tokenExtractor, sessionCheck, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const oldReading = await ReadingList.findByPk(req.params.id)
    // console.log(user, oldReading, req.body)
    if (oldReading && user && user.dataValues.id === oldReading.dataValues.userId){
      oldReading.read = true
      await oldReading.save()
      return res.status(204).end()
    } else {
      return res.status(404).json({ error: 'Unauthorized user!' })
    }
  } catch(error) {
    return res.status(400).json({ error })
  }
})

module.exports = router