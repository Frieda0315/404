/*
    Author: Aswin Vp,Shiyu Xiu
    Date: 2020 jun 1
    Availability: https://medium.com/@aswinvp/a-mock-login-form-using-react-material-ui-754cdad0a9e8
*/
import React from "react";
import "./login.css";
import "../font/style.css";
import { instanceOf } from "prop-types";

import {
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
  Link,
  FormControlLabel,
  Radio,
  RadioGroup,
  CardMedia,
  Avatar,
} from "@material-ui/core";
import { withCookies, Cookies } from "react-cookie";
import logo from "./logo.png";
class Login extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.cookies.get("username") || "",
      password: this.props.cookies.get("password") || "",
      authflag: 1,
      selected: "no",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      username: event.state.username,
      password: event.state.password,
    });
  }
  handleRadio = (ev) => {
    this.setState({ selected: ev.target.value });
  };
  handleCookie = () => {
    if (this.state.selected === "yes") {
      const { cookies } = this.props;
      cookies.set("username", this.state.username, { path: "/" }); // setting the cookie
      cookies.set("password", this.state.password, { path: "/" });

      this.setState({
        username: cookies.get("username"),
        password: cookies.get("password"),
      });
    }
  };
  handleSubmit(event) {
    event.preventDefault();
    if (this.state.username == "" && this.state.password == "") {
      this.props.history.push("/login");
    } else {
      alert("Incorrect Credntials!");
    }
  }
  render() {
    const { selected } = this.state;

    return (
      <div>
        <Grid
          container
          spacing={0}
          justifyContent="center"
          direction="column"
          alignItems="stretch"
          sx={{
            height: "100vh",
            backgroundColor: "aquamarine",
            width: "100%",
          }}
        >
          <Grid item>
            <Grid
              container
              direction="column"
              justify="center"
              spacing={3}
              className="login-form"
              alignItems="center"
            >
              <Avatar
                variant={"rounded"}
                alt="The image"
                src={logo}
                style={{
                  width: 200,
                  height: 200,
                }}
              />

              <Paper
                variant="elevation"
                elevation={2}
                className="login-background"
              >
                <Grid item style={{ width: "300px" }}>
                  <form onSubmit={this.handleSubmit}>
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <Typography component="h1" variant="h6">
                          Sign in
                        </Typography>
                      </Grid>
                      <Grid item>
                        <TextField
                          placeholder="UserName"
                          fullWidth
                          name="username"
                          variant="outlined"
                          value={this.state.username}
                          onChange={(event) =>
                            this.setState({
                              [event.target.name]: event.target.value,
                            })
                          }
                          required
                          autoFocus
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          type="password"
                          placeholder="Password"
                          fullWidth
                          name="password"
                          variant="outlined"
                          value={this.state.password}
                          onChange={(event) =>
                            this.setState({
                              [event.target.name]: event.target.value,
                            })
                          }
                          required
                        />
                      </Grid>
                      <Grid item>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          className="button-block"
                          href="/"
                          onClick={this.handleCookie}
                        >
                          Log in
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
                <Grid item>
                  <RadioGroup onChange={this.handleRadio} value={selected}>
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Keep me Logged in"
                    />
                  </RadioGroup>
                </Grid>

                <Grid item>
                  <Link href="/signup" variant="body2">
                    New User? Sign up here!
                  </Link>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default withCookies(Login);
