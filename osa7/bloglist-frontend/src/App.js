import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogList from './components/BlogList'
import Menu from './components/Menu'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { Users, User } from './components/Users'
import blogService from './services/blogs'
import loginService from './services/login'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  //Link,
  //useParams,
  //useNavigate,
} from 'react-router-dom'
import { Form, Button, Alert } from 'react-bootstrap'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      //console.log(user)

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setMessage(`welcome ${user.name}`)
      setTimeout(() => {
        setMessage(null)
      }, 10000)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    //window.location.reload() //reloads page after logout button press
    setUser(null)
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject).then((returnedBlog) => {
      console.log(blogObject, returnedBlog)
      setBlogs(blogs.concat(returnedBlog))
      setErrorMessage(
        `a new blog ${blogObject.title} by ${blogObject.author} added`,
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
  }

  const addLike = (blogObject) => {
    console.log(blogObject)
    blogService
      .update(blogObject.id, blogObject)
      .then(console.log('like added!'))
  }

  const loginForm = () => (
    /*<form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>*/
    <Form onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label>username:</Form.Label>
        <Form.Control
          type="text"
          name="username"
          onChange={({ target }) => setUsername(target.value)}
        />
        <Form.Label>password:</Form.Label>
        <Form.Control
          type="password"
          onChange={({ target }) => setPassword(target.value)}
        />
        <Button variant="primary" type="submit">
          login
        </Button>
      </Form.Group>
    </Form>
  )

  const blogFormRef = useRef()

  if (user === null) {
    return (
      <div className="container">
        <h2>login to application</h2>
        <Notification message={errorMessage} class="error" />
        {loginForm()}
      </div>
    )
  }

  return (
    <div className="container">
      {message && <Alert variant="success"> {message} </Alert>}
      <Router>
        <Menu user={user.name} logout={handleLogout} />
        <h2>blog app</h2>
        <Notification message={errorMessage} class="success" />
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
        <Routes>
          <Route
            path="/"
            element={<BlogList user={user} createLike={addLike} />}
          />
          <Route
            path="/blogs/:id"
            element={<Blog user={user} blogs={blogs} createLike={addLike} />}
          />
          <Route
            path="/users"
            element={<Users user={user} blogs={blogs} createLike={addLike} />}
          />
          <Route path="/users/:id" element={<User />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
