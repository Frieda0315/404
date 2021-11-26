import React from "react";
import { Typography } from "@material-ui/core";
import { Grid } from "@mui/material";
import "./font/style.css";
import ReactMarkdown from "react-markdown";

const PostItemInList = ({ post }) => {
  if (post.contentType === "text/plain") {
    return (
      <Grid container style={{ marginLeft: "48px" }}>
        <Grid item xs>
          <Typography variant="body1" color="text.secondary">
            {post.content}
          </Typography>
        </Grid>
      </Grid>
    );
  } else if (post.contentType === "text/markdown") {
    return (
      <Grid container style={{ marginLeft: "48px" }}>
        <Grid item xs>
          <ReactMarkdown className="markdown-container">
            {post.content}
          </ReactMarkdown>
        </Grid>
      </Grid>
    );
  } else if (
    post.contentType === "image/png;base64" ||
    post.contentType === "image/jpeg;base64"
  ) {
    if (post.content.startsWith("data:")) {
      return (
        <Grid container style={{ marginLeft: "48px" }}>
          <Grid item xs>
            <Typography variant="body1" color="text.secondary">
              Image ID: {post.id}
            </Typography>
            <img style={{ maxWidth: "75%" }} src={post.content} />
          </Grid>
        </Grid>
      );
    }
    return (
      <Grid container style={{ marginLeft: "48px" }}>
        <Grid item xs>
          <Typography variant="body1" color="text.secondary">
            Image ID: {post.id}
          </Typography>
          <img
            style={{ maxWidth: "75%" }}
            src={`data:${post.contentType},${post.content}`}
          />
        </Grid>
      </Grid>
    );
  } else {
    return <div>Unsupported Type</div>;
  }
};

export default PostItemInList;
