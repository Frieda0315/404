import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import img from "../static/favicon2.ico";
import axios from "axios";

import { makeStyles } from "@material-ui/styles";

import {
  Button,
  CardActions,
  CardContent,
  Link,
  Typography,
  CardMedia,
} from "@mui/material";
const useStyles = makeStyles(() => ({
  button: {
    marginLeft: "-10px",
  },
  pic: {
    maxHeight: 400,
    maxWidth: 300,
    marginBottom: "30px",
    borderRadius: "50%",
  },
}));
export default function Profile() {
  const [url, seturl] = useState();
  const styleClasses = useStyles();

  const github_user = "xius666";
  const github_link = "https://github.com/" + github_user;
  const baseUrl = "https://api.github.com/users";
  const username = "404notfound";
  //fetch the github profile image
  axios.get(`${baseUrl}/${github_user}`).then((resp) => {
    console.log(resp.data["avatar_url"]);
    seturl(resp.data["avatar_url"]);
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <Card>
            <CardContent>
              <CardMedia
                className={styleClasses.pic}
                component="img"
                image={url}
                alt="no img"
              />
              <Typography variant="h4" component="div" gutterBottom>
                Your Profile
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Your Username: {username}
              </Typography>
              <Typography variant="body1" color="text.secondary" mt-10>
                Github Username:
                <Link href={github_link}> {github_user}</Link>
              </Typography>
              <CardActions className={styleClasses.button}>
                <Button variant="contained" size="small" color="primary">
                  Edit
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
