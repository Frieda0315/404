import Grid from "@material-ui/core/Grid";
import { Avatar, IconButton } from "@material-ui/core";
import { Card } from "reactstrap";
import makeStyles from "@material-ui/styles/makeStyles";
import React, { useEffect } from "react";
import { CardMedia, CardActionArea, Typography } from "@material-ui/core";
import axios from "axios";

import { Delete, ShareRounded, ThumbUp, Comment } from "@material-ui/icons";
import Popup from "./Popup";
import Profile from "./Profile";
import FollowProfile from "./FollowProfile";
import { v4 as uuidv4 } from "uuid";
import ImageHolder from "./ImageHolder";
import { Redirect } from "react-router";
import ReactMarkdown from "react-markdown";
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

const baseUrl = "https://api.github.com/users";

function PostStream(props) {
  const styleClasses = useStyles();
  const userid = localStorage.getItem("current_user_id");
  const [page, setPage] = React.useState(1);
  //  const [tempPostList1, setTempPostList] = React.useState(tempPostList);
  const [openPopup, setOpenPopup] = React.useState(false);
  const [authorids, setAuthorid] = React.useState();
  const [comments, setComments] = React.useState({});
  const [user, setUser] = React.useState();
  const [github_user, setGit_user] = React.useState();
  const [openPopup3, setOpenPopup3] = React.useState(false);
  const [image, setImage] = React.useState();

  const [postlist, setPostlist] = React.useState([]);
  const [openPopup2, setOpenPopup2] = React.useState(false);
  const [shareBuffer, setShareBuffer] = React.useState({});
  const baseUrl = "https://api.github.com/users";
  const [url, setUrl] = React.useState([]);

  const open = (author, git, authorid) => {
    setUser(author);
    setGit_user(git);
    setAuthorid(authorid);
    setOpenPopup(true);
  };
  const open_share = (post) => {
    axios
      .get(`${baseUrl2}/author/${post.author_id}/`, {
        auth: {
          username: "admin",
          password: "admin",
        },
      })
      .then((response) => {
        const newPost = {
          id: post.id,
          type: "post",
          title: post.title,
          content: post.content,
          contentType: post.contentType,
          published: post.published,
          author: response.data,
          visibility: "FRIENDS",
          source: "https://i-connect.herokuapp.com/service/posts/",
          origin: post.origin,
        };
        setOpenPopup2(true);
        setShareBuffer(newPost);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const open_image_holder = (post) => {
    setImage(post.img);
    setOpenPopup3(true);
  };
  const handle_like = async (post) => {
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
      summary: post.author + " Likes your post",
      type: "like",
      author: liker.data,
      object: baseUrl2 + "/author/" + post.author_id + "/posts/" + post.id,
    };

    // post likes
    await axios
      .post(`${baseUrl2}/author/${post.authorid}/inbox/`, likeData, {
        auth: {
          username: "admin",
          password: "admin",
        },
      })
      .then((response) => {
        // update the like number accordingly
        if (response.status === 201) {
          let newPostList = [];
          postlist.map((item) => {
            if (item.id === post.id) {
              item.like_num += 1;
            }
            newPostList.push(item);
          });
          setPostlist(newPostList);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
  const getAvator = (github_user) => {
    if (github_user !== "") {
      axios
        .get(`${baseUrl}/${github_user}`)
        .then((res) => {
          console.log(res.data["avatar_url"]);
          setUrl(res.data["avatar_url"]);
        })
        .catch((errors) => {
          console.log(errors);
        });
    }
  };

  const baseUrl2 = process.env.REACT_APP_API_ENDPOINT;
  useEffect(() => {
    var newList = [];
    const requestOne = axios.get(
      `${baseUrl2}/posts/${localStorage.getItem("current_user_id")}/`,

      {
        auth: {
          username: "admin",
          password: "admin",
        },
      }
    );
    const requestTwo = axios.get(
      `${baseUrl}/${localStorage.getItem("github_user")}/events`
    );
    axios
      .all([requestOne, requestTwo])
      .then(
        axios.spread((...responses) => {
          const responseTwo = responses[1];
          responseTwo.data.map((single) => {
            //console.log(single.actor);
            newList.push({
              id: single.id,
              published: single.created_at,
              content: "Repo: " + single.repo.name,
              author: single.actor.login,
              github_user: "",
              title: "Github Activity: " + single.type,
              avatar_url:
                "https://avatars.githubusercontent.com/u/55036290?v=4",
              is_github_activity: true,
            });
          });
          let like_promises = [];

          const responseOne = responses[0];
          responseOne.data.map((single) => {
            let postItem = {
              id: single.id,
              published: single.published,
              contentType: single.contentType,
              content: single.content,
              author: single.author.displayName,
              author_id: single.author.id,
              github: single.author.github,
              author_url: single.author.url,
              title: single.title,
              avatar_url: single.author.profileImage,
              is_github_activity: false,
              origin: single.origin,
              source: single.source,
            };

            // get the like numbers for each post
            like_promises.push(
              axios
                .get(
                  `${baseUrl2}/authors/${single.author.id}/posts/${single.id}/likes/`,
                  {
                    auth: { username: "admin", password: "admin" },
                  }
                )
                .then((response) => {
                  postItem.like_num = response.data.length;
                })
            );
            newList.push(postItem);
          });
          Promise.all(like_promises).then(() => {
            setPostlist(newList);
          });
        })
      )
      .catch((errors) => {
        console.log(errors);
      });
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
  const postStream = postlist
    .slice(0)
    .reverse()
    .map((post) => (
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
              src={post.avatar_url}
              onClick={() => {
                open(post.author, post.github_user, post.author_url);
              }}
            ></Avatar>
          </Grid>
          <Grid item>
            <Typography>
              {post != null ? post.author : "null author"}
            </Typography>
            <Typography>
              {post != null ? post.published : "null date"}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs>
            {false === true ? (
              <Grid container>
                <Grid item xs>
                  <Typography variant="h5" component="div">
                    {post.title}
                  </Typography>
                  {post.contentType === "text/markdown" ? (
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                  ) : (
                    <Typography variant="body1" color="text.secondary">
                      {post.content}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            ) : (
              <Grid container>
                <CardActionArea onClick={() => open_image_holder(post)}>
                  <CardMedia
                    component="img"
                    height="150"
                    image={post.img}
                    alt="fda"
                  />
                </CardActionArea>

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
          </Grid>
        </Grid>

        {!post.is_github_activity ? (
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
                  handle_like(post);
                }}
              >
                <ThumbUp />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography>{post.like_num}</Typography>
            </Grid>{" "}
            <Grid item>
              <IconButton
                edge="end"
                aria-label="share"
                onClick={(e) => {
                  e.preventDefault();
                  open_share(post);
                  console.log(shareBuffer);
                }}
              >
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
        <FollowProfile follow_user_url={authorids} />
      </Popup>
      <Popup title={""} openPopup={openPopup3} setOpenPopup={setOpenPopup3}>
        <ImageHolder image={image}></ImageHolder>
      </Popup>
      <Popup
        title={"Who do you want to share with?"}
        openPopup={openPopup2}
        setOpenPopup={setOpenPopup2}
      >
        <Share post={shareBuffer} setOpen={setOpenPopup2}></Share>
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
