import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import React, { useState } from "react";

function NavMenu(is_logged_in) {
  const [isOpen, setIsOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(is_logged_in);
  const login = () => setLoggedIn(!loggedIn);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <Navbar color="dark" dark expand="md">
      <NavbarBrand href="/"> Decentralized Social Networking</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ms-auto" navbar>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Account
            </DropdownToggle>
            {loggedIn ? (
              <DropdownMenu right>
                <DropdownItem href="/profile/">Profile</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={login}>Sign out</DropdownItem>
              </DropdownMenu>
            ) : (
              <DropdownMenu right>
                <DropdownItem href="/profile/">Please Log in</DropdownItem>
              </DropdownMenu>
            )}
          </UncontrolledDropdown>
          {loggedIn ? null : (
            <Nav navbar>
              <NavItem>
                <NavLink href="/login/" onClick={login}>
                  Log in
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/signup/" onClick={login}>
                  Sign Up
                </NavLink>
              </NavItem>
            </Nav>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
}

export default NavMenu;
