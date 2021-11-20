import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";

import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ava from "./assets/avator.png";
import { CardActionArea } from "@material-ui/core";
import axios from "axios";

function Share(props) {
  const postToShare = props.post;
  console.log(postToShare);
  const [authorList, setAuthorList] = React.useState([]);
  //const [success, setSuccess] = React.useState(false);
  const baseUrl2 = process.env.REACT_APP_API_ENDPOINT;
  const handleShare = (user) => {
    console.log(postToShare);
    axios
      .post(`${baseUrl2}/author/${user.id}/inbox/`, postToShare, {
        auth: {
          username: "admin",
          password: "admin",
        },
      })
      .then((response) => {
        console.log(response);
        // setSuccess(true);
        props.setOpen(false);
      })
      .catch((error) => {
        console.log(error);
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
        )}/friends/`,
        {
          auth: {
            username: "admin",
            password: "admin",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setAuthorList(response.data["friends"]);
      });
  }, []);
  //console.log(props.post);
  const friendList = authorList.map((s) => (
    <div>
      <CardActionArea>
        <ListItem alignItems="flex-start" onClick={() => handleShare(s)}>
          <ListItemAvatar>
            <Avatar alt="o" src={ava} />
          </ListItemAvatar>
          <ListItemText primary={s.user_name} secondary={s.github_name} />
        </ListItem>
        <Divider variant="inset" component="li" />
      </CardActionArea>
    </div>
  ));
  return (
    <div>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {friendList}
      </List>
    </div>
  );
}

export default Share;
