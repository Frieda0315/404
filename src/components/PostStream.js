import Grid from "@material-ui/core/Grid";
import { Avatar, IconButton, Pagination } from "@material-ui/core";
import { Card } from "reactstrap";
import makeStyles from "@material-ui/styles/makeStyles";
import React, { useState, useEffect } from "react";
import { CardMedia, CardActionArea, Typography } from "@material-ui/core";
import axios from "axios";
import dummy_image from "../static/musle.png";
import dummy_image1 from "../static/arnold.png";
import { Delete, ShareRounded, ThumbUp, Comment } from "@material-ui/icons";
import Popup from "./Popup";
import Profile from "./Profile";

import { Redirect } from "react-router";

import Share from "./Share";

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
  // postTitle: {
  //   height: "28px",
  //   font: "25px Italian",
  // },
  // postBody: {
  //   flex: "1 0 auto",
  //   font: "16px Arial",
  //   marginTop: "5px",
  //   marginLeft: "5px",
  // },
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

  media: {
    height: "300px",
    paddingTop: "56.25%", // 16:9
  },
}));
var tempPostList = [
  {
    title: "Hello world",
    content: "Hello world Content",
    author: "author1",
    date: "xxxx-xx-xx xx:xx",
    commentsSrc: {
      type: "comments",
      page: 1,
      size: 5,
      post: "http://127.0.0.1:5454/author/9de17f29c12e8f97bcbbd34cc908f1baba40658e/posts/764efa883dda1e11db47671c4a3bbd9e",
      id: "http://127.0.0.1:5454/author/9de17f29c12e8f97bcbbd34cc908f1baba40658e/posts/de305d54-75b4-431b-adb2-eb6b9e546013/comments",
      comments: [
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
          id: "http://127.0.0.1:5454/author/9de17f29c12e8f97bcbbd34cc908f1baba40658e/posts/de305d54-75b4-431b-adb2-eb6b9e546013/comments/f6255bb01c648fe967714d52a89e8e9c",
        },
      ],
    },
    id: "1",
  },
  {
    title: "I am just trying to make a stream",
    content: "I am just trying to make a stream ",
    author: "author2",
    date: "xxxx-xx-xx xx:xx",
    id: "2",
    commentsSrc: {
      type: "comments",
      page: 1,
      size: 5,
      post: "http://127.0.0.1:5454/author/9de17f29c12e8f97bcbbd34cc908f1baba40658e/posts/764efa883dda1e11db47671c4a3bbd9e",
      id: "http://127.0.0.1:5454/author/9de17f29c12e8f97bcbbd34cc908f1baba40658e/posts/de305d54-75b4-431b-adb2-eb6b9e546013/comments",
      comments: [
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
          id: "http://127.0.0.1:5454/author/9de17f29c12e8f97bcbbd34cc908f1baba40658e/posts/de305d54-75b4-431b-adb2-eb6b9e546013/comments/f6255bb01c648fe967714d52a89e8e9c",
        },
      ],
    },
  },
  {
    title: "I mean, a really simple one",
    content: "I mean, a really simple one",
    author: "author3",
    date: "xxxx-xx-xx xx:xx",
    id: "3",
    commentsSrc: {
      type: "comments",
      page: 1,
      size: 5,
      post: "http://127.0.0.1:5454/author/9de17f29c12e8f97bcbbd34cc908f1baba40658e/posts/764efa883dda1e11db47671c4a3bbd9e",
      id: "http://127.0.0.1:5454/author/9de17f29c12e8f97bcbbd34cc908f1baba40658e/posts/de305d54-75b4-431b-adb2-eb6b9e546013/comments",
      comments: [
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
          id: "http://127.0.0.1:5454/author/9de17f29c12e8f97bcbbd34cc908f1baba40658e/posts/de305d54-75b4-431b-adb2-eb6b9e546013/comments/f6255bb01c648fe967714d52a89e8e9c",
        },
      ],
    },
  },
  {
    title: "so I decided to create some dummy strings",
    content: "so I decided to create some dummy strings Content",
    author: "author4",
    date: "xxxx-xx-xx xx:xx",
    id: "4",
    commentsSrc: {
      type: "comments",
      page: 1,
      size: 5,
      post: "http://127.0.0.1:5454/author/9de17f29c12e8f97bcbbd34cc908f1baba40658e/posts/764efa883dda1e11db47671c4a3bbd9e",
      id: "http://127.0.0.1:5454/author/9de17f29c12e8f97bcbbd34cc908f1baba40658e/posts/de305d54-75b4-431b-adb2-eb6b9e546013/comments",
      comments: [
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
          comment: "Sick Olde English 4",
          contentType: "text/markdown",
          published: "2015-03-09T13:07:04+00:00",
          id: "http://127.0.0.1:5454/author/9de17f29c12e8f97bcbbd34cc908f1baba40658e/posts/de305d54-75b4-431b-adb2-eb6b9e546013/comments/f6255bb01c648fe967714d52a89e8e9c",
        },
      ],
    },
  },
  {
    title: "and this is one of them",
    content: "and this is one of them Content",
    author: "author5",
    date: "xxxx-xx-xx xx:xx",
    id: "5",
    commentsSrc: {
      type: "comments",
      page: 1,
      size: 5,
      post: "http://127.0.0.1:5454/author/9de17f29c12e8f97bcbbd34cc908f1baba40658e/posts/764efa883dda1e11db47671c4a3bbd9e",
      id: "http://127.0.0.1:5454/author/9de17f29c12e8f97bcbbd34cc908f1baba40658e/posts/de305d54-75b4-431b-adb2-eb6b9e546013/comments",
      comments: [
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
          comment: "Sick Olde English 5",
          contentType: "text/markdown",
          published: "2015-03-09T13:07:04+00:00",
          id: "http://127.0.0.1:5454/author/9de17f29c12e8f97bcbbd34cc908f1baba40658e/posts/de305d54-75b4-431b-adb2-eb6b9e546013/comments/f6255bb01c648fe967714d52a89e8e9c",
        },
      ],
    },
  },
  {
    title: "this is two of them",
    content: "this is two of them Content",
    author: "author6",
    date: "xxxx-xx-xx xx:xx",
    id: "6",
    commentsSrc: {
      type: "comments",
      page: 1,
      size: 5,
      post: "http://127.0.0.1:5454/author/9de17f29c12e8f97bcbbd34cc908f1baba40658e/posts/764efa883dda1e11db47671c4a3bbd9e",
      id: "http://127.0.0.1:5454/author/9de17f29c12e8f97bcbbd34cc908f1baba40658e/posts/de305d54-75b4-431b-adb2-eb6b9e546013/comments",
      comments: [
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
          comment: "Sick Olde English 6",
          contentType: "text/markdown",
          published: "2015-03-09T13:07:04+00:00",
          id: "http://127.0.0.1:5454/author/9de17f29c12e8f97bcbbd34cc908f1baba40658e/posts/de305d54-75b4-431b-adb2-eb6b9e546013/comments/f6255bb01c648fe967714d52a89e8e9c",
        },
      ],
    },
  },
  {
    title: "",
    content: "this is two of them Content",
    author: "author6",
    date: "xxxx-xx-xx xx:xx",
    id: "7",
    commentsSrc: {
      type: "comments",
      page: 1,
      size: 5,
      post: "http://127.0.0.1:5454/author/9de17f29c12e8f97bcbbd34cc908f1baba40658e/posts/764efa883dda1e11db47671c4a3bbd9e",
      id: "http://127.0.0.1:5454/author/9de17f29c12e8f97bcbbd34cc908f1baba40658e/posts/de305d54-75b4-431b-adb2-eb6b9e546013/comments",
      comments: [
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
          comment: "Sick Olde English 7",
          contentType: "text/markdown",
          published: "2015-03-09T13:07:04+00:00",
          id: "http://127.0.0.1:5454/author/9de17f29c12e8f97bcbbd34cc908f1baba40658e/posts/de305d54-75b4-431b-adb2-eb6b9e546013/comments/f6255bb01c648fe967714d52a89e8e9c",
        },
      ],
    },
  },
];
const baseUrl = "https://api.github.com/users";

