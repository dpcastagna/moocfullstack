import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, user }) => {
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
  const sameUser = blog.user.name === user.name
  const showRemove = { display: sameUser ? '' : 'none' }
  //console.log("nimi sama", sameUser, visible)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const likeSend = (event) => {
    event.preventDefault()

    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: likes + 1,
      user: user._id,
    }

    blogService
      .update(blog.id, blogObject)
      .then(
        setLikes(blog.likes += 1)
      )
  }

  const removeBlog = (event) => {
    event.preventDefault()
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      //console.log("jee", blog.id)
      blogService
        .remove(blog.id)
        .then(
          window.location.reload()
        )
    }
  }

  return(
    <div style={blogStyle}>

      <div style={hideWhenVisible}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button><br />
        {blog.url}<br />
        likes {blog.likes} <button onClick={likeSend}>like</button><br />
        {blog.user.name}
        <div style={showRemove}>
          <button onClick={removeBlog}>remove</button>
        </div>
      </div>
    </div>
  )}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog