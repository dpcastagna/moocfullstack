import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({blog, user}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  console.log(blog)
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const likeSend = (event) => {
    event.preventDefault()

    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: user._id,
    }

    blogService
      .update(blog.id, blogObject)
      .then(
        setLikes(blog.likes += 1)
      )
  }

  return(
    <div style={blogStyle}>
      
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}<button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>hide</button><br />
        {blog.url}<br />
        likes {blog.likes}<button onClick={likeSend}>like</button><br />
        {blog.user.name}
      </div>
    </div>  
)}

export default Blog