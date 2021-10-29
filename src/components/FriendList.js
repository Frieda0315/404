import React from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import head1 from "../static/1.JPG";
import { Delete } from "@material-ui/icons";
import { Grid } from "@material-ui/core";
import axios from "axios";
import {IconButton,} from "@material-ui/core";
import { StyleSheet, useState, useEffect, Text } from "react";

const FriendList = () => {
  const userid = localStorage.getItem("current_user_id");
  const baseUrl2 = process.env.REACT_APP_API_ENDPOINT;
  const [friendList, setFriends] = React.useState([]);
  

  const handleRemove = (e) => {
    const id = e.id;
    const newList = friendList.filter((item) => item.id !== id);
    setFriends(newList);
    
    axios.delete(`${baseUrl2}/author/${userid}/followers/${id}/`).then((res)=>{
       console.log(res.data) })


  };

  useEffect(() => {
    const newList = [];
    axios.get(`${baseUrl2}/author/${userid}/followers/`).then((res) => {
      console.log(res.data)
      res.data.map((infor) => {
        newList.push({
          id: infor.id,
          github: infor.github_name,
          follower: infor.user_name,
        });
      });
      setFriends(newList);
    });
  },[])


  const friendType = async (id) =>{
    const a = await axios.get(`${baseUrl2}/author/${userid}/followers/${id}/`)
    const b = await axios.get(`${baseUrl2}/author/${id}/followers/${userid}/`)
    const friend = "friend"
    const follower = "follower"
    if(a.data.result === b.data.result){
      return friend
    }
    else{
      return follower
    }
  }
 

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
              <Typography>{friendType(item.id)}</Typography>
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
          <IconButton
            edge="end"
            aria-label="Delete"
            onClick={() => handleRemove(item)}
          >
            <Delete />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  ));
  return (
    <div>
      <Grid container direction="column" alignSelf="center" marginTop={2}>
        {listItems}
      </Grid>
    </div>
  );
};

export default FriendList;
