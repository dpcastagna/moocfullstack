import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ user, createLike /*blogs*/ }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const id = useParams().id
  const [blog, setBlog] = useState(null) //blogs.find((blog) => blog.id === id))
  //const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(null)
  //const hideWhenVisible = { display: visible ? 'none' : '' }
  //const showWhenVisible = { display: visible ? '' : 'none' }
  const [sameUser, setSameUser] = useState(1) //blog.user.name.includes(user.username)) //blog.user.name === user.name
  const showRemove = { display: sameUser ? '' : 'none' }
  //console.log("nimi sama", sameUser, visible)

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlog(blogs.find((blog) => blog.id === id))
    })
    //setSameUser(blog.user.name.includes(user.username))
  }, [])

  /*console.log('blog1', id, blog, blogs, user, sameUser)
  /*console.log(blog.user.name.includes(user.username))
  /*const toggleVisibility = () => {
    setVisible(!visible)
  }*/

  const likeSend = (event) => {
    event.preventDefault()

    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: likes + 1,
      user: blog.user.id,
      id: blog.id,
    }

    createLike(blogObject)
    setLikes((blog.likes += 1))
  }

  const removeBlog = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      //console.log("jee", blog.id)
      blogService.remove(blog.id, user).then(window.location.reload())
    }
  }
  if (!blog) {
    return null
  }
  if (sameUser === 1) {
    setSameUser(blog.user.name.includes(user.username))
    return null
  }
  /*if (sameUser === false) {
    setSameUser(blog.user.name.includes(user.username))
  }
  if (!visible) {
    return (
      <div className="blog" style={blogStyle}>
        <div style={hideWhenVisible} className="hidden">
          {blog.title} {blog.author}{' '}
          <button id="viewButton" onClick={toggleVisibility}>
            view
          </button>
        </div>
      </div>
    )
  }*/
  return (
    <div className="blog" style={blogStyle}>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <br />
      likes {blog.likes}{' '}
      <button id="likeButton" onClick={likeSend}>
        like
      </button>
      <br />
      added by {blog.user.name}
      <div style={showRemove}>
        <button id="removeButton" onClick={removeBlog}>
          remove
        </button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blogs: PropTypes.array,
  user: PropTypes.object.isRequired,
  createLike: PropTypes.func.isRequired,
}

export default Blog
