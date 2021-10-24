/*
    Author: Aswin Vp,Shiyu Xiu
    Date: 2020 jun 1
    Availability: https://medium.com/@aswinvp/a-mock-login-form-using-react-material-ui-754cdad0a9e8
*/
import React from "react";
import "./signup.css";
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
} from "@material-ui/core";
import { withCookies, Cookies } from "react-cookie";

class Login extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      github_user: "",
      password: "",
      authflag: 1,
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
      this.props.history.push("/signup");
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
              <div class="text text-3"> Sign up your account</div>

              <Paper
                variant="elevation"
                elevation={3}
                className="login-background"
              >
                <Grid item style={{ width: "300px" }}>
                  <form onSubmit={this.handleSubmit}>
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <Typography component="h1" variant="h6">
                          Sign up
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
                          placeholder="Github Username"
                          fullWidth
                          name="github_user"
                          variant="outlined"
                          value={this.state.github_user}
                          onChange={(event) =>
                            this.setState({
                              [event.target.name]: event.target.value,
                            })
                          }
                          required
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
                          href="/login"
                          onClick={this.handleCookie}
                        >
                          Sign Up
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
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
