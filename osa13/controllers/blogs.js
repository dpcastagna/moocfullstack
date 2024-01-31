const router = require('express').Router()

const { Blog, User } = require('../models')
const { Op, Sequelize } = require('sequelize')

const { tokenExtractor, sessionCheck, banCheck } = require('../util/middlewares')

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.get('/', async (req, res) => {
  let where = {}

  if (req.query.search) {
    where = {
      [Op.or]: [
        {
          title: {
            [Op.iLike]: `%${req.query.search}%`
          }
        },
        {
          author: {
            [Op.iLike]: `%${req.query.search}%`
          }
        }
      ]
    }
  }

  const blogs = await Blog.findAll({
    order: [['likes', 'DESC']],
    attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] },
    include: {
      model: User,
      attributes: ['name']
    },
    where
  })
  res.json(blogs)
})

router.get('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
  res.json(req.blog)
} else {
  res.status(404).end()
}
})

router.post('/', tokenExtractor, sessionCheck, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    banCheck(user, res)
    const blog = await Blog.create({ ...req.body, userId: user.id })
    return res.json(blog)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

router.delete('/:id', tokenExtractor, sessionCheck, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    banCheck(user, res)
    const blog = await Blog.findByPk(req.params.id)
    if (blog && user && user.dataValues.id === blog.dataValues.userId){
      await Blog.destroy({where: {id: req.params.id}})
      return res.status(204).end()
    } else {
      return res.status(404).end()
    }
  } catch(error) {
    return res.status(400).json({ error })
  }
})

router.put('/:id', blogFinder, async (req, res) => {
  req.blog.likes = req.body.likes
  await req.blog.save()
  res.json(req.blog)
})

module.exports = router