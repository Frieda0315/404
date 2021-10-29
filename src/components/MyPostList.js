import React, { useEffect } from "react";
import { CardMedia, Typography, IconButton, Avatar } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import { Grid } from "@mui/material";
import { useHistory } from "react-router-dom";
import dummy_image from "../static/musle.png";
import head2 from "../static/2.JPG";
import { ShareRounded, ThumbUp, Comment } from "@material-ui/icons";
import Popup from "./Popup";
import Share from "./Share";
import "./font/style.css";
import makeStyles from "@material-ui/styles/makeStyles";
import { Card } from "reactstrap";
import { Redirect } from "react-router";
import axios from "axios";

const PostList = [
  {
    title: "Hello world",
    content: "Hello world Content",
    author: "author1",
    date: "xxxx-xx-xx xx:xx",
    id: "1",
    contentType: "text/plain",
  },
  {
    title: "I am just trying to make a stream",
    content: "I am just trying to make a stream ",
    author: "author2",
    date: "xxxx-xx-xx xx:xx",
    id: "2",
    contentType: "text/plain",
  },
  {
    title: "I mean, a really simple one",
    content: "I mean, a really simple one",
    author: "author3",
    date: "xxxx-xx-xx xx:xx",
    id: "3",
    contentType: "text/plain",
  },
  {
    title: "so I decided to create some dummy strings",
    content: "so I decided to create some dummy strings Content",
    author: "author4",
    date: "xxxx-xx-xx xx:xx",
    id: "4",
    contentType: "text/plain",
  },
  {
    title: "and this is one of them",
    author: "author5",
    date: "xxxx-xx-xx xx:xx",
    id: "5",
    image: dummy_image,
    contentType: "image",
  },
  {
    title: "this is two of them",
    content: "this is two of them Content",
    author: "author6",
    date: "xxxx-xx-xx xx:xx",
    id: "6",
    contentType: "text/plain",
  },
  {
    title: "",
    content: "this is two of them Content",
    author: "author6",
    date: "xxxx-xx-xx xx:xx",
    id: "7",
    contentType: "text/plain",
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
  clickBox: {
    height: "100%",
  },
  postImage: {
    margin: "auto",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  voteBox: {
    maxHeight: "50px",
    maxWidth: "50px",
  },

  media: {
    height: "300px",
    paddingTop: "56.25%", // 16:9
  },
}));

function MyPostList() {
  const [user, setUser] = React.useState();
  const [github_user, setGit_user] = React.useState();
  const history = useHistory();
  const [PostList1, setPostList] = React.useState([]);
  const [openPopup2, setOpenPopup2] = React.useState(false);
  const [openPopup, setOpenPopup] = React.useState(false);
  const [vote, setVote] = React.useState(0);
  const [comments, setComments] = React.useState({});
  const styleClasses = useStyles();
  const userid = localStorage.getItem("current_user_id");
  const baseUrl2 = process.env.REACT_APP_API_ENDPOINT;

  useEffect(() => {
    var newList = [];
    axios
      .get(`${baseUrl2}/authors/${userid}/posts/`)
      .then((res) => {
        console.log(res.data);

        res.data.map((single) => {
          newList.push({
            id: single.id,
            date: single.published,
            content: single.content,
            author: single.author.user_name,
            github_user: single.author.github_name,
            title: single.title,
            state: single.visibility,
            contentType: single.image,
            author_id: single.author.id,
            image: single.image,
          });
        });
        setPostList(newList);
      })
      .catch((errors) => {
        console.log(errors);
      });
  }, []);

  const viewComments = (post) => {
    setComments(post);
  };
  if (Object.keys(comments).length !== 0) {
    return (
      <Redirect
        to={
          "/authors/" +
          comments.author_id +
          "/posts/" +
          comments.id +
          "/comments"
        }
      ></Redirect>
    );
  }

  const handleRemove = (e) => {
    const id = e.id;
    const newList = PostList1.filter((item) => item.id !== id);
    setPostList(newList);
    console.log(id);
    axios.delete(`${baseUrl2}/authors/${userid}/posts/${id}/`).then((res) => {
      console.log(res.data);
    });
  };

  const open_share = () => setOpenPopup2(true);
  const open = (author, git) => {
    setUser(author);
    setGit_user(git);
    setOpenPopup(true);
  };

  const handleEdit = (e) => {
    const id = e.id;
    const item = PostList1.find((item) => item.id == id);
    history.push({ pathname: "/mypost/edit", state: item });
    alert(item.content);
  };

  const listItems = PostList1.map((post) => (
    <Grid
      item
      xs={8}
      className={styleClasses.postCard}
      key={post != null ? post.id : "123"}
    >
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
            onClick={() => open(post.author, post.github_user)}
          ></Avatar>
        </Grid>
        <Grid item>
          <Typography>{post != null ? post.author : "null author"}</Typography>
          <Typography>{post != null ? post.date : "null date"}</Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs>
          <Card className={styleClasses.cardInPost}>
            {post.image === "" ? (
              <Grid container>
                <Grid item xs>
                  <Typography variant="h5" component="div">
                    {post.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {post.content}
                  </Typography>
                </Grid>
              </Grid>
            ) : (
              <Grid container>
                <CardMedia component="img" height="150" image={post.image} />
                <Grid item xs>
                  <Typography variant="h5" component="div">
                    {post.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {post.content}
                  </Typography>
                </Grid>
              </Grid>
            )}
          </Card>
        </Grid>
      </Grid>

      {post.author_id !== "github" ? (
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
              onClick={() => setVote(vote + 1)}
            >
              <ThumbUp />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography>{vote}</Typography>
          </Grid>
          <Grid item>
            <IconButton edge="end" aria-label="share" onClick={open_share}>
              <ShareRounded />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              edge="end"
              aria-label="comment"
              onClick={() => viewComments(post)}
            >
              <Comment />
            </IconButton>
          </Grid>
          <Grid item>
            <Grid item>
              <IconButton
                edge="end"
                aria-label="Edit"
                onClick={() => handleEdit(post)}
              >
                <Edit />
              </IconButton>
            </Grid>
          </Grid>
          <Grid item>
            <IconButton
              edge="end"
              aria-label="Delete"
              onClick={() => handleRemove(post)}
            >
              <Delete />
            </IconButton>
          </Grid>
        </Grid>
      ) : null}
    </Grid>
  ));

  return (
    <div>
      <Popup
        title={"Who do you want to share with?"}
        openPopup={openPopup2}
        setOpenPopup={setOpenPopup2}
      >
        <Share></Share>
      </Popup>

      <div class="text text-1">My Post</div>

      <Grid
        container
        spacing={2}
        className={styleClasses.stream}
        justifyContent="center"
        alignItems="center"
      >
        {listItems}
      </Grid>
    </div>
  );
}

export default MyPostList;
