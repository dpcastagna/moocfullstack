import { Link } from 'react-router-dom'

const Menu = (props) => {
  const padding = {
    paddingRight: 5,
    backgroundColor: 'lightgrey',
  }
  return (
    <div style={padding}>
      <Link style={padding} to="/">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      {props.user} has logged in <button onClick={props.logout}>logout</button>
    </div>
  )
}

export default Menu
