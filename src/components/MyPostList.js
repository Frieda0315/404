import React, { StyleSheet, useState, useEffect, Text } from "react";
import {
  Card,
  CardMedia,
  CardActionArea,
  Typography,
  IconButton,
  Avatar,
} from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import { Grid } from "@mui/material";
import { useHistory } from "react-router-dom";
import dummy_image from "../static/musle.png";
import head2 from "../static/2.JPG";
import { ShareRounded, ThumbUp, Comment } from "@material-ui/icons";
import Popup from "./Popup";
import Share from "./Share";
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

const MyPostList = () => {
  const history = useHistory();
  const [PostList1, setPostList] = React.useState(PostList);
  const [openPopup2, setOpenPopup2] = React.useState(false);
  const open_share = () => setOpenPopup2(true);

  const handleRemove = (e) => {
    const id = e.id;
    const newList = PostList1.filter((item) => item.id !== id);
    setPostList(newList);
  };

  const handleEdit = (e) => {
    const id = e.id;
    const newList = PostList1.filter((item) => item.id !== id);
    const item = PostList1.find((item) => item.id == id);
    history.push({ pathname: "/mypost/edit", state: item });
    alert(item.content);
  };

  const listItems = PostList1.map((post) => (
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
          <Grid item>
            <Avatar src={head2}></Avatar>
          </Grid>
          <Grid item>
            <Grid container direction="column">
              <Grid item>
                <Typography>{post.author}</Typography>
              </Grid>
              <Grid item>
                <Typography>{post.date}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Typography variant="h5">{post.title}</Typography>
      </Grid>
      {post.contentType == "text/plain" ? (
        <Grid item spacing={2}>
          <Typography>{post.content}</Typography>
        </Grid>
      ) : (
        <Grid item>
          <CardMedia
            style={{ width: "auto", maxHeight: "200px" }}
            component="img"
            image={post.image}
          />
        </Grid>
      )}

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
            aria-label="Edit"
            onClick={() => handleEdit(post)}
          >
            <Edit />
          </IconButton>
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
      <Grid
        container
        spacing={10}
        direction="column"
        alignSelf="center"
        marginTop={2}
      >
        {listItems}
      </Grid>
    </div>
  );
};

export default MyPostList;
