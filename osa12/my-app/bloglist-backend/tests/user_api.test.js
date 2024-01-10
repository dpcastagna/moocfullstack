const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')


beforeEach(async () => {
  await User.deleteMany({})
  //await User.insertMany(helper.initialBlogs)
})

test('username must be unique', async () => {
  const newUser = {
    username: "tuusi",
    name: "tuusi",
    password: "tuusi",
  }

  await api.post('/api/users').send(newUser)

  const response = await api.post('/api/users').send(newUser)
  expect(response.status).toBe(400)
  //console.log(response)
  //expect('Content-Type', /application\/json/)
  expect(response.body.error).toContain('unique')
})

test('an invalid username with a valid password cannot be added', async () => {
  const newUser = {
    username: "tu",
    name: "tuusi",
    password: "tuusi",
  }

  const response = await api.post('/api/users').send(newUser)
  expect(response.status).toBe(400)
  //console.log(response)
  //expect('Content-Type', /application\/json/)
  expect(response.body.error).toContain('shorter')
})

test('a valid username with an invalid password cannot be added', async () => {
  const newUser = {
    username: "tuusi",
    name: "tuusi",
    password: "tu",
  }

  const response = await api.post('/api/users').send(newUser)
  expect(response.status).toBe(400)
  //console.log(response)
  //expect('Content-Type', /application\/json/)
  expect(response.body.error).toContain('minimum length 3')
})

afterAll(() => {
  mongoose.connection.close()
})