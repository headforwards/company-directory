import React, { useState } from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import {
  NavItem,
  NavLink,
  Navbar,
  Container,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav
} from 'reactstrap';
import AuthNavItem from './AuthNavItem'
import '@fortawesome/fontawesome-free/css/all.css';

interface NavBarProps {
  isAuthenticated: boolean,
  user: any,
  authButtonMethod: React.MouseEventHandler<HTMLElement>
}

const NavBar: React.SFC<NavBarProps> = ({ isAuthenticated, user, authButtonMethod }) => {
  const [isOpen, setIsOpen] = useState(false)

  function toggle() {
    setIsOpen(!isOpen);
  }

  // Only show calendar nav item if logged in
  let calendarLink = null;
  if (isAuthenticated) {
    calendarLink = (
      <NavItem>
        <RouterNavLink to="/calendar" className="nav-link" exact>Calendar</RouterNavLink>
      </NavItem>
    );
  }

  let peopleLink = null;
  if (isAuthenticated) {
    peopleLink = (
      <NavItem>
        <RouterNavLink to="/people" className="nav-link" exact>People</RouterNavLink>
      </NavItem>
    );
  }

  return (
    <div>
      <Navbar color="dark" dark expand="md" fixed="top">
        <Container>
          <NavbarBrand href="/">React Graph Tutorial</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <RouterNavLink to="/" className="nav-link" exact>Home</RouterNavLink>
              </NavItem>
              {calendarLink}
              {peopleLink}
            </Nav>
            <Nav className="justify-content-end" navbar>
              <NavItem>
                <NavLink href="https://developer.microsoft.com/graph/docs/concepts/overview" target="_blank">
                  <i className="fas fa-external-link-alt mr-1"></i>
                  Docs
                  </NavLink>
              </NavItem>
              <AuthNavItem
                isAuthenticated={isAuthenticated}
                authButtonMethod={authButtonMethod}
                user={user} />
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar