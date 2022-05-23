import { useState } from 'react'

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
    <form onSubmit={addBlog}>
      <h2>create new</h2>
      title:
      <input
        value={newTitle}
        onChange={handleTitleChange}
      /> <br />
      author:
      <input
        value={newAuthor}
        onChange={handleAuthorChange}
      /> <br />
      url:
      <input
        value={newUrl}
        onChange={handleUrlChange}
      /> <br />
      <button type="submit">create</button>
    </form>  
  )
}

export default BlogForm