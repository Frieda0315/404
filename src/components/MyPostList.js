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
import axios from "axios";

const MyPostList = () => {
  const history = useHistory();
  const [PostList1, setPostList] = React.useState([]);
  const [openPopup2, setOpenPopup2] = React.useState(false);
  const open_share = () => setOpenPopup2(true);

  const userid = localStorage.getItem("current_user_id");
  const baseUrl2 = process.env.REACT_APP_API_ENDPOINT;

  const handleRemove = (e) => {
    const id = e.id;
    const newList = PostList1.filter((item) => item.id !== id);
    setPostList(newList);
    console.log(id);
    axios.delete(`${baseUrl2}/authors/${userid}/posts/${id}/`).then((res) => {
      console.log(res.data);
    });
  };

  const handleEdit = (e) => {
    const id = e.id;
    const newList = PostList1.filter((item) => item.id !== id);
    const item = PostList1.find((item) => item.id == id);
    history.push({ pathname: "/mypost/edit", state: item });
    alert(item.content);
  };

  //console.log(baseUrl2)
  useEffect(() => {
    var newList = [];
    axios.get(`${baseUrl2}/authors/${userid}/posts/`).then((res) => {
      console.log(res.data);
      res.data.map((single) => {
        //console.log(single.content);
        newList.push({
          id: single.id,
          date: single.published,
          content: single.content,
          author: single.author.user_name,
          github_user: single.author.github_name,
          title: single.title,
          state: single.visibility,
          contentType: single.image,
          image: single.image,
        });
      });
      setPostList(newList);
    });
  }, []);

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
      {post.contentType == null ? (
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
