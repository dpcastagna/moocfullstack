import { useState, useEffect } from 'react'
import { Link /*Routes, Route*/, useParams } from 'react-router-dom'
//import Blog from '../components/Blog'
import userService from '../services/users'
import Table from 'react-bootstrap/Table'

const User = () => {
  const id = useParams().id
  const [user, setUser] = useState(null) //blogs.find((a) => a.id === Number(id))

  useEffect(() => {
    userService
      .getAll()
      .then((users) => setUser(users.find((u) => u.id === id)))
  }, [])

  if (!user) {
    return null
  }
  if (user.blogs.length === 0) {
    return (
      <div>
        <h2>{user.name}</h2>
        <b>this user has not added any blogs yet</b>
      </div>
    )
  }
  //console.log(user.blogs[0].title)
  return (
    <div>
      <h2>{user.name}</h2>
      <b>added blogs</b>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

const Users = () => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    //border: 'solid',
    //borderWidth: 1,
    marginBottom: 5,
  }

  const [users, setUsers] = useState([])
  //const id = useParams().id
  //const blog = blogs.find(a => a.id === Number(id))

  useEffect(() => {
    userService.getAll().then((users) => setUsers(users))
  }, [])
  //console.log(users)
  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <thead>
          <tr>
            <th />
            <th>
              <b>blogs created</b>
            </th>
          </tr>
        </thead>
        <tbody>
          {users
            .sort((a, b) => {
              return a.name < b.name ? -1 : 1
            })
            .map((user) => (
              <tr key={user.id} style={blogStyle}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>{' '}
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  )
}

export { Users, User }
