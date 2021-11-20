/*
    Author: Aswin Vp,Shiyu Xiu
    Date: 2020 jun 1
    Availability: https://medium.com/@aswinvp/a-mock-login-form-using-react-material-ui-754cdad0a9e8
*/
import React from "react";
import "./login.css";
import "../font/style.css";
import axios from "axios";
import { Redirect } from "react-router-dom";

import {
  Button,
  TextField,
  Grid,
  Typography,
  Link,
  FormControlLabel,
  Radio,
  RadioGroup,
  Avatar,
} from "@material-ui/core";
import logo from "./logo.png";
class Login extends React.Component {
  /*static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };*/
  constructor(props) {
    super(props);
    this.state = {
      //username: this.props.cookies.get("username") || "",
      //password: this.props.cookies.get("password") || "",
      username: "",
      password: "",
      selected: "no",
      current_user_id: "",
      github_name: "",
      user_name: "",
      error: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.handleCookie = this.handleCookie.bind(this);
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
  handleCookie = () => {};
  handleSubmit(event) {
    event.preventDefault();
    if (this.state.username !== "" && this.state.password !== "") {
      const baseUrl2 = process.env.REACT_APP_API_ENDPOINT;
      console.log(this.state.username);
      console.log(this.state.password);
      axios
        .post(
          `${baseUrl2}/users/login/`,
          {
            user_name: this.state.username,
            password: this.state.password,
          },
          {
            auth: {
              username: "admin",
              password: "admin",
            },
          }
        )
        .then(
          (response) => {
            /*if (this.state.selected === "yes") {
              const { cookies } = this.props;
              cookies.set("username", this.state.username, { path: "/" }); // setting the cookie
              cookies.set("password", this.state.password, { path: "/" });
              this.setState({
                username: cookies.get("username"),
                password: cookies.get("password"),
              });
            }*/
            console.log(response.data);
            this.setState({
              current_user_id: response.data.id,
              github_name: response.data.github_name,
              user_name: response.data.user_name,
            });
          },
          (error) => {
            if (error.response.status === 401) {
              this.setState({
                error: "invalid credentials",
              });
            }
            console.log(error);
          }
        );
    } else {
      alert("Incorrect Credntials!");
    }
  }

  render() {
    const { selected } = this.state;
    if (this.state.current_user_id !== "") {
      localStorage.setItem("current_user_id", this.state.current_user_id);
      localStorage.setItem("github_user", this.state.github_name);
      localStorage.setItem("user_name", this.state.user_name);
      return <Redirect to="/"></Redirect>;
    }
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

              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Grid item style={{ width: "300px" }}>
                  <form onSubmit={this.handleSubmit}>
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <Typography component="h1" variant="h5">
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
                          error={this.state.error === "" ? false : true}
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
                          error={this.state.error === "" ? false : true}
                          required
                        />
                      </Grid>
                      {this.state.error === "" ? null : (
                        <Grid item className="errorInfo">
                          {this.state.error}
                        </Grid>
                      )}
                      <Grid item>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          className="button-block"
                        >
                          Sign in
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
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default Login;
