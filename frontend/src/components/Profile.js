import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import img from "../static/musle.png";
import axios from "axios";
import { Form } from "reactstrap";

import { makeStyles } from "@material-ui/styles";
import {
  Button,
  CardActions,
  CardContent,
  FormControl,
  Link,
  Input,
  Typography,
  CardMedia,
  TextField,
  Divider,
} from "@mui/material";
const useStyles = makeStyles(() => ({
  editbutton: {
    marginLeft: "-10px",
  },
  pic: {
    maxHeight: 400,
    maxWidth: 300,
    marginBottom: "30px",
    borderRadius: "50%",
  },
  button1: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  grid: {
    marginTop: "30px",
  },
  Divider: {
    marginTop: "40px",
  },
}));

export default function Profile() {
  const [url, seturl] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const edit = () => setIsEdit(true);
  const save = () => {
    setIsEdit(false);
  };
  const cancel = () => setIsEdit(false);

  const [github_user, set_github_user] = useState("xius666");
  const [username, setUserName] = useState("404notfound");
  const [textinput1, setTextinput1] = useState(github_user);
  const [textinput2, setTextinput2] = useState(username);

  const styleClasses = useStyles();
  const github_link = "https://github.com/" + github_user;
  const baseUrl = "https://api.github.com/users";
  console.log(isEdit);

  useEffect(() => {
    //TODO:handle 404 case
    axios.get(`${baseUrl}/${github_user}`).then((res) => {
      console.log(res.data["avatar_url"]);
      seturl(res.data["avatar_url"]);
    });
  }, [github_user]);
  const handleSubmit = (e) => {
    e.preventDefault();
    set_github_user(textinput1);
    setUserName(textinput2);
    console.log("hll");
    setIsEdit(false);
  };
  //fetch the github profile image

  return (
    <Form onSubmit={handleSubmit}>
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
                {isEdit ? (
                  <CardContent>
                    <Grid
                      className={styleClasses.Divider}
                      spacing={2}
                      container
                      direction="row"
                    >
                      <Grid item>
                        <Typography variant="body1" color="text.secondary">
                          Username:
                        </Typography>

                        <Input
                          defaultValue={username}
                          onChange={(e) => setTextinput2(e.target.value)}
                        />
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          mt-10
                        >
                          Github Username:
                        </Typography>
                        <Input
                          defaultValue={github_user}
                          onChange={(e) => setTextinput1(e.target.value)}
                        />
                      </Grid>
                      <Grid item>
                        <Button
                          type="submit"
                          className={styleClasses.button1}
                          variant="contained"
                          size="small"
                        >
                          Save
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          className={styleClasses.button1}
                          variant="contained"
                          size="small"
                          onClick={cancel}
                        >
                          Cancel
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                ) : (
                  <CardContent>
                    <Typography variant="body1" color="text.secondary">
                      Username:
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {username}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" mt-10>
                      Github Username:
                    </Typography>
                    <Typography variant="body1" color="text.secondary" mt-10>
                      <Link href={github_link}> {github_user}</Link>
                    </Typography>
                    <CardActions className={styleClasses.editbutton}>
                      <Button
                        className={styleClasses.button1}
                        variant="contained"
                        size="small"
                        onClick={edit}
                      >
                        Edit
                      </Button>
                    </CardActions>
                  </CardContent>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Form>
  );
}
