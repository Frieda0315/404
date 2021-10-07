
import Grid from "@material-ui/core/Grid";
//import Item from "@material-ui/core/ListItem"
import { Card } from "reactstrap";
import makeStyles from "@material-ui/styles/makeStyles";
import React from "react";
import { Box, CardMedia, CardActionArea, CardContent, Divider, Typography } from "@material-ui/core";
import dummy_image from "../static/musle.png"

const useStyles = makeStyles(() =>({
    stream: {
        marginLeft: "10px"
    }, 
    postBody: {
        marginLeft: "100px"
    }
}));

// dummy val
const postList = [
    "Hello world", 
    "I am just trying to make a stream", 
    "I mean, a really simple one", 
    "so I decided to create some dummy strings", 
    "and this is one of them", 
    "this is two of them"
]

function PostStream() {
    const styleClasses = useStyles();
    const tempPostOnClick = (ev) => {
        console.log("clicked a post");
    };
    const postStream = postList.map((post) => 
        <Grid item xs={8} className={styleClasses.postBody}>
            <Typography  variant="subtitle1" color="text.secondary" component="div"> 
                Xiu666
            </Typography>
            <Typography  variant="subtitle1" color="text.secondary" component="div"> 
                Date: xxxx-xx-xx xx:xx
            </Typography>
            <Card sx={{ display: 'flex' }}>
                <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image={dummy_image}
                    alt="Live from space album cover"
                />
                <CardActionArea onClick={tempPostOnClick}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h5">
                        {post}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                        poster body summary
                        </Typography>
                    </CardContent>
                    </Box> 
                </CardActionArea>
                
            </Card>
            <Divider/>
        </Grid>
        
    );
    return (
        <Grid container spacing={2} className={styleClasses.stream}>
            {postStream}
        </Grid>
    )
}

export default PostStream;
