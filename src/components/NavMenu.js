import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import React, { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import dummy_img from "../static/musle.png";
import { makeStyles } from "@material-ui/styles";
import { useCookies } from "react-cookie";
import { Redirect } from "react-router-dom";
import "./font/style.css";
import logo from "./assets/logo.png";
import Link from "@mui/material/Link";
import axios from "axios";

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
  const [url, setUrl] = useState();

  const [cookies, setCookie, removeCookie] = useCookies();
  /*function handleRemoveCookie() {
    removeCookie("username", "/");
    removeCookie("password");
  }*/
  function handleSignOut() {
    localStorage.removeItem("current_user_id");
    localStorage.removeItem("github_user");
    localStorage.removeItem("user_name");
    setIsOut(true);
  }
  useEffect(() => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;

    axios
      .get(`${baseUrl}/author/${localStorage.getItem("current_user_id")}`, {
        auth: {
          username: "admin",
          password: "admin",
        },
      })
      .then((res) => {
        setUrl(res.data["profileImage"]);
      })
      .catch((errors) => {
        console.log(errors);
      });
  }, []);

  const styleClasses = useStyles();

  const [isOpen, setIsOpen] = useState(false);
  const [isOut, setIsOut] = useState(false);

  const [loggedIn, setLoggedIn] = useState(is_logged_in);
  const toggle = () => setIsOpen(!isOpen);
  /*if (isEmpty(cookies) && !window.location.pathname.startsWith("/service/")) {
    return <Redirect to="/login" />;
  }*/
  const user_id = localStorage.getItem("current_user_id");
  if (!user_id) {
    return <Redirect to="/login" />;
  }
  if (isOut) {
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
                <Avatar src={url} className={styleClasses.pic}></Avatar>
                <DropdownItem divider />
                <DropdownItem href="/profile">Profile</DropdownItem>
                <DropdownItem divider />

                <DropdownItem href="/mypost">My Post</DropdownItem>
                <DropdownItem divider />
                <DropdownItem href="/friends">Friends</DropdownItem>
                <DropdownItem divider />
                <DropdownItem href="/inbox">Inbox</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={handleSignOut}>Sign out</DropdownItem>
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
