
import Grid from "@material-ui/core/Grid";
import { Avatar, Button } from "@material-ui/core";
import { Card } from "reactstrap";
import makeStyles from "@material-ui/styles/makeStyles";
import React from "react";
import { CardMedia, CardActionArea, CardContent, Typography } from "@material-ui/core";
import dummy_image from "../static/musle.png"
import { margin } from "@material-ui/system";

const useStyles = makeStyles(() =>({
    stream: {
        marginLeft: "10px"
    }, 
    postBody: {
        marginLeft: "100px"
    },
    postImage: {
        height: "95px", 
        margin: "auto"
    }, 
    image: {
        width: "100%", 
        height: "100%", 
    }, 
    voteButton: {
        maxHeight: "20px",
        maxWidth: "20px",
        borderRadius: "100%",
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
    const vote = (ev) => {
        console.log("vote clicked");
    };
    const tempSummary = "poster body summary";
    const postStream = postList.map((post) => 
        <Grid item xs={8} className={styleClasses.postBody}>
            <Grid container>
                <Grid item xs={1}>
                    <Avatar src={dummy_image}></Avatar>
                </Grid>
                <Grid item xs={4}>
                    <Typography  variant="subtitle1" color="text.secondary" component="div"> 
                        Xiu666
                    </Typography>
                    <Typography  variant="subtitle1" color="text.secondary" component="div"> 
                        Date: xxxx-xx-xx xx:xx
                    </Typography>
                </Grid>
            </Grid>
            <Card>
                <Grid container>
                    <Grid item xs={2} className={styleClasses.postImage}>
                        <CardMedia
                            component="img"
                            className={styleClasses.image}
                            image={dummy_image}
                            alt="dummy"
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <CardActionArea onClick={tempPostOnClick}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h5">
                                    {post}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    {tempSummary}
                                </Typography>
                            </CardContent> 
                        </CardActionArea>   
                    </Grid>
                    
                </Grid>
            </Card>
        </Grid>
        
    );
    return (
        <Grid container spacing={2} className={styleClasses.stream}>
            {postStream}
        </Grid>
    )
}

export default PostStream;
