import Grid from "@material-ui/core/Grid";

import { Avatar, IconButton, Pagination } from "@material-ui/core";
import { Card } from "reactstrap";
import makeStyles from "@material-ui/styles/makeStyles";
import React from "react";
import {
  CardMedia,
  CardActionArea,
  CardContent,
  Typography,
} from "@material-ui/core";
import vote_icon from "../static/vote.png";

import dummy_image from "../static/musle.png";
import dummy_image1 from "../static/arnold.png";
import {
  Delete,
  ShareRounded,
  ThumbUp,
  MoreHorizIcon,
  Comment,
} from "@material-ui/icons";

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
  postTitle: {
    height: "28px",
    font: "25px Italian",
  },
  postBody: {
    flex: "1 0 auto",
    font: "16px Arial",
    marginTop: "5px",
    marginLeft: "5px",
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
  pagination: {
    marginTop: "40px",
    paddingBottom: "40px",
  },
}));

// dummy val
var tempPostList = [
  {
    title: "Hello world",
    content: "Hello world Content",
    author: "author1",
    date: "xxxx-xx-xx xx:xx",
    id: "1",
  },
  {
    title: "I am just trying to make a stream",
    content: "I am just trying to make a stream Content",
    author: "author2",
    date: "xxxx-xx-xx xx:xx",
    id: "2",
  },
  {
    title: "I mean, a really simple one",
    content: "I mean, a really simple one Content",
    author: "author3",
    date: "xxxx-xx-xx xx:xx",
    id: "3",
  },
  {
    title: "so I decided to create some dummy strings",
    content: "so I decided to create some dummy strings Content",
    author: "author4",
    date: "xxxx-xx-xx xx:xx",
    id: "4",
  },
  {
    title: "and this is one of them",
    content: "and this is one of them Content",
    author: "author5",
    date: "xxxx-xx-xx xx:xx",
    id: "5",
  },
  {
    title: "this is two of them",
    content: "this is two of them Content",
    author: "author6",
    date: "xxxx-xx-xx xx:xx",
    id: "6",
  },
  null,
];
const tempSummary = "poster body summary";
const tempVoteCount = 0;
const tempPostOnClick = (ev) => {
  console.log("clicked a post");
};
const tempVoteOnClick = (ev) => {
  console.log("vote clicked");
};
const tempViewProfile = (ev) => {
  console.log("view profile");
};
const dummyImages = [dummy_image, dummy_image1, null];

function PostStream() {
  const styleClasses = useStyles();
  const [page, setPage] = React.useState(1);
  const [tempPostList1, setTempPostList] = React.useState(tempPostList);
  function handleRemove(id) {
    const newList = tempPostList1.filter((item) => item.id !== id);
    setTempPostList(newList);
  }
  const changePage = (ev, value) => {
    setPage(value);
  };
  const postStream = tempPostList1.map((post) => (
    <Grid
      item
      xs={8}
      className={styleClasses.postCard}
      key={post != null ? post.id : "123"}
    >
      <Grid container>
        <Grid item xs={1}>
          <IconButton onClick={tempViewProfile}>
            <Avatar src={dummy_image}></Avatar>
          </IconButton>
        </Grid>
        <Grid item xs={4}>
          <Typography>{post != null ? post.author : "null author"}</Typography>
          <Typography>{post != null ? post.date : "null date"}</Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs>
          <Card className={styleClasses.cardInPost}>
            <CardActionArea
              onClick={tempPostOnClick}
              className={styleClasses.clickBox}
            >
              {post != null ? (
                <Grid container>
                  {dummyImages[post.content.length % 3] != null ? null : (
                    <Grid item xs={2} className={styleClasses.postImage}>
                      <CardMedia
                        component="img"
                        className={styleClasses.image}
                        image={dummyImages[1]}
                        alt="dummy"
                      />
                    </Grid>
                  )}
                  <Grid item xs>
                    <CardContent className={styleClasses.postTitle}>
                      {post.title}
                    </CardContent>
                    <CardContent className={styleClasses.postBody}>
                      {tempSummary}
                    </CardContent>
                  </Grid>
                </Grid>
              ) : (
                <CardMedia
                  component="img"
                  className={styleClasses.image}
                  image={dummyImages[1]}
                  alt="dummy"
                />
              )}
            </CardActionArea>
          </Card>
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
            <Typography>{tempVoteCount}</Typography>
          </Grid>

          <Grid item>
            <IconButton edge="end" aria-label="share">
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
              onClick={() => handleRemove(post.id)}
            >
              <Delete />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  ));
  return (
    <div>
      <Grid container spacing={2} className={styleClasses.stream}>
        {postStream}
      </Grid>
      <Pagination
        count={3}
        page={page}
        onChange={changePage}
        className={styleClasses.pagination}
      />
    </div>
  );
}

export default PostStream;
