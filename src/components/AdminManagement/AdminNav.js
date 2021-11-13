import { useState } from "react";
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
import Link from "@mui/material/Link";
import { Avatar } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import logo from "../assets/logo.png";

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

const AdminNav = () => {
  const styleClasses = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const handleSignOut = () => {
    localStorage.removeItem("current_user_id");
    localStorage.removeItem("github_user");
    localStorage.removeItem("user_name");
  };
  return (
    <Navbar light expand="md">
      <Link href="/admin/mainpage">
        <Avatar
          alt="Remy Sharp"
          src={logo}
          sx={{ width: 90, height: 80, marginLeft: 2 }}
        />
      </Link>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ms-auto" navbar>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret className={styleClasses.account}>
              Menu
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem href="/admin/newnode">New Node</DropdownItem>
              <DropdownItem divider />
              <DropdownItem href="/admin/authors">
                Author Management
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem href="/" onClick={handleSignOut}>
                Sign Out
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default AdminNav;
