import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import axios from "axios";
import { Form } from "reactstrap";
import "./font/style.css";
import { makeStyles } from "@material-ui/styles";
import {
  Button,
  CardActions,
  CardContent,
  Link,
  Input,
  Typography,
  CardMedia,
} from "@mui/material";
import { TryRounded } from "@material-ui/icons";

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

export default function Profile({
  user,
  post_github_user,
  is_follow,
  userid_folllow,
}) {
  const [url, seturl] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const edit = () => setIsEdit(true);
  const cancel = () => setIsEdit(false);
  const userid = localStorage.getItem("current_user_id");
  const baseUrl2 = process.env.REACT_APP_API_ENDPOINT;
  const [isfollowed, setIsFollowed] = useState();

  if (isfollowed) {
    axios
      .get(`${baseUrl2}/author/${userid}/followers/${userid_folllow}/`)
      .then((res) => {
        console.log(res.data);
        if (res.data.result == "No follow relationship found") {
          setIsFollowed(false);
          console.log(isfollowed);
        } else {
          setIsFollowed(true);
        }
      });
  }

  const [github_user, set_github_user] = useState("");
  const [username, setUserName] = useState("");

  const [ifFollowed, setIfFollowed] = useState(() => {
    if (userid == userid_folllow) {
      return true;
    } else if (isfollowed) {
      return false;
    } else {
      return false;
    }
  });
  const [textinput1, setTextinput1] = useState(github_user);
  const [textinput2, setTextinput2] = useState(username);

  const styleClasses = useStyles();
  const github_link = "https://github.com/" + github_user;
  const baseUrl = "https://api.github.com/users";

  useEffect(() => {
    set_github_user(localStorage.getItem("github_user"));
    setUserName(localStorage.getItem("user_name"));
    if (is_follow) {
      setUserName(user);
      set_github_user(post_github_user);
    }
    axios.get(`${baseUrl}/${github_user}`).then((res) => {
      //console.log(res.data["avatar_url"]);
      seturl(res.data["avatar_url"]);
    });
  }, [github_user]);

  const handleIfFollow = () => {
    axios
      .get(`${baseUrl2}/author/${userid}/followers/${userid_folllow}/`)
      .then((res) => {
        console.log(res.data);
        return true;
      })
      .catch((err) => {
        return false;
      });
  };

  const handleFollow = async () => {
    if (userid == userid_folllow) {
    } else {
      const res1 = await axios.get(`${baseUrl2}/author/${userid}/`);
      const authorinfor = res1.data;
      const message = authorinfor.user_name + " want follow " + username;
      console.log(userid);

      try {
        const res = await axios.post(
          `${baseUrl2}/author/${userid_folllow}/inbox/`,
          {
            type: "follow",
            summary: message,
            actor: {
              id: userid,
              user_name: authorinfor.user_name,
              github_name: authorinfor.github_name,
              type: "author",
            },
            object: {
              id: userid_folllow,
              user_name: username,
              github_name: post_github_user,
              type: "author",
            },
          }
        );
        //console.log("res",res.data)
      } catch (err) {
        console.log("errors");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEdit(false);

    //console.log(username);

    //in the case of textinput is not set， set the textinput to current github_user
    /*if (textinput1 === "") {
      setTextinput1(github_user);
    }
    if (textinput2 === "") {
      console.log(username);

      setTextinput2(username);
    }*/

    axios
      .post(`${baseUrl2}/author/${userid}/`, {
        id: userid,
        github_name: textinput1,
        user_name: textinput2,
        type: "author",
      })
      .then(
        (response) => {
          console.log(response);
          set_github_user(textinput1);
          setUserName(textinput2);
          localStorage.removeItem("github_user");
          localStorage.removeItem("user_name");
          localStorage.setItem("github_user", textinput1);
          localStorage.setItem("user_name", textinput2);
        },
        (error) => {
          alert("error ");
          console.log(error);
        }
      );
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid
        container
        spacing={0}
        justifyContent="center"
        direction="column"
        alignItems="center"
      >
        {is_follow ? "" : <div class="text text-1">Your Profile</div>}

        <Grid
          container
          spacing={2}
          direction="column"
          justifyContent="center"
          alignItems="center"
          style={{ width: "300px" }}
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
                    {is_follow ? (
                      <CardActions className={styleClasses.editbutton}>
                        <Button
                          className={styleClasses.button1}
                          variant="contained"
                          size="small"
                          disabled={ifFollowed}
                          onClick={handleFollow}
                        >
                          Follow
                        </Button>
                      </CardActions>
                    ) : (
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
                    )}
                  </CardContent>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Form>
  );
}
