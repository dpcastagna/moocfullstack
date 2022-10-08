import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', async () => {
  const blog = {
    title: 'kuuden blogi',
    author: 'kuusi',
    url: 'www.kuusi.fi',
    likes: 5,
    user: {
      name: 'uusikuusi',
      username: 'kuusi'
    }
  }

  const userObject = {
    name: 'uusikuusi',
    _username: 'kuusi'
  }

  const mockHandler = jest.fn()

  render(
    <Blog blog={blog} user={userObject} createLike={mockHandler} />
  )

  screen.debug()

  //const user = userEvent.setup()
  const element = screen.getByText('view')
  //await user.click(element)
  expect(element).toBeDefined()
  //expect(mockHandler.mock.calls).toHaveLength(1)
})

test('renders blog title and author and does not render url and likes', async () => {
  const blog = {
    title: 'kuuden blogi',
    author: 'kuusi',
    url: 'www.kuusi.fi',
    likes: 5,
    user: {
      name: 'uusikuusi',
      username: 'kuusi'
    }
  }

  const userObject = {
    name: 'uusikuusi',
    username: 'kuusi',
    _id: 123456
  }

  const mockHandler = jest.fn()

  render(
    <Blog blog={blog} user={userObject} createLike={mockHandler} />
  )

  screen.debug()

  //const user = userEvent.setup()
  const element = screen.getByText(`${blog.title} ${blog.author}`)
  //await user.click(element)
  expect(element).toBeDefined()
  expect(screen.queryByText(`${blog.url}`)).not.toBeInTheDocument()
  expect(screen.queryByText(`likes ${blog.likes}`)).not.toBeInTheDocument()
  //expect(mockHandler.mock.calls).toHaveLength(1)
})

test('url and likes are shown after blog view button is pressed', async () => {
  const blog = {
    title: 'kuuden blogi',
    author: 'kuusi',
    url: 'www.kuusi.fi',
    likes: 5,
    user: {
      name: 'uusikuusi',
      username: 'kuusi'
    }
  }

  const userObject = {
    name: 'uusikuusi',
    username: 'kuusi',
    _id: 123456
  }

  const mockHandler = jest.fn()

  let container

  container = render(
    <Blog blog={blog} user={userObject} createLike={mockHandler} />
  ).container

  //screen.debug()
  //console.log('container: ', container)
  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)
  screen.debug()
  expect(viewButton).toBeDefined()
  const div = container.querySelector('.shown')
  //console.log('div: ', div)
  expect(div).not.toHaveStyle('display: none')
  //expect(screen.toHaveTextContent('www.kuusi.fi'))
  //expect(screen.queryByText(`likes ${blog.likes}`)).toBeInTheDocument()
})

test('when like button is clicked twice, mockhandler is called twice', async () => {
  const blog = {
    title: 'kuuden blogi',
    author: 'kuusi',
    url: 'www.kuusi.fi',
    likes: 5,
    user: {
      name: 'uusikuusi',
      username: 'kuusi'
    }
  }

  const userObject = {
    name: 'uusikuusi',
    username: 'kuusi',
    _id: 123456
  }

  const mockHandler = jest.fn()

  render(
    <Blog blog={blog} user={userObject} createLike={mockHandler} />
  )

  //screen.debug()

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)
  screen.debug()
  expect(viewButton).toBeDefined()
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)
  //expect(screen.queryByText('kuusi.fi')).toBeInTheDocument()
  //expect(screen.queryByText(`likes ${blog.likes}`)).toBeInTheDocument()
  expect(mockHandler.mock.calls).toHaveLength(2)
})