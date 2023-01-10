import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> calls createBlog function with right information onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog} />)

  const inputTitle = screen.getByPlaceholderText('blog title')
  const inputAuthor = screen.getByPlaceholderText('blog author')
  const inputUrl = screen.getByPlaceholderText('blog url')
  const sendButton = screen.getByText('create')
  expect(sendButton).toBeDefined()

  await user.type(inputTitle, 'testing blog title')
  await user.type(inputAuthor, 'tester')
  await user.type(inputUrl, 'testing.fi')
  //screen.debug()
  await user.click(sendButton)
  //console.log(createBlog.mock.calls)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing blog title')
  expect(createBlog.mock.calls[0][0].author).toBe('tester')
  expect(createBlog.mock.calls[0][0].url).toBe('testing.fi')
  expect(createBlog.mock.calls[0][0].likes).toBe(0)
})
