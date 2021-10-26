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
export default function Share() {
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
  const friendList = tempUsers.map((s) => (
    <div>
      <CardActionArea>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="o" src={ava} />
          </ListItemAvatar>
          <ListItemText primary={s.displayName} secondary={s.github} />
        </ListItem>
        <Divider variant="inset" component="li" />
      </CardActionArea>
    </div>
  ));
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {friendList}
    </List>
  );
}