// dummy val
const tempPostOnClick = (ev) => {
  console.log("clicked a post");
};

const dummyImages = [dummy_image, dummy_image1, null];
/**/

function PostStream(props) {
  const handleRemove = (e) => {
    const id = e.id;
    const newList = postlist.filter((item) => item.id !== id);
    setPostlist(newList);
  };
  const changePage = (ev, value) => {
    setPage(value);
  };

  const viewComments = (post) => {
    setComments(post);
    // console.log(props);
    // props.history.push({
    //   pathname: "/posts/" + post.id + "/comments",
    //   state: {
    //     commentsSrc: post.commentsSrc,
    //   },
    // });
  };
  const [vote, setVote] = React.useState(0);

  const styleClasses = useStyles();
  const [page, setPage] = React.useState(1);
  const [tempPostList1, setTempPostList] = React.useState(tempPostList);
  const [openPopup, setOpenPopup] = React.useState(false);
  const [comments, setComments] = React.useState({});
  const [user, setUser] = React.useState();
  const [github_user, setGit_user] = React.useState();

  const [postlist, setPostlist] = React.useState([]);
  const [openPopup2, setOpenPopup2] = React.useState(false);
  const open = (author, git) => {
    setUser(author);
    setGit_user(git);
    setOpenPopup(true);
  };
  const open_share = () => setOpenPopup2(true);

  const baseUrl2 = process.env.REACT_APP_API_ENDPOINT;
  useEffect(() => {
    var newList = [];
    const requestOne = axios.get(`${baseUrl2}/posts/`);
    const requestTwo = axios.get(
      `${baseUrl}/${localStorage.getItem("github_user")}/events`
    );
    axios
      .all([requestOne, requestTwo])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          responseOne.data.map((single) => {
            newList.push({
              id: single.id,
              published: single.published,
              content: single.content,
              author: single.author.user_name,
              github_user: single.author.github_name,
              title: single.title,
              img: single.image,
              author_id: single.author.id,
            });
          });
          const responseTwo = responses[1];
          responseTwo.data.map((single) => {
            //console.log(single.actor);
            newList.push({
              id: single.id,
              published: single.created_at,
              content: "from repo: " + single.repo.name,
              author: single.actor.login,
              github_user: "",
              title: "Github Activity: " + single.type,
              img: "",
              author_id: "github",
            });
          });
          setPostlist(newList);
        })
      )
      .catch((errors) => {
        console.log(errors);
      });
    /*
    axios
      .get(`${baseUrl2}/posts/`)
      .then((res) => {
        if (res.data[0].id) {
          newList = newList.concat(res.data);
        }
      })
      .catch(function (error) {
        console.log("Show error notification!");
        return Promise.reject(error);
      });
    axios.get(`${baseUrl}/xius666/events`).then((res) => {
      console.log(res.data);
      res.data.map((single) => {
        //console.log(single.actor);
        newList.push({
          id: single.id,
          published: single.created_at,
          content: "from repo: " + single.repo.name,
          author: single.actor.login,
          title: "Github Activity: " + single.type,
        });
      });
      setPostlist(newList);
    });*/
  }, []);
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
  const postStream = postlist.map((post) => (
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
          <Typography>{post != null ? post.published : "null date"}</Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs>
          {post.image === "" ? null : (
            <div
              style={{
                display: "flex",
                alignItem: "center",
                justifyContent: "center",
              }}
            >
              <CardMedia
                style={{
                  width: "auto",
                  maxHeight: "200px",
                }}
                component="img"
                src={post.image}
              />
            </div>
          )}

          <Card className={styleClasses.cardInPost}>
            <CardActionArea
              onClick={tempPostOnClick}
              className={styleClasses.clickBox}
            >
              {post.title.length > 0 ? (
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
                <div
                  style={{
                    display: "flex",
                    alignItem: "center",
                    justifyContent: "center",
                  }}
                >
                  <CardMedia
                    style={{
                      width: "auto",
                      maxHeight: "200px",
                    }}
                    component="img"
                    image={dummyImages[1]}
                  />
                </div>
              )}
            </CardActionArea>
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
          </Grid>{" "}
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
      <Popup
        title={"Who do you want to share with?"}
        openPopup={openPopup2}
        setOpenPopup={setOpenPopup2}
      >
        <Share></Share>
      </Popup>
      <Grid
        container
        spacing={2}
        className={styleClasses.stream}
        justifyContent="center"
        alignItems="center"
      >
        {postStream}
      </Grid>
      {/* <Pagination
        count={3}
        page={page}
        onChange={changePage}
        className={styleClasses.pagination}
      /> */}
    </div>
  );
}

export default PostStream;
