const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { update } = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog
    .findById(request.params.id)
  response.json(blog)
})

/*const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}*/

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  const token = request.token
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  //const user = await User.findById(decodedToken.id)
  //console.log('body: ', body)
  
  if (!body.likes) {
    body.likes = 0
  }

  if (!body.title) {
    return response.status(400).json({ error: 'title missing' })
  }

  if (!body.url) {
    return response.status(400).json({ error: 'url missing' })
  }

  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: Number(body.likes),
    user: user._id,
  })
  
  const savedBlog = await blog.save()
  //console.log(savedBlog)
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  console.log(request.params.id.split(','))
  const blog = await Blog.findById(request.params.id.split(',')[0])
  //const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const user = await User.findById(blog.user.toString())
  //const user = request.params.id.split(',')[1]
  console.log('blog ja user: ', blog.user.toString(), user)
  if ( blog.user.toString() === user.id.toString() ) {
    await Blog.findByIdAndRemove(request.params.id.split(',')[0])
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'invalid user or token missing/invalid' })
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  /*const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  console.log(user)*/
  const blogToUpdate = await Blog.findById(request.params.id)
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: blogToUpdate.likes + 1,
    user: body.user,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  
  response.json(updatedBlog)
})

module.exports = blogsRouter
