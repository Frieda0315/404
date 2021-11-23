import React, { useEffect } from "react";
import { Typography, IconButton, Avatar } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import { Grid } from "@mui/material";
import { useHistory } from "react-router-dom";
import { ShareRounded, ThumbUp, Comment } from "@material-ui/icons";
import Popup from "./Popup";
import Share from "./Share";
import "./font/style.css";
import makeStyles from "@material-ui/styles/makeStyles";
import { Redirect } from "react-router";
import axios from "axios";
import PostItemInList from "./PostItemInList";

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
  const [openPopup3, setOpenPopup3] = React.useState(false);
  const [openPopup, setOpenPopup] = React.useState(false);
  const [vote, setVote] = React.useState(0);
  const [comments, setComments] = React.useState({});
  const styleClasses = useStyles();
  const userid = localStorage.getItem("current_user_id");
  const baseUrl2 = process.env.REACT_APP_API_ENDPOINT;
  const [image, setImage] = React.useState();

  const open_image_holder = (post) => {
    setImage(post.image);
    setOpenPopup3(true);
  };
  useEffect(() => {
    var newList = [];
    axios
      .get(`${baseUrl2}/author/${userid}/posts/`, {
        auth: {
          username: "admin",
          password: "admin",
        },
      })
      .then((res) => {
        res.data.map((single) => {
          console.log(single);
          console.log(single.profileImage);
          newList.push({
            contentType: single.contentType,
            id: single.id,
            date: single.published,
            content: single.content,
            author: single.author.displayName,
            github_user: single.author.github,
            title: single.title,
            visibility: single.visibility,
            profileImage: single.author.profileImage,
            author_id: single.author.uuid,
            comments: single.comments,
            categories: single.categories,
            unlisted: single.unlisted,
          });
        });
        console.log(newList);
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
          "/author/" +
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
    axios
      .delete(id, {
        auth: {
          username: "admin",
          password: "admin",
        },
      })
      .then((res) => {
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
    const item = PostList1.find((item) => item.id === id);
    history.push({ pathname: "/mypost/edit", state: item });
  };

  const listItems = PostList1.map((post) => (
    <Grid item xs={8} key={post != null ? post.id : "123"}>
      <Grid
        container
        spacing={1}
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Grid item>
          <Avatar
            src={post.profileImage}
            onClick={() => open(post.author, post.github)}
          ></Avatar>
        </Grid>
        <Grid item>
          <Typography>{post != null ? post.author : "null author"}</Typography>
          <Typography>{post != null ? post.date : "null date"}</Typography>
          {post.visibility === "PUBLIC" ? (
            <Typography className="tag-format public-tag">Public</Typography>
          ) : post.visibility === "FRIENDS" ? (
            <Typography className="tag-format private-tag">Friend</Typography>
          ) : (
            <Typography className="tag-format private-tag">Private</Typography>
          )}
          <Typography
            fontStyle="italic"
            variant="h5"
            component="div"
            marginBottom="20px"
            fontFamily="Monospace"
          >
            {post.title}
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs>
          <PostItemInList post={post} />
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
