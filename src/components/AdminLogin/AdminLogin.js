import { Button, TextField, Grid, Typography, Avatar } from "@material-ui/core";
import axios from "axios";
import { useState, useEffect } from "react";

import logo from "../login/logo.png";
import "../login/login.css";
import { Redirect } from "react-router-dom";

const AdminLogin = () => {
  const baseUrl = process.env.REACT_APP_API_ENDPOINT;

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, [userName, password]);

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(
        `${baseUrl}/admin/login/`,
        {
          user_name: userName,
          password: password,
        },
        {
          auth: {
            username: "admin",
            password: "admin",
          },
        }
      )
      .then((res) => {
        localStorage.setItem("adminUserName", res.data["user_name"]);
        window.location = "/admin/mainpage";
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setError("invalid credentials");
        }
      });
  };

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
                <form onSubmit={handleLogin}>
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <Typography component="h1" variant="h5">
                        Server Admin Sign In
                      </Typography>
                    </Grid>
                    <Grid item>
                      <TextField
                        placeholder="UserName"
                        fullWidth
                        name="username"
                        variant="outlined"
                        value={userName}
                        onChange={(event) => {
                          setUserName(event.target.value);
                        }}
                        error={error === "" ? false : true}
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
                        value={password}
                        onChange={(event) => {
                          setPassword(event.target.value);
                        }}
                        error={error === "" ? false : true}
                        required
                      />
                    </Grid>
                    {error === "" ? null : (
                      <Grid item className="errorInfo">
                        {error}
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
                <div className="login-info">
                  Contact development team to add admin account!
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminLogin;
