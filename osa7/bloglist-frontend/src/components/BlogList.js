import { useState, useEffect } from 'react'
import { Link /*Routes, Route useParams*/ } from 'react-router-dom'
//import Blog from '../components/Blog'
import blogService from '../services/blogs'

const BlogList = () => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const [blogs, setBlogs] = useState([])
  //const id = useParams().id
  //const blog = blogs.find(a => a.id === Number(id))

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])
  //console.log(blogs)
  return (
    <div>
      {blogs
        .sort((a, b) => {
          return a.likes > b.likes ? -1 : 1
        })
        .map((blog) => (
          <div key={blog.id} style={blogStyle}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        ))}
    </div>
  )
}

export default BlogList
