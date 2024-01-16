const router = require('express').Router()

const { Blog, User } = require('../models')

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

router.get('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
  res.json(req.blog)
} else {
  res.status(404).end()
}
})

router.post('/', async (req, res) => {
  try {
    const user = await User.findOne()
    const blog = await Blog.create({ ...req.body, userId: user.id })
    return res.json(blog)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

router.delete('/:id', async (req, res) => {
  await Blog.destroy({where: {id: req.params.id}})
  res.status(204).end()
  // try {
  //   const blog = await Blog.findByPk(req.params.id)
  //   if (blog){
  //     await Blog.destroy({where: {id: req.params.id}})
  //     return res.status(204).end()
  //   } else {
  //     return res.status(404).end()
  //   }
  // } catch(error) {
  //   return res.status(400).json({ error })
  // }
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