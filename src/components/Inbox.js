import React, { useEffect } from "react";
import { Card, Typography, IconButton, Avatar, Fab } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { Grid } from "@mui/material";
import { useHistory } from "react-router-dom";
import { ShareRounded, ThumbUp, Comment } from "@material-ui/icons";
import Popup from "./Popup";
import Share from "./Share";
import makeStyles from "@material-ui/styles/makeStyles";
import axios from "axios";

const useStyles = makeStyles(() => ({
  FollowItem: {
    padding: "2em",
  },
  LikeItem: {
    padding: "2em",
  },
}));

const Inbox = () => {
  const history = useHistory();

  const inboxList = [];

  const styleClasses = useStyles();
  const [InboxList1, setInboxList] = React.useState([]);

  // 0 for post;
  // 1 for likes;
  // 2 for follow;
  const [InboxToggle, setInboxToggle] = React.useState(0);

  const [openPopup2, setOpenPopup2] = React.useState(false);
  const open_share = () => setOpenPopup2(true);

  const handleRemove = (e) => {
    const id = e.id;
    const newList = InboxList1.filter((item) => item.id !== id);
    setInboxList(newList);
  };

  const acceptFriendRequest = (id) => {};
  const declineFriendRequest = (id) => {};
  const userid = localStorage.getItem("current_user_id");
  const baseUrl2 = process.env.REACT_APP_API_ENDPOINT;

  const handelClear = () => {
    axios
      .delete(`${baseUrl2}/author/${userid}/inbox/`, {
        auth: {
          username: "admin",
          password: "admin",
        },
      })
      .then((res) => {
        setInboxList([]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  var newList = [];
  useEffect(() => {
    axios
      .get(`${baseUrl2}/author/${userid}/inbox/`, {
        auth: {
          username: "admin",
          password: "admin",
        },
      })
      .then((res) => {
        console.log(res.data);
        res.data.items.map((single) => {
          console.log(single.author.user_name);
          newList.push({
            type: "inbox",
            title: single.title,
            content: single.content,
            date: single.published,
            image: single.image,
            user_name: single.author.user_name,
            id: single.author.id,
            github_name: single.author.github_name,
          });
        });
        setInboxList(newList);
      })
      .catch((errors) => {
        console.log(errors);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${baseUrl2}/author/${userid}/friendrequests/`, {
        auth: {
          username: "admin",
          password: "admin",
        },
      })
      .then((res) => {
        console.log(res.data);
        res.data.map((single) => {
          console.log("name", single.summary);
          newList.push({
            type: "follower",
            summary: single.summary,
            follower_user_name: single.actor.user_name,
            follower_id: single.actor.id,
          });
        });
        setInboxList(newList);
      })
      .catch((errors) => {
        //console.log(errors);
      });
  }, []);

  var listItems;

  if (InboxToggle === 0) {
    // Posts
    listItems = InboxList1.filter((item) => item.type === "inbox").map(
      (item) => (
        <Grid
          item
          xs={8}
          justifyContent="flex-start"
          alignItems="flex-start"
          backgroundColor="#fff"
          borderBottom="1.2px solid #f0f2f7"
          padding="30px"
          boxShadow="0 1px 3px rgb(18 18 18 / 10%)"
          marginLeft={20}
          marginRight={20}
        >
          <Grid item>
            <Grid
              container
              spacing={2}
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              {/* <Grid item>
                <Avatar src={item.author.profileImage}></Avatar>
              </Grid> */}
              <Grid item>
                <Grid container direction="column">
                  <Grid item>
                    <Typography>
                      {item.user_name + " share a new post."}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography>{item.date}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Typography variant="h5">{item.title}</Typography>
          </Grid>

          <Grid item spacing={2}>
            <Typography>{item.content}</Typography>
          </Grid>

          <Grid
            container
            spacing={1}
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            <Grid item>
              <IconButton edge="end" aria-label="thumbup">
                <ThumbUp />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton edge="end" aria-label="share" onClick={open_share}>
                <ShareRounded />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton edge="end" aria-label="comment">
                <Comment />
              </IconButton>
            </Grid>

            <Grid item>
              <IconButton
                edge="end"
                aria-label="Delete"
                onClick={() => handleRemove(item)}
              >
                <Delete />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      )
    );
  } else if (InboxToggle === 1) {
    // Likes
    listItems = InboxList1.filter((item) => item.type === "Like").map(
      (item) => (
        <Grid item>
          <Card>{item.summary}</Card>
        </Grid>
      )
    );
  } else if (InboxToggle === 2) {
    // Folows
    listItems = InboxList1.filter((item) => item.type === "follower").map(
      (item) => (
        <Grid item>
          <Card>
            <Grid container direction="row" className={styleClasses.FollowItem}>
              <Grid item xs={10}>
                <Typography>{item.summary}</Typography>
              </Grid>
              <Grid item xs>
                <Fab
                  variant="extended"
                  color="primary"
                  onClick={acceptFriendRequest(item.follower_id)}
                >
                  accecpt
                </Fab>
                <Fab
                  variant="extended"
                  color="primary"
                  onClick={declineFriendRequest}
                >
                  decline
                </Fab>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      )
    );
  }

  return (
    <div>
      <Popup
        title={"Who do you want to share with?"}
        openPopup={openPopup2}
        setOpenPopup={setOpenPopup2}
      >
        <Share></Share>
      </Popup>
      <Grid container direction="row">
        <Grid item>
          <Fab
            variant="extended"
            color="primary"
            onClick={() => setInboxToggle(0)}
          >
            Posts
          </Fab>
        </Grid>
        <Grid item>
          <Fab
            variant="extended"
            color="primary"
            onClick={() => setInboxToggle(1)}
          >
            <Typography>{"likes"}</Typography>
          </Fab>
        </Grid>
        <Grid item>
          <Fab
            variant="extended"
            color="primary"
            onClick={() => setInboxToggle(2)}
          >
            <Typography>{"follow"}</Typography>
          </Fab>
        </Grid>
        <Grid item>
          <Fab variant="extended" color="secondary" onClick={handelClear}>
            <Typography>{"Clear"}</Typography>
          </Fab>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={10}
        direction="column"
        alignSelf="right"
        marginTop={2}
      >
        {listItems}
      </Grid>
    </div>
  );
};

export default Inbox;
