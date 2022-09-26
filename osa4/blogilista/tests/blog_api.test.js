const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)

  await User.deleteMany({})
  await api
        .post('/api/users')
        .send({ username:"testaaja",
                name: "testaaja",
                password: "testaaja"
              })
})

test('correct amount of blogs are returned and blogs are returned as json', async () => {
  const response = await api.get('/api/blogs')
  
  expect(response.type).toBe('application/json')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

describe('can be tests', () => {
  test('a valid blog can be added', async () => {
    const user = await api
                    .post('/api/login')
                    .send({ username: "testaaja",
                            password: "testaaja"
                          })
    //console.log(user.body)

    const newBlog = {
      _id: "5a422bc61b54a67623412345",
      title: "Testi",
      author: "testaaja",
      url: "http://testi.fi",
      likes: 2,
      __v: 0
    }

    await api
      .post('/api/blogs')
      .set({'Authorization': `Bearer ${user.body.token}`})
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    //console.log(response)
    const contents = response.body[2]//.map(r => r.content)

    expect(response.body).toHaveLength(2 + 1)
    expect(contents.title).toContain('Testi')
    expect(contents.author).toContain('testaaja')
    expect(contents.url).toContain('testi.fi')
  })

  test('a blog can be deleted', async () => {
    const user = await api
                    .post('/api/login')
                    .send({ username: "testaaja",
                            password: "testaaja"
                          })
    //console.log(user.body)

    const newBlog = {
      _id: "5a422bc61b54a67623412345",
      title: "Testi",
      author: "testaaja",
      url: "http://testi.fi",
      likes: 2,
      __v: 0
    }

    await api
      .post('/api/blogs')
      .set({'Authorization': `Bearer ${user.body.token}`})
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[2]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set({'Authorization': `Bearer ${user.body.token}`})
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })

  test('a blog can be updated', async () => {
    const user = await api
                    .post('/api/login')
                    .send({ username: "testaaja",
                            password: "testaaja"
                          })
    //console.log(user.body)

    const newBlog = {
      _id: "5a422bc61b54a67623412345",
      title: "Testi",
      author: "testaaja",
      url: "http://testi.fi",
      likes: 2,
      __v: 0
    }

    const blogToUpdate = await api
      .post('/api/blogs')
      .set({'Authorization': `Bearer ${user.body.token}`})
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    //console.log(blogToUpdate.body)
    await api
      .put(`/api/blogs/${blogToUpdate.body.id}`)
      .set({'Authorization': `Bearer ${user.body.token}`})
      .send(blogToUpdate.body)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get(`/api/blogs/${blogToUpdate.body.id}`)
    //console.log(response.body)
    const contents = response.body

    expect(contents.likes).toBe(3)
  })
})
describe('cannot be tests', () => {
  test('a blog with no title cannot be added', async () => {
    const user = await api
                    .post('/api/login')
                    .send({ username: "testaaja",
                            password: "testaaja"
                          })
    //console.log(user.body)

    const newBlog = {
      _id: "5a422bc61b54a67623412345",
      author: "testaaja",
      url: "http://testi.fi",
      likes: 2,
      __v: 0
    }

    await api
      .post('/api/blogs')
      .set({'Authorization': `Bearer ${user.body.token}`})
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('a blog with no url cannot be added', async () => {
    const user = await api
                    .post('/api/login')
                    .send({ username: "testaaja",
                            password: "testaaja"
                          })
    //console.log(user.body)

    const newBlog = {
      _id: "5a422bc61b54a67623412345",
      title: "Testi",
      author: "testaaja",
      likes: 2,
      __v: 0
    }

    await api
      .post('/api/blogs')
      .set({'Authorization': `Bearer ${user.body.token}`})
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('a blog cannot be added without token', async () => {
    const user = await api
                    .post('/api/login')
                    .send({ username: "testaaja",
                            password: "testaaja"
                          })
    //console.log(user.body)

    const newBlog = {
      _id: "5a422bc61b54a67623412345",
      title: "Testi",
      author: "testaaja",
      url: "http://testi.fi",
      likes: 2,
      __v: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })
})

test('a blog with no likes returns 0 likes', async () => {
  const user = await api
                  .post('/api/login')
                  .send({ username: "testaaja",
                          password: "testaaja"
                        })
  //console.log(user.body)

  const newBlog = {
    _id: "5a422bc61b54a67623412345",
    title: "Testi",
    author: "testaaja",
    url: "http://testi.fi",
    __v: 0
  }

  await api
    .post('/api/blogs')
    .set({'Authorization': `Bearer ${user.body.token}`})
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  //console.log(response)
  const contents = response.body[2]//.map(r => r.content)

  expect(contents.likes).toBe(0)
})

test('blog id is named "id" not "_id"', async () => {
  const blog = await helper.blogsInDb()
  //console.log(blog)
  expect(blog[0].id).toBeDefined()
})


afterAll(() => {
  mongoose.connection.close()
})