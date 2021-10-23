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
import { Avatar } from "@mui/material";
import dummy_img from "../static/musle.png";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  pic: {
    marginLeft: "55px",
  },
  account: {
    marginRight: "55px",
  },
  title: {
    marginLeft: "25px",
  },
}));
function NavMenu(is_logged_in) {
  const styleClasses = useStyles();

  const [isOpen, setIsOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(is_logged_in);
  const login = () => setLoggedIn(!loggedIn);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <Navbar color="dark" dark expand="md">
      <NavbarBrand href="/" className={styleClasses.title}>
        I-Connect
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ms-auto" navbar>
          {loggedIn ? (
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret className={styleClasses.account}>
                Account
              </DropdownToggle>
              <DropdownMenu right>
                <Avatar src={dummy_img} className={styleClasses.pic}></Avatar>
                <DropdownItem divider />
                <DropdownItem href="/profile/">Profile</DropdownItem>
                <DropdownItem divider />
                <DropdownItem href="/mypost/">My Post</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={login}>Sign out</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          ) : null}
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
