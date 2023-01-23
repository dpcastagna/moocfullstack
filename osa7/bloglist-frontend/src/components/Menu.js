import { Link } from 'react-router-dom'
import { Navbar, Nav, Button } from 'react-bootstrap'

const Menu = (props) => {
  const padding = {
    paddingRight: 5,
    //backgroundColor: 'lightgrey',
  }
  return (
    /*<div style={padding}>
      <Link style={padding} to="/">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      {props.user} has logged in <button onClick={props.logout}>logout</button>
    </div>*/
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/">
              blogs
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/users">
              users
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <em>
              {props.user} logged &nbsp;
              <Button variant="secondary" onClick={props.logout}>
                logout
              </Button>
            </em>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Menu
