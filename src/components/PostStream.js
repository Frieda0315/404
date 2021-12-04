// Reference: https://stackoverflow.com/a/67496798
// Author: https://stackoverflow.com/users/2916090/mohagali
import Grid from "@material-ui/core/Grid";
import { Avatar, IconButton } from "@material-ui/core";
import { Card } from "reactstrap";
import makeStyles from "@material-ui/styles/makeStyles";
import React, { useEffect } from "react";
import { CardMedia, CardActionArea, Typography } from "@material-ui/core";
import axios from "axios";
import {
  Delete,
  ShareRounded,
  ThumbUp,
  Comment,
  Public,
} from "@material-ui/icons";
import Popup from "./Popup";
import Profile from "./Profile";
import FollowProfile from "./FollowProfile";
import { v4 as uuidv4 } from "uuid";
import ImageHolder from "./ImageHolder";
import SourceTag from "./SourceTag";
import ReactMarkdown from "react-markdown";
import Share from "./Share";
import PostItemInList from "./PostItemInList";
import "../index.css";
import { useHistory } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

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
  const history = useHistory();
  const [dataFetched, setDataFetched] = React.useState(false);
  const styleClasses = useStyles();
  const [page, setPage] = React.useState(1);
  //  const [tempPostList1, setTempPostList] = React.useState(tempPostList);
  const [openPopup, setOpenPopup] = React.useState(false);
  const [authorids, setAuthorid] = React.useState("");
  const [comments, setComments] = React.useState({});
  const [user, setUser] = React.useState();
  const [github_user, setGit_user] = React.useState();
  const [openPopup3, setOpenPopup3] = React.useState(false);
  const [image, setImage] = React.useState();

  const [postlist, setPostlist] = React.useState([]);

  const [openPopup2, setOpenPopup2] = React.useState(false);
  const [nodeMaps, setNodeMaps] = React.useState([]);

  const [shareBuffer, setShareBuffer] = React.useState({});
  const baseUrl = "https://api.github.com/users";
  const [url, setUrl] = React.useState([]);

  const open = (author, git, authorid) => {
    console.log(authorid);
    setUser(author);
    setGit_user(git);
    setAuthorid(authorid);
    setOpenPopup(true);
  };
  const open_share = (post) => {
    axios
      .get(`${baseUrl2}/author/${localStorage.getItem("current_user_id")}/`, {
        auth: {
          username: "admin",
          password: "admin",
        },
      })
      .then((response) => {
        axios
          .get(`${post.id}`, {
            auth: {
              username: post.username,
              password: post.password,
            },
          })
          .then((res) => {
            let newPost = res.data;
            newPost.source = "https://i-connect.herokuapp.com/service/posts/";
            newPost.visibility = "FRIENDS";
            console.log(newPost);
            setOpenPopup2(true);
            setShareBuffer(newPost);
          });
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
    const authorId = post.author_id.split("/").at(-1);
    const like_uuid = uuidv4();
    const liker = await axios.get(
      `https://i-connect.herokuapp.com/service/author/${localStorage.getItem(
        "current_user_id"
      )}`,
      {
        auth: {
          username: "admin",
          password: "admin",
        },
      }
    );
    console.log(liker.data);
    const likeData = {
      //"@context": "https://www.w3.org/ns/activitystreams",
      summary: localStorage.getItem("user_name") + " Likes your post",
      type: "Like",
      author: liker.data,
      object: post.id,
    };
    console.log(likeData);

    // post likes
    await axios
      .post(`${post.author_id}/inbox/`, likeData, {
        auth: {
          username: post.username,
          password: post.password,
        },
      })
      .then((response) => {
        // update the like number accordingly
        if (response.status === 201 || response.status === 200) {
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
    axios
      .get(`${baseUrl2}/admin/nodes/`, {
        auth: {
          username: "admin",
          password: "admin",
        },
      })
      .then(async (res) => {
        const nodeLists = res.data;
        var requestList2 = [];

        nodeLists.map((single) => {
          var username = single.user_name;
          var password = single.password;
          let authorApi = `${single.url}/authors/`;
          if (single.url === "https://social-distance-api.herokuapp.com") {
            authorApi += "?page=1&size=1000";
          }
          requestList2.push(
            axios.get(authorApi, {
              auth: {
                username: username,
                password: password,
              },
            })
          );
        });
        const author_res = await axios.all(requestList2);
        let resList = [];
        author_res.map((r) => {
          resList = resList.concat(r.data.items);
        });
        return [resList, nodeLists];
      })
      .then(async (res) => {
        let all_post_list = [];
        let requestList3 = [];
        console.log(res[0]);
        res[0].map((single) => {
          let single_node = res[1].filter(
            (item) =>
              item.url.includes(single.host) || single.host.includes(item.url)
          );

          const username = single_node[0].user_name;
          const password = single_node[0].password;
          let getPostApi = `${single.id}/posts`;
          if (single.host === "https://social-distance-api.herokuapp.com/") {
            single.id = single.id.slice(0, -1);
            getPostApi = `${single.id}/posts?page=1&size=1000`;
          }
          requestList3.push(
            axios.get(getPostApi, {
              auth: {
                username: username,
                password: password,
              },
            })
          );
        });
        const post_res = await axios.all(requestList3);
        let resList = [];
        // temp adaptor for t4
        post_res.map((r) => {
          if (r.data instanceof Array) {
            resList = resList.concat(r.data);
          } else {
            console.log(r.data.items);
            resList = resList.concat(r.data.items);
          }
        });

        all_post_list = resList.filter(
          (item) => item && item.visibility === "PUBLIC"
        );
        all_post_list.map((post) => {
          let single_node = res[1].filter(
            (item) =>
              item.url.includes(post.author.host) ||
              post.author.host.includes(item.url)
          );
          const username = single_node[0].user_name;
          const password = single_node[0].password;
          post["username"] = username;
          post["password"] = password;
        });
        return all_post_list;
      })
      .then((res) => {
        var newList = [];
        //newList.push(res);
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
                newList.push({
                  id: single.id,
                  published: single.created_at,
                  content: "Repo: " + single.repo.name,
                  author: single.actor.login,
                  github_user: "",
                  title: single.type,
                  username: "admin",
                  password: "admin",
                  avatar_url:
                    "https://avatars.githubusercontent.com/" +
                    single.actor.login,
                  is_github_activity: true,
                });
              });
              let like_promises = [];

              const responseOne = responses[0];
              res.map((single) => {
                let postId = single.id.split("/").at(-1);

                let get_like_url = `${single.author.id}/posts/${postId}/likes`;

                if (
                  single.author.host ===
                  "https://social-distance-api.herokuapp.com/"
                ) {
                  postId = single.id.split("/").at(-2);
                  single.id = single.id.slice(0, -1);
                  single.comments =
                    single.comments.slice(0, -1) + "?size=1000&page=1";
                  single.author.id = single.author.id.slice(0, -1);
                  get_like_url = `${single.author.id}/posts/${postId}/likes`;
                }

                let postItem = {
                  id: single.id,
                  published: single.published,
                  author_item: single.author,
                  username: single.username,
                  password: single.password,
                  contentType: single.contentType,
                  content: single.content,
                  author: single.author.displayName,
                  author_id: single.author.id,
                  github: single.author.github,
                  author_url: single.author.url,
                  title: single.title,
                  visibility: single.visibility,
                  avatar_url: single.author.profileImage,
                  is_github_activity: false,
                  origin: single.origin,
                  source: single.source,
                  comments: single.comments,
                };

                // get the like numbers for each post
                //const authorId = single.author.id.split("/").at(-1);

                like_promises.push(
                  axios
                    .get(get_like_url, {
                      auth: {
                        username: single.username,
                        password: single.password,
                      },
                    })
                    .then((response) => {
                      if (response.data instanceof Array) {
                        postItem.like_num = response.data.length;
                      } else {
                        postItem.like_num = response.data.items.length;
                      }
                    })
                );
                newList.push(postItem);
              });
              Promise.all(like_promises).then(() => {
                setPostlist(newList);
                setDataFetched(true);
              });
            })
          )
          .catch((errors) => {
            console.log(errors);
          });
      });
  }, []);

  const handleComment = (post) => {
    console.log(comments);

    history.push({
      pathname:
        "/author/" +
        post.author_id.split("/").at(-1) +
        "/posts/" +
        post.id.split("/").at(-1) +
        "/comments",
      state: post,
    });
  };

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

            {post.is_github_activity === true ? (
              <Typography className="tag-format github-tag">
                Github Activity
              </Typography>
            ) : (
              <SourceTag host={post.author_item.host} />
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

        {!post.is_github_activity ? (
          <PostItemInList post={post} />
        ) : (
          <Grid container style={{ marginLeft: "48px" }}>
            <Grid item xs>
              <Typography variant="body1" color="text.secondary">
                {post.content}
              </Typography>
            </Grid>
          </Grid>
        )}

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
            </Grid>
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
                onClick={() => handleComment(post)}
              >
                <Comment />
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
      {dataFetched ? (
        <Grid
          container
          spacing={2}
          className={styleClasses.stream}
          justifyContent="center"
          alignItems="center"
        >
          {postStream}
        </Grid>
      ) : (
        <Grid
          container
          spacing={2}
          className={styleClasses.stream}
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress />
        </Grid>
      )}
    </div>
  );
}

export default PostStream;
