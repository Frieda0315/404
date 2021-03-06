import Grid from "@material-ui/core/Grid";

import { Avatar, IconButton } from "@material-ui/core";
import makeStyles from "@material-ui/styles/makeStyles";
import React, { useEffect } from "react";
import { Typography, Box } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import { Form } from "reactstrap";
import FormControl from "@mui/material/FormControl";
import { Button } from "@mui/material";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useHistory, useLocation } from "react-router-dom";

import FollowProfile from "./FollowProfile";
import Popup from "./Popup";
import Profile from "./Profile";
import "./font/style.css";
import AddReactionIcon from "@mui/icons-material/AddReaction";
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
  const history = useHistory();
  const location = useLocation();
  const [post, setPost] = React.useState(location.state);
  const styleClasses = useStyles();
  const baseUrl2 = process.env.REACT_APP_API_ENDPOINT;
  const path = window.location.pathname;
  const [user, setUser] = React.useState();
  const userid = localStorage.getItem("current_user_id");
  const [github_user, setGit_user] = React.useState();
  const [newComment, setNewComment] = React.useState("");
  const [currentUser, setCurrentUser] = React.useState(null);
  const [textChoice, setTextChoice] = React.useState("text/plain");

  // const commentsList = tempCommentList;

  const [openPopup, setOpenPopup] = React.useState(false);
  const [comments, setComments] = React.useState([]);

  const CommentItemInList = (comment) => {
    //console.log(comment);

    if (comment.contentType === "text/plain") {
      return (
        <Grid container>
          <Grid item xs>
            <Typography variant="h5" component="div">
              {comment.comment}
            </Typography>
          </Grid>
        </Grid>
      );
    } else if (comment.contentType === "text/markdown") {
      return (
        <Grid container>
          <Grid item xs>
            <ReactMarkdown className="markdown-container">
              {comment.comment}
            </ReactMarkdown>
          </Grid>
        </Grid>
      );
    }
  };
  useEffect(() => {
    //console.log(window.location);
    axios
      .get(`${baseUrl2}/admin/nodes/`, {
        auth: {
          username: "admin",
          password: "admin",
        },
      })

      .then((res) => {
        axios
          .get(`${post.comments}`, {
            auth: {
              username: post.username,
              password: post.password,
            },
          })
          .then((response) => {
            //console.log(response.data.comments);
            setComments(response.data.comments);

            let commentPromises = [];
            let newComments = [];
            response.data.comments.map((commentItem) => {
              // if (
              //   post.author_item.host ===
              //   "https://social-distance-api.herokuapp.com/"
              // ) {
              //   commentItem.id = commentItem.id.slice(0, -1);
              // }
              const fileteredNode = res.data.filter(
                (item) =>
                  item.url.includes(post.author_item.host) ||
                  post.author_item.host.includes(item.url)
              );
              console.log(fileteredNode);
              if (fileteredNode.length === 0) {
                const node = { user_name: "admin", password: "admin" };
                fileteredNode.push(node);
              }
              if (
                post.id.startsWith(
                  "https://newconnection-server.herokuapp.com/api/v1/author/"
                )
              ) {
                console.log(post.id);
                console.log(commentItem.id);
                commentItem.id =
                  post.id +
                  "/comments/" +
                  commentItem.id.split("/comments/")[1];
              }
              commentPromises.push(
                axios
                  .get(`${commentItem.id}/likes`, {
                    auth: {
                      username: fileteredNode[0].user_name,
                      password: fileteredNode[0].password,
                    },
                  })
                  .then((response) => {
                    if (response.data instanceof Array) {
                      commentItem.like_num = response.data.length;
                    } else {
                      commentItem.like_num = response.data.items.length;
                    }
                    commentItem.username = fileteredNode[0].user_name;
                    commentItem.password = fileteredNode[0].password;
                    console.log(commentItem.username);
                    console.log(commentItem.password);
                    console.log(commentItem);
                  })
              );
              newComments.push(commentItem);
            });
            Promise.all(commentPromises).then(() => {
              setComments(newComments);
            });
          });
        axios
          .get(
            `${baseUrl2}/author/${localStorage.getItem("current_user_id")}`,
            {
              auth: {
                username: "admin",
                password: "admin",
              },
            }
          )
          .then((res) => {
            setCurrentUser(res.data);
          });
      });
  }, []);
  const handle_like = async (commment) => {
    const likeData = {
      //"@context": "https://www.w3.org/ns/activitystreams",
      summary: localStorage.getItem("user_name") + " Likes the comment",
      type: "Like",
      author: currentUser,
      object: commment.id,
    };
    console.log(commment);

    // post likes
    console.log("like,", commment.author.ids);
    await axios
      .post(`${post.author_item.id}/inbox/`, likeData, {
        auth: {
          username: commment.username,
          password: commment.password,
        },
      })
      .then((response) => {
        // update the like number accordingly
        if (response.status === 201 || response.status === 200) {
          let newCommentList = [];
          comments.map((item) => {
            if (item.id === commment.id) {
              if (isNaN(item.like_num)) {
                item.like_num = 0;
              }
              item.like_num += 1;
            }
            newCommentList.push(item);
          });
          setComments(newCommentList);
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
  const afterSubmit = (iosString) => {
    const newComments = comments.concat([
      {
        author: currentUser,
        comment: newComment,
        published: iosString,
        id: post.id,
        // "https://i-connect.herokuapp.com/service/author/" +
        // localStorage.getItem("current_user_id") +
        // "/posts/" +
        // window.location.pathname.split("/").at(-2) +
        // "/comments/" +
        // uuidv4(),
        type: "comment",
        username: post.username,
        password: post.password,
        contentType: textChoice,
        like_num: 0,
      },
    ]);

    setComments(newComments);
    setNewComment("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const now = new Date();
    const isoString = now.toISOString();
    if (
      post.author_item.host === "https://newconnection-server.herokuapp.com/"
    ) {
      axios
        .post(
          `${post.author_item.id}/inbox/`,
          {
            author: currentUser,
            comment: newComment,
            published: isoString,
            id: post.id,
            type: "comment",
            contentType: textChoice,
          },
          {
            auth: {
              username: post.username,
              password: post.password,
            },
          }
        )
        .then(
          (response) => {
            if (200 <= response.status < 300) {
              //response.data.like_num = 0;
              afterSubmit(isoString);
            } else {
              alert("failed to comment this post QAQ");
              setNewComment("");
            }
          },
          (error) => {
            console.log(error);
            return;
          }
        );
    } else if (
      post.author_item.host ===
      "https://social-distribution-fall2021.herokuapp.com/api/"
    ) {
      axios
        .post(
          `${post.author_item.id}/inbox/`,
          {
            author: currentUser,
            comment: newComment,
            published: isoString,
            object: post.id,
            type: "comment",
            contentType: textChoice,
          },
          {
            auth: {
              username: post.username,
              password: post.password,
            },
          }
        )
        .then(
          (response) => {
            if (200 <= response.status < 300) {
              //response.data.like_num = 0;
              afterSubmit(isoString);
            } else {
              alert("failed to comment this post QAQ");
              setNewComment("");
            }
          },
          (error) => {
            console.log(error);
            return;
          }
        );
    } else {
      // t16 and t1 send comment
      let url = post.comments.split("?")[0];
      axios
        .post(
          `${url}/`,
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
            contentType: textChoice,
          },
          {
            auth: {
              username: post.username,
              password: post.password,
            },
          }
        )
        .then(
          (response) => {
            response.data.like_num = 0;
            const newComment = response.data;
            if (post.author_item.host === "https://i-connect.herokuapp.com") {
              newComment["username"] = "admin";
              newComment["password"] = "admin";
            } else {
              newComment["username"] = "team16";
              newComment["password"] = "socialdistance";
            }

            const newComments = comments.concat([newComment]);

            setComments(newComments);
            setNewComment("");
          },
          (error) => {
            console.log(error);
          }
        );
    }
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
            src={comment.author.profileImage}
            onClick={() => open(comment.author.id, comment.author.github_name)}
          ></Avatar>
        </Grid>
        <Grid item>
          <Typography>{comment.author.displayName}</Typography>
          <Typography>{comment.published}</Typography>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" alignItems="center">
        {CommentItemInList(comment)}
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
        <Grid item>
          <Typography>{comment.like_num}</Typography>
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
  // console.log(commentsList);
  return (
    <Form onSubmit={handleSubmit}>
      <Popup
        title={"Profile"}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <FollowProfile follow_user_url={user} />
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
              multiline
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
          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={textChoice}
              label="Input Type"
              autoWidth
              onChange={(e) => {
                setTextChoice(e.target.value);
              }}
            >
              <MenuItem value={"text/plain"}>text/plain</MenuItem>
              <MenuItem value={"text/markdown"}>text/markdown</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {commentStream}
      </Grid>
    </Form>
  );
}
export default Comments;
