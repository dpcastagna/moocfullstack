import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogList from './components/BlogList'
import Menu from './components/Menu'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
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

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
    window.location.reload() //reloads page after logout button press
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
    <form onSubmit={handleLogin}>
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
    </form>
  )

  const blogFormRef = useRef()

  if (user === null) {
    return (
      <div>
        <h2>login to application</h2>
        <Notification message={errorMessage} class="error" />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
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
        </Routes>
      </Router>
    </div>
  )
}

export default App
