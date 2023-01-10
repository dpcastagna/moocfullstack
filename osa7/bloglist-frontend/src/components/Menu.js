import { Link } from 'react-router-dom'

const Menu = (props) => {
  const padding = {
    paddingRight: 5,
  }
  return (
    <div>
      <Link style={padding} to="/">
        blogs
      </Link>
      <Link style={padding} to="/create">
        create new
      </Link>
      <Link style={padding} to="/about">
        about
      </Link>
      {props.user} has logged in <button onClick={props.logout}>logout</button>
    </div>
  )
}

export default Menu
