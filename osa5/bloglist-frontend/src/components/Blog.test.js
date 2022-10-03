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
    username: 'kuusi'
  }

  const mockHandler = jest.fn()

  render(
    <Blog blog={blog} user={userObject} toggleView={mockHandler} />
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
    username: 'kuusi'
  }

  const mockHandler = jest.fn()

  render(
    <Blog blog={blog} user={userObject} toggleView={mockHandler} />
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