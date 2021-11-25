import React, { useState, useEffect } from "react";
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
  const cancel = () => {
    setDisplayName(localStorage.getItem("user_name"));
    setGithub(localStorage.getItem("github_user"));
    setIsEdit(false);
  };
  const userid = localStorage.getItem("current_user_id");
  const baseUrl2 = process.env.REACT_APP_API_ENDPOINT;
  const [isfollowed, setIsFollowed] = useState();

  if (isfollowed) {
    axios
      .get(`${baseUrl2}/author/${userid}/followers/${userid_folllow}/`)
      .then((res) => {
        console.log(res.data);
        if (res.data.result === "No follow relationship found") {
          setIsFollowed(false);
          console.log(isfollowed);
        } else {
          setIsFollowed(true);
        }
      });
  }

  // const [github_user, set_github_user] = useState(

  // );

  const [ifFollowed, setIfFollowed] = useState(() => {
    if (userid === userid_folllow) {
      return true;
    } else if (isfollowed) {
      return false;
    } else {
      return false;
    }
  });
  const [github, setGithub] = useState(localStorage.getItem("github_user"));
  const [displayName, setDisplayName] = useState(
    localStorage.getItem("user_name")
  );
  const [profileImage, setProfileImage] = useState("");
  const [originalAuthor, setOriginalAuthor] = useState("");

  const styleClasses = useStyles();
  const github_link = "https://github.com/" + github;
  const baseUrl = "https://api.github.com/users";

  useEffect(() => {
    axios
      .get(`${baseUrl2}/author/${localStorage.getItem("current_user_id")}/`, {
        auth: {
          username: "admin",
          password: "admin",
        },
      })
      .then((res) => {
        setOriginalAuthor(res.data);
        setProfileImage(res.data.profileImage);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleIfFollow = () => {
    axios
      .get(`${baseUrl2}/author/${userid}/followers/${userid_folllow}/`, {
        auth: {
          username: "admin",
          password: "admin",
        },
      })
      .then((res) => {
        console.log(res.data);
        return true;
      })
      .catch((err) => {
        return false;
      });
  };

  const handleFollow = async () => {
    if (userid === userid_folllow) {
    } else {
      const res1 = await axios.get(
        `${baseUrl2}/author/${userid_folllow.split("/").at(-1)}/`,
        {
          auth: {
            username: "admin",
            password: "admin",
          },
        }
      );
      const wantedFollowAuthor = res1.data;
      const message =
        originalAuthor.displayName +
        " want follow " +
        wantedFollowAuthor.displayName;
      console.log(message);
      try {
        await axios.post(
          `${baseUrl2}/author/${userid_folllow.split("/").at(-1)}/inbox/`,
          {
            type: "Follow",
            summary: message,
            actor: originalAuthor,
            object: wantedFollowAuthor,
          },
          {
            auth: {
              username: "admin",
              password: "admin",
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
    console.log(originalAuthor);
    axios
      .post(
        `${baseUrl2}/author/${userid}/`,
        {
          type: "author",
          id: originalAuthor.id,
          host: originalAuthor.host,
          displayName: displayName,
          url: originalAuthor.url,
          github: "https://github.com/" + github,
          profileImage: profileImage,
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
          console.log(response);
          setOriginalAuthor(response.data);
          localStorage.removeItem("github_user");
          localStorage.removeItem("user_name");
          localStorage.setItem("github_user", github);
          localStorage.setItem("user_name", displayName);
          setIsEdit(false);
        },
        (error) => {
          alert("username already exists!");
          console.log(error);
        }
      );
  };

  return (
    <Form onSubmit={handleSubmit}>
      {is_follow ? "" : <div class="text text-1">Profile</div>}

      <Grid
        container
        spacing={0}
        justifyContent="center"
        direction="column"
        alignItems="center"
      >
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
                  image={originalAuthor.profileImage}
                  alt="no img"
                />

                {isEdit ? (
                  <CardContent>
                    <Grid
                      className={styleClasses.Divider}
                      spacing={4}
                      container
                      direction="row"
                    >
                      <Grid item xs={12}>
                        <Typography variant="body1" color="text.secondary">
                          Username:
                        </Typography>

                        <Input
                          fullWidth
                          defaultValue={displayName}
                          onChange={(e) => {
                            setDisplayName(e.target.value);
                          }}
                        />
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          mt-10
                        >
                          Github Username:
                        </Typography>
                        <Input
                          fullWidth
                          defaultValue={github}
                          onChange={(e) => {
                            setGithub(e.target.value);
                          }}
                        />
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          mt-10
                        >
                          profile Image:
                        </Typography>
                        <Input
                          fullWidth
                          defaultValue={originalAuthor.profileImage}
                          onChange={(e) => {
                            setProfileImage(e.target.value);
                          }}
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
                      {displayName}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" mt-10>
                      Github Username:
                    </Typography>
                    <Typography variant="body1" color="text.secondary" mt-10>
                      <Link href={github_link}> {github}</Link>
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
