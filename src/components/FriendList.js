import React from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import head1 from "../static/1.JPG";
import { Grid } from "@material-ui/core";
import axios from "axios";
import { Button } from "@material-ui/core";
import { useEffect } from "react";
import "./font/style.css";

const FriendList = () => {
  const userid = localStorage.getItem("current_user_id");
  const baseUrl2 = process.env.REACT_APP_API_ENDPOINT;
  const [friendList, setFriends] = React.useState([]);

  const handleRemove = (id) => {
    axios
      .delete(`${baseUrl2}/author/${userid}/followers/${id}/`, {
        auth: {
          username: "admin",
          password: "admin",
        },
      })
      .then((res) => {
        const newList = friendList.filter((item) => item.id !== id);
        setFriends(newList);
      });
  };
  const [check, setCheck] = React.useState(false);
  const [followerList, setFollowerList] = React.useState([]);

  const friendType = (id) => {
    //let check = false;
    const a = axios.get(`${baseUrl2}/author/${userid}/followers/${id}/`, {
      auth: {
        username: "admin",
        password: "admin",
      },
    });
    const b = axios.get(`${baseUrl2}/author/${id}/followers/${userid}/`, {
      auth: {
        username: "admin",
        password: "admin",
      },
    });
    axios.all([a, b]).then(
      axios.spread((...res) => {
        if (
          res[0].data.result === "Follow relationship found" &&
          res[1].data.result === "Follow relationship found"
        ) {
          setCheck(true);
          console.log(check);
          return true;
        }
      })
    );
    return false;
  };

  useEffect(() => {
    axios
      .get(`${baseUrl2}/author/${userid}/followers/`, {
        auth: {
          username: "admin",
          password: "admin",
        },
      })
      .then((res) => {
        setFollowerList(res.data);
      });
  }, []);
  const newList = [];
  followerList.map((infor) => {
    let ismyfriend = false;
    const user2Uuid = infor.id.split("/").at(-1);
    friendType(user2Uuid);
    if (check) {
      ismyfriend = true;
      //console.log(isFriend);
    }
    newList.push({
      id: user2Uuid,
      github: infor.github,
      follower: infor.displayName,
      ftype: ismyfriend,
    });
  });
  //console.log("this is check", isFriend);

  const listItems = newList.map((item) => (
    <Grid
      item
      xs={8}
      justifyContent="flex-start"
      alignItems="flex-start"
      backgroundColor="#fff"
      borderBottom="1.2px solid #f0f2f7"
      padding="30px"
      boxShadow="0 1px 3px rgb(18 18 18 / 10%)"
      marginLeft={50}
      marginRight={50}
    >
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <Grid container direction="row" spacing={2}>
            <Grid item>
              <Avatar alt={`head1`} src={head1} />
            </Grid>
            <Grid item>
              <Typography>{item.follower}</Typography>
            </Grid>
            {item.ftype ? (
              <Grid item marginLeft={30}>
                <Typography>friend</Typography>
              </Grid>
            ) : (
              <Grid item marginLeft={30}>
                <Typography>follower</Typography>
              </Grid>
            )}
          </Grid>
        </Grid>

        <Grid item marginLeft={7}>
          <Typography>{item.github}</Typography>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={1}
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <Grid item>
          <Button
            variant="contained"
            size="small"
            onClick={() => handleRemove(item.id)}
          >
            UnFollow
          </Button>
          {/* <IconButton
            edge="end"
            aria-label="Delete"
            onClick={() => handleRemove(item)}
          >
            <Delete />
          </IconButton> */}
        </Grid>
      </Grid>
    </Grid>
  ));
  return (
    <div>
      <Grid container direction="column" alignSelf="center" marginTop={2}>
        <div class="text text-1">your friend</div>
        {listItems}
      </Grid>
    </div>
  );
};

export default FriendList;
