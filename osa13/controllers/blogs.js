const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')

const { Blog, User } = require('../models')
const { Op, Sequelize } = require('sequelize')

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      console.log(authorization.substring(7))
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
    // where.title = {
    //   [Op.iLike]: `%${req.query.search}%`
    // }
    // where.author = {
    //   [Op.iLike]: `%${req.query.search}%`
    // }
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

router.post('/',tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({ ...req.body, userId: user.id })
    return res.json(blog)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

router.delete('/:id', tokenExtractor, async (req, res) => {
  // await Blog.destroy({where: {id: req.params.id}})
  // res.status(204).end()
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.findByPk(req.params.id)
    // console.log(user, blog)
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
  // const blog = await Blog.findByPk(req.params.id)
  // if (blog) {
  //   blog.likes = req.body.likes
  //   await blog.save()
  //   res.json(blog)
  // } else {
  //   res.status(404).end()
  // }
})

module.exports = router