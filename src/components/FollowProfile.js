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

const FollowProfile = ({ follow_user_url }) => {
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

  const baseUrl2 = process.env.REACT_APP_API_ENDPOINT;
  const [followUser, setFollowUser] = useState({ profileImage: "abc" });
  const styleClasses = useStyles();
  const handleFollow = async () => {
    const followerId = followUser.id.split("/").at(-1);
    const currentUserid = localStorage.getItem("current_user_id");
    if (currentUserid === followerId) {
    } else {
      const res1 = await axios.get(`${baseUrl2}/author/${currentUserid}/`, {
        auth: {
          username: "admin",
          password: "admin",
        },
      });
      const authorinfor = res1.data;
      const message =
        authorinfor.displayName + " want follow " + followUser.displayName;

      try {
        console.log(authorinfor.id);
        console.log(followUser.id);
        await axios.post(
          `${baseUrl2}/author/${followerId}/inbox/`,
          {
            type: "follow",
            summary: message,
            actor: {
              id: authorinfor.id,
              displayName: authorinfor.displayName,
              github: authorinfor.github,
              type: "author",
              url: authorinfor.url,
              profileImage: authorinfor.profileImage,
            },
            object: {
              id: followUser.id,
              displayName: followUser.displayName,
              github: followUser.github,
              type: "author",
              url: followUser.url,
              profileImage: followUser.profileImage,
            },
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
  useEffect(() => {
    console.log(follow_user_url);
    axios
      .get(follow_user_url, {
        auth: {
          username: "admin",
          password: "admin",
        },
      })
      .then((res) => {
        setFollowUser(res.data);
      });
  }, []);
  return (
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
                image={followUser.profileImage}
                alt="no img"
              />

              <CardContent>
                <Typography variant="body1" color="text.secondary">
                  Username:
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {followUser.displayName}
                </Typography>
                <Typography variant="body1" color="text.secondary" mt-10>
                  Github Link:
                </Typography>
                <Typography variant="body1" color="text.secondary" mt-10>
                  <Link href={followUser.github}> {followUser.github}</Link>
                </Typography>

                <CardActions className={styleClasses.editbutton}>
                  <Button
                    className={styleClasses.button1}
                    variant="contained"
                    size="small"
                    // disabled={ifFollowed}
                    onClick={handleFollow}
                  >
                    Follow
                  </Button>
                </CardActions>
              </CardContent>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FollowProfile;