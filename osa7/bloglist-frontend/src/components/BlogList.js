import { useState, useEffect } from 'react'
import { Link /*Routes, Route useParams*/ } from 'react-router-dom'
//import Blog from '../components/Blog'
import blogService from '../services/blogs'
import Table from 'react-bootstrap/Table'

const BlogList = () => {
  const [blogs, setBlogs] = useState([])
  //const id = useParams().id
  //const blog = blogs.find(a => a.id === Number(id))
  /*const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }*/

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])
  //console.log(blogs)
  return (
    <Table striped>
      <tbody>
        {blogs
          .sort((a, b) => {
            return a.likes > b.likes ? -1 : 1
          })
          .map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  )
}

export default BlogList
