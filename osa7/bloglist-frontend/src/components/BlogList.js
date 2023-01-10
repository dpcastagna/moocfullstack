import { useState, useEffect } from 'react'
import Blog from '../components/Blog'
import blogService from '../services/blogs'

const BlogList = (props) => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])
  console.log(blogs)
  return (
    <div>
      blaa
      {blogs
        .sort((a, b) => {
          return a.likes > b.likes ? -1 : 1
        })
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={props.user}
            createLike={props.createLike}
          />
        ))}
    </div>
  )
}

export default BlogList
