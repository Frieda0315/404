import React, { useEffect } from "react";
import { Card, Typography, IconButton, Avatar, Fab } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { Grid } from "@mui/material";
import { useHistory } from "react-router-dom";
import { ShareRounded, ThumbUp, Comment } from "@material-ui/icons";
import Popup from "./Popup";
import Share from "./Share";
import makeStyles from "@material-ui/styles/makeStyles";
import axios from "axios";
import Post from "./Post";
import PostItemInList from "./PostItemInList";
import CircularProgress from "@mui/material/CircularProgress";

const useStyles = makeStyles(() => ({
  FollowItem: {
    padding: "2em",
  },
  LikeItem: {
    padding: "2em",
  },
}));

const Inbox = () => {
  const history = useHistory();

  const styleClasses = useStyles();
  const [InboxList1, setInboxList] = React.useState([]);
  const [dataFetched, setDataFetched] = React.useState(false);

  // 0 for post;
  // 1 for likes;
  // 2 for follow;
  const [InboxToggle, setInboxToggle] = React.useState(0);
  const [nodes, setNodes] = React.useState([
    {
      url: "http://localhost:8000/service",
      user_name: "admin",
      password: "admin",
    },
  ]);

  const [openPopup2, setOpenPopup2] = React.useState(false);
  const [shareBuffer, setShareBuffer] = React.useState({});
  const handleComment = (post) => {
    history.push({
      pathname:
        "/author/" +
        post.author.id.split("/").at(-1) +
        "/posts/" +
        post.post_id.split("/").at(-1) +
        "/comments",
      state: post,
    });
  };
  //const open_share = () => setOpenPopup2(true);
  const handleLike = async (post) => {
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
    const likeData = {
      //"@context": "https://www.w3.org/ns/activitystreams",
      summary: localStorage.getItem("user_name") + " Likes your post",
      type: "Like",
      author: liker.data,
      object: post.post_id,
    };
    // post likes
    let single_node = nodes.filter(
      (item) =>
        item.url.includes(post.author.host) ||
        post.author.host.includes(item.url)
    );
    await axios
      .post(`${post.author.id}/inbox/`, likeData, {
        auth: {
          username: single_node[0].user_name,
          password: single_node[0].password,
        },
      })
      .then((response) => {
        // update the like number accordingly
        if (response.status === 201) {
          let newList = [];
          InboxList1.map((item) => {
            if (item.type === "inbox") {
              if (item.post_id === post.post_id) {
                item.like_num += 1;
              }
            }
            newList.push(item);
          });
          setInboxList(newList);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleRemove = (e) => {
    const id = e.post_id;
    const newList = InboxList1.filter((item) => item.post_id !== id);
    setInboxList(newList);
  };

  const open_share = (post) => {
    axios
      .get(`${post.post_id}`, {
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
  };
  const acceptFriendRequest = (id) => {
    axios
      .put(
        `${baseUrl2}/author/${userid}/followers/${id}/`,
        {},
        {
          auth: {
            username: "admin",
            password: "admin",
          },
        }
      )
      .then((res) => {
        const newList1 = InboxList1.filter(
          (item) => item.type !== "follower" && item.follower_id !== id
        );
        setInboxList(newList1);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const declineFriendRequest = (id) => {
    axios
      .delete(
        `${baseUrl2}/friendrequest/actor/${id}/object/${userid}/`,

        {
          auth: {
            username: "admin",
            password: "admin",
          },
        }
      )
      .then((res) => {
        const newList1 = InboxList1.filter(
          (item) => item.type !== "follower" && item.follower_id !== id
        );
        console.log("new", newList1);
        setInboxList(newList1);
      });
  };
  const userid = localStorage.getItem("current_user_id");
  const baseUrl2 = process.env.REACT_APP_API_ENDPOINT;

  const handelClear = () => {
    axios
      .delete(`${baseUrl2}/author/${userid}/inbox/`, {
        auth: {
          username: "admin",
          password: "admin",
        },
      })
      .then((res) => {
        setInboxList([]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  var newList = [];
  useEffect(async () => {
    // get all the nodes
    let tempNodes = [];
    await axios
      .get(`${baseUrl2}/admin/nodes/`, {
        auth: { username: "admin", password: "admin" },
      })
      .then((response) => {
        setNodes(response.data);
        tempNodes = response.data;
      })
      .catch((error) => {
        console.log(error);
      });

    const requestOne = axios.get(`${baseUrl2}/author/${userid}/inbox/`, {
      auth: {
        username: "admin",
        password: "admin",
      },
    });
    const requestTwo = axios.get(
      `${baseUrl2}/author/${userid}/friendrequests/`,
      {
        auth: {
          username: "admin",
          password: "admin",
        },
      }
    );
    const requestThree = axios.get(
      `${baseUrl2}/author/${userid}/inbox/likes/`,
      {
        auth: { username: "admin", password: "admin" },
      }
    );
    let [responseOne, responseTwo, responseThree] = await axios.all([
      requestOne,
      requestTwo,
      requestThree,
    ]);
    if (responseOne.data.items) {
      let like_promises = [];
      responseOne.data.items.map(async (single) => {
        let post = {
          // this is a post
          type: "inbox",
          title: single.title,
          content: single.content,
          contentType: single.contentType,
          comments: single.comments,
          commentsSrc: single.commentsSrc,
          date: single.published,
          image: single.image,
          post_id: single.id,
          id: single.id,
          author_item: single.author,
          user_name: single.author.displayName,
          author: single.author,
          github_name: single.author.github.split("/").at(-1),
        };
        let single_node = tempNodes.filter(
          (item) =>
            item.url.includes(single.author.host) ||
            single.author.host.includes(item.url)
        );
        console.log(single_node);
        let postId = single.id.split("/").at(-1);
        let get_like_url = `${single.author.id}/posts/${postId}/likes`;
        if (
          single.author.host === "https://social-distance-api.herokuapp.com/"
        ) {
          postId = single.id.split("/").at(-1);
          single.id = single.id.slice(0, -1);
          get_like_url = `${single.author.id}/posts/${postId}/likes`;
        }
        like_promises.push(
          axios
            .get(get_like_url, {
              auth: {
                username: single_node[0].user_name,
                password: single_node[0].password,
              },
            })
            .then((response) => {
              if (response.data instanceof Array) {
                post.like_num = response.data.length;
              } else {
                post.like_num = response.data.items.length;
              }
              const username = single_node[0].user_name;
              const password = single_node[0].password;
              post["username"] = username;
              post["password"] = password;
            })
        );
        newList.push(post);
      });
      await Promise.all(like_promises).then((res) => {
        console.log(res);
        setDataFetched(true);
        console.log(newList);
      });
    }

    responseTwo.data.map((single) => {
      console.log(single);
      if (single.actor.host === "https://social-distance-api.herokuapp.com/") {
        newList.push({
          type: "follower",
          summary: single.summary,
          follower_user_name: single.actor.displayName,
          follower_id: single.actor.id.split("/").at(-1),
        });
      } else {
        newList.push({
          type: "follower",
          summary: single.summary,
          follower_user_name: single.actor.displayName,
          follower_id: single.actor.id.split("/").at(-1),
        });
      }
    });

    responseThree.data.map(async (single) => {
      console.log(single);
      let objectURL = single.object;
      if (single.object.includes("comments")) {
        objectURL = objectURL.split("/comments/")[0];
      }
      const like_object = await axios
        .get(objectURL, {
          auth: { username: "admin", password: "admin" },
        })
        .then((response) => {
          const item = response.data;
          console.log(item);
          newList.push({
            type: "Like",
            summary: single.summary,
            title: item.title,
            content: item.content,
            date: item.published,
            image: item.image,
            user_name: item.author.displayName,
            author_id: item.author.id.split("/").at(-1),
            github_name: item.author.github.split("/").at(-1),
          });
        })
        .catch((error) => {
          console.log(error);
        });
    });

    setInboxList(newList);
  }, []);

  var listItems;

  if (InboxToggle === 0) {
    // Posts
    listItems = InboxList1.filter((item) => item.type === "inbox").map(
      (item) => {
        console.log(item.like_num);
        return (
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
                {/* <Grid item>
                <Avatar src={item.author.profileImage}></Avatar>
              </Grid> */}
                <Grid item>
                  <Grid container direction="column">
                    <Grid item>
                      <Typography>
                        {item.user_name + " share a new post."}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography>{item.date}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Typography variant="h5">{item.title}</Typography>
            </Grid>

            <Grid item spacing={2}>
              <PostItemInList post={item} />
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
                  onClick={() => handleLike(item)}
                >
                  <ThumbUp />
                </IconButton>
              </Grid>
              <Grid item>
                <Typography>{item.like_num}</Typography>
              </Grid>
              <Grid item>
                <IconButton
                  edge="end"
                  aria-label="share"
                  onClick={() => {
                    open_share(item);
                    //console.log(shareBuffer);
                  }}
                >
                  <ShareRounded />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  edge="end"
                  aria-label="comment"
                  onClick={() => handleComment(item)}
                >
                  <Comment />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        );
      }
    );
  } else if (InboxToggle === 1) {
    // Likes
    listItems = InboxList1.filter((item) => item.type === "Like").map(
      (item) => (
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
              {/* <Grid item>
                <Avatar src={item.author.profileImage}></Avatar>
              </Grid> */}
              <Grid item>
                <Grid container direction="column">
                  <Grid item>
                    <Typography>Summary: {item.summary}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>{item.date}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Typography variant="h5">{item.title}</Typography>
          </Grid>

          {/* <Grid item spacing={2}>
            <Typography>{item.content}</Typography>
          </Grid> */}
        </Grid>
      )
    );
  } else if (InboxToggle === 2) {
    // Folows

    listItems = InboxList1.filter((item) => item.type === "follower").map(
      (item) => (
        <Grid item>
          <Card>
            <Grid container direction="row" className={styleClasses.FollowItem}>
              <Grid item xs={10}>
                <Typography>{item.summary}</Typography>
              </Grid>
              <Grid item xs>
                <Fab
                  variant="extended"
                  color="primary"
                  onClick={() => acceptFriendRequest(item.follower_id)}
                >
                  accecpt
                </Fab>
                <Fab
                  variant="extended"
                  color="primary"
                  onClick={() => declineFriendRequest(item.follower_id)}
                >
                  decline
                </Fab>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      )
    );
  }

  return (
    <div>
      <Popup
        title={"Who do you want to share with?"}
        openPopup={openPopup2}
        setOpenPopup={setOpenPopup2}
      >
        <Share post={shareBuffer} setOpen={setOpenPopup2}></Share>
      </Popup>
      <Grid container direction="row">
        <Grid item>
          <Fab
            variant="extended"
            color="primary"
            onClick={() => setInboxToggle(0)}
          >
            Posts
          </Fab>
        </Grid>
        <Grid item>
          <Fab
            variant="extended"
            color="primary"
            onClick={() => setInboxToggle(1)}
          >
            <Typography>{"likes"}</Typography>
          </Fab>
        </Grid>
        <Grid item>
          <Fab
            variant="extended"
            color="primary"
            onClick={() => setInboxToggle(2)}
          >
            <Typography>{"Follow"}</Typography>
          </Fab>
        </Grid>
        <Grid item>
          <Fab
            variant="extended"
            color="secondary"
            onClick={() => handelClear()}
          >
            <Typography>{"Clear"}</Typography>
          </Fab>
        </Grid>
      </Grid>

      {dataFetched ? (
        <Grid
          container
          spacing={10}
          direction="column"
          alignSelf="right"
          marginTop={2}
        >
          {listItems}
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
};

export default Inbox;
