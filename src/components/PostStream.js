
import Grid from "@material-ui/core/Grid";
//import Item from "@material-ui/core/ListItem"
import { Card } from "reactstrap";
import makeStyles from "@material-ui/styles/makeStyles";
import React from "react";
const useStyles = makeStyles(() =>({

}));

const postList = [
    "Hello world", 
    "I am just trying to make a stream", 
    "I mean, a really simple one", 
    "so I decided to create some dummy strings", 
    "and this is one of them", 
    "this is two of them"
]

function PostStream() {
    const postStream = postList.map((post) => 
    <Grid item xs={8}>
        <Card> {post} </Card>
    </Grid>);

    return (
        <Grid container spacing={2}>
            {postStream}
        </Grid>
    )
}

export default PostStream;
