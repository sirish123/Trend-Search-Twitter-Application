import React from 'react'
import logo from '../ll.png';
import 'bootstrap/dist/css/bootstrap.css'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
function NavbarComp() {
  return (
    <div>
    <Navbar bg="dark" variant="dark"
    sticky="top" expand="sm" collapseOnSelect>
      <Navbar.Brand><img  className ="mr-1" src={logo} width="40px" height="40px" />{' '}</Navbar.Brand>
    
    <Navbar.Brand>
      <h4>Trend Search</h4>
    </Navbar.Brand>

    <Navbar.Toggle className="coloring" />
    <Navbar.Collapse>
      <Nav>
        <Nav.Link href="#about-us"><h5>About Us</h5></Nav.Link>
        <Nav.Link href="#contact-us"><h5>Contact Us</h5></Nav.Link>
      </Nav>
    </Navbar.Collapse>

  </Navbar>
  </div>
  )
}

export default NavbarComp