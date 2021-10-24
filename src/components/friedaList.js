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
        profileImage: head1,
        github: "http://github.com/laracroft",
    },
    {
        type:"follower",
        displayName: "potato",
        profileImage: head2,
        github: "http://github.com/laracroft",
    },
    {
        type:"pending",
        displayName: "melon",
        profileImage: head3,
        github: "http://github.com/laracroft",
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
    marginLeft = {50}
    marginRight = {50}
    >
        <Grid container  direction = "column" spacing = {1}>
            <Grid item>
                <Grid container direction = "row" spacing={2}>
                    <Grid item>
                        <Avatar alt={`head1`} src={item.profileImage}/> 
                    </Grid>
                    <Grid item>
                        <Typography >{item.displayName}</Typography>
                    </Grid>
                    <Grid item  marginLeft = {30} >
                        <Typography >{item.type}</Typography>
                    </Grid>
                </Grid>
            </Grid>
            
            <Grid item marginLeft = {7}>
                <Typography >{item.github}</Typography>
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

