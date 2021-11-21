import Grid from "@material-ui/core/Grid";

import { Avatar, IconButton } from "@material-ui/core";
import Button from "@mui/material/Button";
import makeStyles from "@material-ui/styles/makeStyles";
import React, { useEffect } from "react";
import { Typography, Box } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import { Form } from "reactstrap";

import dummy_image from "../static/musle.png";
import axios from "axios";
import Popup from "./Popup";
import Profile from "./Profile";
import "./font/style.css";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import { v4 as uuidv4 } from "uuid";
import { ThumbUp } from "@material-ui/icons";

const useStyles = makeStyles(() => ({
  stream: {
    marginLeft: "10px",
    marginTop: "100px",
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
  const userid = localStorage.getItem("current_user_id");
  const [github_user, setGit_user] = React.useState();
  const [newComment, setNewComment] = React.useState("");
  const [currentUser, setCurrentUser] = React.useState(null);

  // const commentsList = tempCommentList;

  const [openPopup, setOpenPopup] = React.useState(false);
  const [comments, setComments] = React.useState([]);
  useEffect(() => {
    //console.log(window.location);
    axios
      .get(`${baseUrl2}${path}/`, {
        auth: {
          username: "admin",
          password: "admin",
        },
      })
      .then((response) => {
        console.log(response.data.comments);
        setComments(response.data.comments);

        let commentPromises = [];
        const commentsWithLike = comments.map((commentItem) => {
          commentPromises.push(
            axios
              .get(
                `${baseUrl2}/authors/${localStorage.getItem(
                  "current_user_id"
                )}/posts/${path.split("/").at(-1)}/comments/${commentItem.id
                  .split("/")
                  .at(-1)}/likes/`,
                {
                  auth: { username: "admin", password: "admin" },
                }
              )
              .then((response) => {
                commentItem.like_num = response.data.length;
              })
          );
        });
        Promise.all(commentPromises).then(() => {
          setComments(commentsWithLike);
        });
      });
    axios
      .get(`${baseUrl2}/author/${localStorage.getItem("current_user_id")}`, {
        auth: {
          username: "admin",
          password: "admin",
        },
      })
      .then((res) => {
        setCurrentUser(res.data);
      });
  }, []);

  const handle_like = async (comment) => {
    const authorId = comment.author.id.split("/").at(-1);
    const like_uuid = uuidv4();
    const liker = await axios.get(`${baseUrl2}/author/${userid}/`, {
      auth: {
        username: "admin",
        password: "admin",
      },
    });
    const likeData = {
      //"@context": "https://www.w3.org/ns/activitystreams",
      id: like_uuid,
      summary: localStorage.getItem("user_name") + " Likes your post",
      type: "like",
      author: liker.data,
      object:
        baseUrl2 +
        window.location.pathname +
        "/" +
        comment.id.split("/").at(-1),
    };

    // post likes

    const response = await axios.post(
      `${baseUrl2}/author/${localStorage.getItem("current_user_id")}/inbox/`,
      likeData,
      {
        auth: {
          username: "admin",
          password: "admin",
        },
      }
    );

    // update the like number accordingly
    if (response.status === 201) {
      let newCommentList = [];
      comments.map((item) => {
        console.log(item);
        if (item.id === comment.id) {
          item.like_num += 1;
        }
        newCommentList.push(item);
      });
      setComments(newCommentList);
    }
  };

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
  const handleSubmit = (e) => {
    e.preventDefault();
    const now = new Date();
    const isoString = now.toISOString();
    axios
      .post(
        `${baseUrl2}${path}/`,
        {
          author: currentUser,
          comment: newComment,
          published: isoString,
          id:
            "https://i-connect.herokuapp.com/service/author/" +
            localStorage.getItem("current_user_id") +
            "/posts/" +
            window.location.pathname.split("/").at(-2) +
            "/comments/" +
            uuidv4(),
          type: "comment",
          contentType: "text",
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
          const newComments = comments.concat([response.data]);

          setComments(newComments);
          setNewComment("");
        },
        (error) => {
          alert("error ");
          console.log(error);
        }
      );
  };

  const commentStream = comments.map((comment) => (
    <Grid item>
      <Grid
        container
        spacing={3}
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
      <Grid container justifyContent="center" alignItems="center">
        <Typography variant="h5" color="text.primary">
          {comment.comment}
        </Typography>
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
            aria-label="thumbup"
            onClick={() => {
              handle_like(comment);
            }}
          >
            <ThumbUp />
          </IconButton>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={1}
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-end"
      ></Grid>
    </Grid>
  ));
  console.log(commentStream);
  // console.log(commentsList);
  return (
    <Form onSubmit={handleSubmit}>
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
        <div class="text text-1">Comments</div>
        <Grid container alignItems="center" justifyContent="center">
          <Box
            sx={{
              width: 600,
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <AddReactionIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              fullWidth
              label="Add your comments..."
              variant="standard"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button
              type="submit"
              sx={{
                marginLeft: 1,
              }}
              variant="contained"
            >
              Add
            </Button>
          </Box>
        </Grid>

        {commentStream}
      </Grid>
    </Form>
  );
}
export default Comments;
