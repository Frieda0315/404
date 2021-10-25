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
import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import dummy_img from "../static/musle.png";
import { makeStyles } from "@material-ui/styles";
import { useCookies } from "react-cookie";
import { Route, Switch, Redirect } from "react-router-dom";
import { isEmpty } from "lodash";
import "./font/style.css";
import logo from "./assets/logo.png";
import Link from "@mui/material/Link";

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
  const [cookies, setCookie, removeCookie] = useCookies();
  function handleRemoveCookie() {
    removeCookie("username", "/");
    removeCookie("password");
  }
  const styleClasses = useStyles();

  const [isOpen, setIsOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(is_logged_in);
  const login = () => setLoggedIn(!loggedIn);
  const toggle = () => setIsOpen(!isOpen);
  if (isEmpty(cookies)) {
    return <Redirect to="/login" />;
  }

  return (
    <Navbar light expand="md">
      <Link href="/">
        <Avatar
          alt="Remy Sharp"
          src={logo}
          sx={{ width: 90, height: 80, marginLeft: 2 }}
        />
      </Link>

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
                <DropdownItem href="/profile">Profile</DropdownItem>
                <DropdownItem divider />

                <DropdownItem href="/mypost">My Post</DropdownItem>
                <DropdownItem divider />
                <DropdownItem href="/friends">Friends</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={handleRemoveCookie}>
                  Sign out
                </DropdownItem>

              </DropdownMenu>
            </UncontrolledDropdown>
          ) : null}
          {loggedIn ? null : (
            <Nav navbar>
              <NavItem>
                <NavLink href="/login">Log in</NavLink>
              </NavItem>
            </Nav>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
}

export default NavMenu;
