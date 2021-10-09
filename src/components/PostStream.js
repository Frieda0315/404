
import Grid from "@material-ui/core/Grid";

import { Avatar, IconButton, Pagination } from "@material-ui/core";
import { Card } from "reactstrap";
import makeStyles from "@material-ui/styles/makeStyles";
import React from "react";
import { CardMedia, CardActionArea, CardContent, Typography } from "@material-ui/core";
import vote_icon from "../static/vote.png"

import dummy_image from "../static/musle.png"
import dummy_image1 from "../static/arnold.png"

const useStyles = makeStyles(() =>({
    stream: {
        marginLeft: "10px"
    }, 
    clickBox: {
        height: "100%"
    },
    postTitle: {
        height: "28px",
        font: '25px Italian',
    }, 
    postBody: {
        flex: '1 0 auto',
        font: '16px Arial',
        marginTop: "5px",
        marginLeft: "5px"
    },
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
    }
}));

// dummy val
const tempPostList = [

    "Hello world", 
    "I am just trying to make a stream", 
    "I mean, a really simple one", 
    "so I decided to create some dummy strings", 
    "and this is one of them", 
    "this is two of them", 
    null
]
const tempSummary = "poster body summary";
const tempVoteCount = 0;
const tempPostOnClick = (ev) => {
    console.log("clicked a post");
};
const tempVoteOnClick = (ev) => {
    console.log("vote clicked");
};
const tempViewProfile = (ev) => {
    console.log("view profile");
};
const dummyUserName = "Xiu666";
const dummyPostDate = "Date: xxxx-xx-xx xx:xx"
const dummyImages = [dummy_image, dummy_image1, null];

function PostStream() {
    const styleClasses = useStyles();
    const [page, setPage] = React.useState(1);
    const changePage = (ev, value) => {
        setPage(value);
    }
    const postStream = tempPostList.map((post) => (
        <Grid item xs={8}>
            <Grid container>
                <Grid item xs={1}>
                    <IconButton onClick={tempViewProfile}>
                        <Avatar src={dummy_image}></Avatar>
                    </IconButton>
                </Grid>
                <Grid item xs={4}>
                    <Typography> 
                        {dummyUserName}
                    </Typography>
                    <Typography> 
                        {dummyPostDate}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs>
                    <Card>
                        <CardActionArea onClick={tempPostOnClick} className={styleClasses.clickBox}>
                            {post != null ? (<Grid container>
                                {dummyImages[post.length % 3] != null ? null : (
                                    <Grid item xs={2} className={styleClasses.postImage}>
                                        <CardMedia
                                            component="img"
                                            className={styleClasses.image}
                                            image={dummyImages[1]}
                                            alt="dummy"
                                        />
                                    </Grid>
                                )}
                                <Grid item xs>                            
                                    <CardContent className={styleClasses.postTitle}>
                                        {post}
                                    </CardContent> 
                                    <CardContent className={styleClasses.postBody}>
                                        {tempSummary}
                                    </CardContent>      
                                </Grid>
                            </Grid>
                            ) : (
                                <CardMedia
                                    component="img"
                                    className={styleClasses.image}
                                    image={dummyImages[1]}
                                    alt="dummy"
                                />
                            )}
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item>
                    <CardActionArea onClick={tempVoteOnClick}>
                        <CardMedia
                            component="img"
                            image={vote_icon}
                            className={styleClasses.voteBox}
                            alt="vote"
                        />
                    </CardActionArea>
                    <Typography align="center">
                        {tempVoteCount}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
        )
    );
    return (
        <div>
            <Grid container spacing={2} className={styleClasses.stream}>
                {postStream}
            </Grid>
            <Pagination count={3} page={page} onChange={changePage}/>
        </div>

    )
}

export default PostStream;
