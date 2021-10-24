import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import head1 from "../static/1.JPG";
import head2 from "../static/2.JPG";
import head3 from "../static/3.JPG"
import { Grid } from '@material-ui/core';

const friendList =[
    {
        type:"follower",
        displayName: "tomato",
        profileImage: head1
    },
    {
        type:"follower",
        displayName: "potato",
        profileImage: head2
    },
    {
        type:"pending",
        displayName: "melon",
        profileImage: head3
    }
];
const listItems = friendList.map((item) =>
    <Grid item 
    xs={8}
    justifyContent="flex-start"
    alignItems="flex-start"
    backgroundColor = "#fff"
    borderBottom =  "1.2px solid #f0f2f7"
    padding = "30px"
    boxShadow =  "0 1px 3px rgb(18 18 18 / 10%)"
    marginLeft = {20}
    marginRight = {20}
    >
        <Grid container direction = "row" spacing={5}>
                <Grid item>
                    <Avatar alt={`head1`} src={item.profileImage}/> 
                </Grid>
                <Grid item>
                    <Typography >{item.displayName}</Typography>
                </Grid>
                <Grid item>
                    <text>1</text>
                </Grid>
            </Grid>
    </Grid>


);


const friedaList = () => {
    return (
        <div>
            
            <Grid container
            direction="column"
            alignSelf = 'center'
            marginTop = {2}
            >
                {listItems}   
            </Grid>
            
        </div>
    )
}

export default friedaList

