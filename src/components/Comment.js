import Grid from "@material-ui/core/Grid";

import { Avatar, IconButton } from "@material-ui/core";
import { Card } from "reactstrap";
import makeStyles from "@material-ui/styles/makeStyles";
import React, { useEffect } from "react";
import { Typography } from "@material-ui/core";

import dummy_image from "../static/musle.png";
import axios from "axios";
import { Delete } from "@material-ui/icons";
import Popup from "./Popup";
import Profile from "./Profile";
import "./font/style.css";

const tempCommentList = [
  {
    type: "comment",
    author: {
      type: "author",
      id: "http://127.0.0.1:5454/author/1d698d25ff008f7538453c120f581471",
      url: "http://127.0.0.1:5454/author/1d698d25ff008f7538453c120f581471",
      host: "http://127.0.0.1:5454/",
      displayName: "Greg Johnson",
      github: "http://github.com/gjohnson",
      profileImage: "https://i.imgur.com/k7XVwpB.jpeg",
    },
    comment: "Sick Olde English 1",
    contentType: "text/markdown",
    published: "2015-03-09T13:07:04+00:00",
    id: "http://127.0.0.1:5454/author/9de17f29c12e8f97bcbbd34cc908f1baba40658e/posts/de305d54-75b4-431b-adb2-eb6b9e546013/comments/f6255bb01c648fe967714d52a89e8e9c1",
  },
  {
    type: "comment",
    author: {
      type: "author",
      id: "http://127.0.0.1:5454/author/1d698d25ff008f7538453c120f581471",
      url: "http://127.0.0.1:5454/author/1d698d25ff008f7538453c120f581471",
      host: "http://127.0.0.1:5454/",
      displayName: "Greg Johnson",
      github: "http://github.com/gjohnson",
      profileImage: "https://i.imgur.com/k7XVwpB.jpeg",
    },
    comment: "Sick Olde English 2",
    contentType: "text/markdown",
    published: "2015-03-09T13:07:04+00:00",
    id: "http://127.0.0.1:5454/author/9de17f29c12e8f97bcbbd34cc908f1baba40658e/posts/de305d54-75b4-431b-adb2-eb6b9e546013/comments/f6255bb01c648fe967714d52a89e8e9c2",
  },
  {
    type: "comment",
    author: {
      type: "author",
      id: "http://127.0.0.1:5454/author/1d698d25ff008f7538453c120f581471",
      url: "http://127.0.0.1:5454/author/1d698d25ff008f7538453c120f581471",
      host: "http://127.0.0.1:5454/",
      displayName: "Greg Johnson",
      github: "http://github.com/gjohnson",
      profileImage: "https://i.imgur.com/k7XVwpB.jpeg",
    },
    comment: "Sick Olde English 3",
    contentType: "text/markdown",
    published: "2015-03-09T13:07:04+00:00",
    id: "http://127.0.0.1:5454/author/9de17f29c12e8f97bcbbd34cc908f1baba40658e/posts/de305d54-75b4-431b-adb2-eb6b9e546013/comments/f6255bb01c648fe967714d52a89e8e9c3",
  },
];

const useStyles = makeStyles(() => ({
  stream: {
    marginLeft: "10px",
  },
  postCard: {
    backgroundColor: "#fff",
    borderBottom: "1.2px solid #f0f2f7",
    padding: "30px",
    boxShadow: "0 1px 3px rgb(18 18 18 / 10%)",
  },
  cardInPost: {
    border: 0,
  },
}));

function Comments(props) {
  const styleClasses = useStyles();
  const baseUrl2 = process.env.REACT_APP_API_ENDPOINT;
  const path = window.location.pathname;
  const [user, setUser] = React.useState();
  const [github_user, setGit_user] = React.useState();

  // const commentsList = tempCommentList;

  const [openPopup, setOpenPopup] = React.useState(false);
  const [comments, setComments] = React.useState([]);
  useEffect(() => {
    axios.get(`${baseUrl2}${path}/`).then((response) => {
      console.log(response.data.comments);
      setComments(response.data.comments);
    });
  }, []);
  const handleRemove = (e) => {
    const id = e.id;
    const newList = comments.filter((item) => item.id !== id);
    setComments(newList);
  };
  const open = (author, git) => {
    setUser(author);
    setGit_user(git);
    setOpenPopup(true);
  };

  const commentStream = comments.map((comment) => (
    <Grid item xs={8} className={styleClasses.postCard}>
      <Grid
        container
        spacing={1}
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Grid item>
          <Avatar
            src={dummy_image}
            onClick={() =>
              open(comment.author.user_name, comment.author.github_name)
            }
          ></Avatar>
        </Grid>
        <Grid item>
          <Typography>{comment.author.user_name}</Typography>
          <Typography>{comment.published}</Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs>
          <Card className={styleClasses.cardInPost}>
            <Grid container>
              <Grid item xs>
                <Typography variant="body1" color="text.secondary">
                  {comment.comment}
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={1}
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <Grid item>
          <IconButton
            edge="end"
            aria-label="Delete"
            onClick={() => handleRemove(comment)}
          >
            <Delete />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  ));
  console.log(commentStream);
  // console.log(commentsList);
  return (
    <div style={{ height: "100%", marginTop: "30px" }}>
      <Popup
        title={"Profile"}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <Profile
          user={user}
          post_github_user={github_user}
          is_follow={true}
        ></Profile>
      </Popup>
      <Grid
        container
        spacing={2}
        className={styleClasses.stream}
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        <div className="text text-1">comments</div>
        {commentStream}
      </Grid>
    </div>
  );
}
export default Comments;
