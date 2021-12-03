import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import { Box, Typography } from "@material-ui/core";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ava from "./assets/avator.png";
import { CardActionArea } from "@material-ui/core";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

function Share(props) {
  const postToShare = props.post;
  const newUUID = uuidv4();
  console.log(postToShare);
  const [authorList, setAuthorList] = React.useState([]);
  const [info, setInfo] = React.useState(null);
  //const [success, setSuccess] = React.useState(false);
  const baseUrl2 = process.env.REACT_APP_API_ENDPOINT;
  const handleShare = async (user) => {
    console.log(postToShare);
    const authorResponse = await axios.get(
      `${baseUrl2}/author/${localStorage.getItem("current_user_id")}`,
      {
        auth: {
          username: "admin",
          password: "admin",
        },
      }
    );

    const finishedPost = postToShare;
    const newId =
      "https://i-connect.herokuapp.com/service/author/" +
      localStorage.getItem("current_user_id") +
      "/posts/" +
      newUUID;
    const newCommentsSrc = {
      type: "comments",
      page: 1,
      size: 5,
      post: newId,
      id: newId + "/comments",
      comments: [],
    };
    finishedPost["author"] = authorResponse.data;
    finishedPost["id"] = newId;
    finishedPost["source"] = newId;
    finishedPost["comments"] = newId + "/comments";
    finishedPost["commentsSrc"] = newCommentsSrc;
    finishedPost["published"] = new Date().toISOString();
    finishedPost["visibility"] = "FRIENDS";

    await axios.put(`${finishedPost.id}/`, finishedPost, {
      auth: {
        username: "admin",
        password: "admin",
      },
    });
    await axios
      .get(`${baseUrl2}/admin/nodes/`, {
        auth: {
          username: "admin",
          password: "admin",
        },
      })
      .then(async (res) => {
        const fileteredNode = res.data.filter(
          (item) => item.url.includes(user.host) || user.host.includes(item.url)
        );
        await axios
          .post(`${user.id}/inbox/`, finishedPost, {
            auth: {
              username: fileteredNode[0].user_name,
              password: fileteredNode[0].password,
            },
          })
          .then((response) => {
            console.log(response);
            // setSuccess(true);
            setInfo("Post shared!");
            setTimeout(() => {
              props.setOpen(false);
              setInfo(null);
            }, 5000);
          })
          .catch((error) => {
            console.log(error);
          });
      });
  };
  React.useEffect(() => {
    /**
     * For now (2021-10-29), the users API returns something like
     * [{
     *    id: "",
     *    type: "",
     *    github_name: "",
     *    user_name: ""
     * },]
     * TODO: change the following code accordingly once the author
     *       APIs are updated
     */
    axios
      .get(
        `${baseUrl2}/author/${localStorage.getItem(
          "current_user_id"
        )}/followers/`,
        {
          auth: {
            username: "admin",
            password: "admin",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setAuthorList(response.data["items"]);
      });
  }, []);
  //console.log(props.post);
  const followerList = authorList.map((s) => (
    <div>
      <CardActionArea>
        <ListItem alignItems="flex-start" onClick={() => handleShare(s)}>
          <ListItemAvatar>
            <Avatar alt="o" src={s.profileImage} />
          </ListItemAvatar>
          <ListItemText primary={s.displayName} secondary={s.github} />
        </ListItem>
        <Divider variant="inset" component="li" />
      </CardActionArea>
    </div>
  ));
  return (
    <div>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {info === null ? (
          followerList.length === 0 ? (
            <Typography>You have no followers.</Typography>
          ) : (
            followerList
          )
        ) : (
          <Box sx={{ typography: "h1", fontWeight: 500 }}>{info}</Box>
        )}
      </List>
    </div>
  );
}

export default Share;
