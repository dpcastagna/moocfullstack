import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0,
      //id: notes.length + 1,
    }
    createBlog(blogObject)

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div className="formDiv">
      <form onSubmit={addBlog}>
        <h2>create new</h2>
      title:
        <input
          value={newTitle}
          onChange={handleTitleChange}
          placeholder='blog title'
        /> <br />
      author:
        <input
          value={newAuthor}
          onChange={handleAuthorChange}
          placeholder='blog author'
        /> <br />
      url:
        <input
          value={newUrl}
          onChange={handleUrlChange}
          placeholder='blog url'
        /> <br />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm