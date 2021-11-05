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

  const handleRemove = (e) => {
    const id = e.id;
    const newList = friendList.filter((item) => item.id !== id);
    setFriends(newList);

    axios
      .delete(`${baseUrl2}/author/${userid}/followers/${id}/`, {
        auth: {
          username: "admin",
          password: "admin",
        },
      })
      .then((res) => {
        console.log(res.data);
      });
  };
  const [check, setCheck] = React.useState(false);
  const [isFriend, setIsFriend] = React.useState("follower");
  useEffect(() => {
    const newList = [];
    axios
      .get(`${baseUrl2}/author/${userid}/followers/`, {
        auth: {
          username: "admin",
          password: "admin",
        },
      })
      .then((res) => {
        res.data.map((infor) => {
          if (friendType(infor.id)) {
            setIsFriend("friend");
            //console.log(isFriend);
          } else {
            setIsFriend("follower");
          }
          console.log("friend Type", friendType(infor.id));
          newList.push({
            id: infor.id,
            github: infor.github_name,
            follower: infor.user_name,
            ftype: isFriend,
          });
        });
        //console.log("this is check", isFriend);
        setFriends(newList);
      });
  }, []);

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

  const listItems = friendList.map((item) => (
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
            <Grid item marginLeft={30}>
              <Typography>{item.ftype}</Typography>
            </Grid>
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
            onClick={() => handleRemove(item)}
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
