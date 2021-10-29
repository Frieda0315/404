import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";

import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ava from "./assets/avator.png";
import { CardActionArea } from "@material-ui/core";
import axios from "axios";
import { responsiveFontSizes } from "@mui/material";

function Share(props) {
  const tempUsers = [
    {
      type: "author",
      id: "http://127.0.0.1:5454/author/9de17f29c12e8f97bcbbd34cc908f1baba40658e",
      host: "http://127.0.0.1:5454/",
      displayName: "oliver",
      url: "http://127.0.0.1:5454/author/9de17f29c12e8f97bcbbd34cc908f1baba40658e",
      github: "http://github.com/xius666",
      profileImage: "https://i.imgur.com/k7XVwpB.jpeg",
    },
    {
      type: "author",
      id: "http://127.0.0.1:5454/author/9de17f29c12e8f97bcbbd34cc908f1baba40668e",
      host: "http://127.0.0.1:5454/",
      displayName: "Lara Croft",
      url: "http://127.0.0.1:5454/author/9de17f29c12e8f97bcbbd34cc908f1baba40658e",
      github: "http://github.com/laracroft",
      profileImage: "https://i.imgur.com/k7XVwpB.jpeg",
    },
    {
      type: "author",
      id: "http://127.0.0.1:5454/author/9de17f29c12e8f97bcbbd34cc908f1baba40668e",
      host: "http://127.0.0.1:5454/",
      displayName: "Rick",
      url: "http://127.0.0.1:5454/author/9de17f29c12e8f97bcbbd34cc908f1baba40658e",
      github: "http://github.com/rick",
      profileImage: "https://i.imgur.com/k7XVwpB.jpeg",
    },
  ];

  const postToShare = props.post;
  postToShare["type"] = "post";
  const [authorList, setAuthorList] = React.useState([]);
  const baseUrl2 = process.env.REACT_APP_API_ENDPOINT;
  const handleShare = (user) => {
    axios.get(`${baseUrl2}/author/${user.id}/inbox/`).then((response) => {
      console.log(response.data);
    });
    axios
      .post(`${baseUrl2}/author/${user.id}/inbox/`, postToShare)
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
    props.setOpen(false);
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
    axios.get(`${baseUrl2}/authors/`).then((response) => {
      // console.log(response.data);
      setAuthorList(response.data);
    });
  });
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
