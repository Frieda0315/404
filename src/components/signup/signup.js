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
      displayName: "",
      password: "",
      id: "",
      github: "",
      finished: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      displayName: event.state.displayName,
      password: event.state.password,
    });
  }
  handleRadio = (ev) => {
    this.setState({ selected: ev.target.value });
  };

  handleSubmit(event) {
    event.preventDefault();
    if (
      this.state.displayName !== "" &&
      this.state.password !== "" &&
      this.state.github !== ""
    ) {
      const baseUrl2 = process.env.REACT_APP_API_ENDPOINT;
      const newUuid = uuidv4();
      axios
        .post(
          `${baseUrl2}/users/signup/`,
          {
            id: "https://i-connect.herokuapp.com/service/author/" + newUuid,
            displayName: this.state.displayName,
            password: this.state.password,
            github: "https://github.com/" + this.state.github,
            type: "author",
            host: "https://i-connect.herokuapp.com",
            url: "https://i-connect.herokuapp.com/service/author/" + newUuid,
            profileImage:
              "https://avatars.githubusercontent.com/" + this.state.github,
          },
          {
            auth: { username: "admin", password: "admin" },
          }
        )
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
                          name="displayName"
                          variant="outlined"
                          value={this.state.displayName}
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
                          name="github"
                          variant="outlined"
                          value={this.state.github}
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
