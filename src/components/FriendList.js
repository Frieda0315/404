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
  const [followerList, setFollowerList] = React.useState([]);

  const handleRemove = (id) => {
    const newList = followerList.filter((item) => item.id !== id);
    setFollowerList(newList);
    axios.delete(
      `${baseUrl2}/author/${userid}/followers/${id.split("/").at(-1)}/`,
      {
        auth: {
          username: "admin",
          password: "admin",
        },
      }
    );
  };
  //const [check, setCheck] = React.useState(false);

  var checkList = [];
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
    return axios.all([a, b]).then(
      axios.spread((...res) => {
        console.log(res[0].data.result);
        var p = {};

        if (res[0].data.result === true && res[1].data.result === true) {
          p[id] = true;
          checkList.push(p);
        } else {
          p[id] = false;

          checkList.push(p);
        }
      })
    );
  };

  useEffect(() => {
    axios
      .get(
        `https://i-connect.herokuapp.com/service/author/${userid}/followers/`,
        {
          auth: {
            username: "admin",
            password: "admin",
          },
        }
      )
      .then((res) => {
        setFollowerList(res.data.items);
        console.log(res.data.items);

        // let promises = [];
        // followerList.map((infor) => {
        //   const user2Uuid = infor.id.split("/").at(-1);
        //   promises.push(friendType(user2Uuid));
        // });

        // Promise.all(promises).then(() => {
        //   console.log(checkList);
        //   followerList.map((infor) => {
        //     const user2Uuid = infor.id.split("/").at(-1);
        //     for (let i = 0; i < checkList.length; i++) {
        //       if (user2Uuid === Object.keys(checkList[i])[0]) {
        //         newList.push({
        //           id: user2Uuid,
        //           github: infor.github,
        //           follower: infor.displayName,
        //           ftype: checkList[i][user2Uuid],
        //           profileImage: infor.profileImage,
        //         });
        //       }
        //     }
        //   });
        //   setNewList2(newList);
        //   //return newList;
        //   console.log(newList);
        // });
      });
  }, []);

  const listItems = followerList.map((item) => (
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
              <Avatar alt="head" src={item.profileImage} />
            </Grid>
            <Grid item>
              <Typography>{item.displayName}</Typography>
              <Typography>{item.github}</Typography>
            </Grid>
          </Grid>
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
            Remove
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
        <div class="text text-1">your follower</div>
        {listItems}
      </Grid>
    </div>
  );
};

export default FriendList;
