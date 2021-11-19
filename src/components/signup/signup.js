/*
    Author: Aswin Vp,Shiyu Xiu
    Date: 2020 jun 1
    Availability: https://medium.com/@aswinvp/a-mock-login-form-using-react-material-ui-754cdad0a9e8
*/
import React from "react";
import "./signup.css";
import "../font/style.css";
import axios from "axios";
import { Redirect } from "react-router-dom";

import { Button, TextField, Grid, Typography } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      github_name: "",
      password: "",
      finished: 0,
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

  handleSubmit(event) {
    event.preventDefault();
    if (
      this.state.username !== "" &&
      this.state.password !== "" &&
      this.state.github_name !== ""
    ) {
      const baseUrl2 = process.env.REACT_APP_API_ENDPOINT;
      axios
        .post(`${baseUrl2}/users/signup/`, {
          id: uuidv4(),
          user_name: this.state.username,
          password: this.state.password,
          github_name: this.state.github_name,
          type: "author",
        })
        .then(
          (response) => {
            console.log(response);
            this.setState({ finished: 1 });
          },
          (error) => {
            alert("username exists!");
            console.log(error);
          }
        );
    } else {
      alert("Incorrect Credntials!");
    }
  }
  render() {
    if (this.state.finished === 1) {
      console.log("fs");
      return <Redirect to="/login"></Redirect>;
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
              <div class="text text-3"> Sign up your account</div>

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
                          name="github_name"
                          variant="outlined"
                          value={this.state.github_name}
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
                        >
                          Sign Up
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default Signup;
