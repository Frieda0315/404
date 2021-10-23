import PostStream from "./PostStream";
import React from "react";
import { CardMedia, CardActionArea, Typography, Fab } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { Route, Redirect } from "react-router";

function MainPage() {
  //const history = useHistory();
  const [creatNew, setCreatNew] = React.useState(false);
  if (creatNew) {
    return <Redirect from="/" to="/new" />;
  }

  return (
    <div>
      <h1 className="text-center">let's connect with your friends</h1>

      <Stack
        direction="column"
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <Fab color="primary" aria-label="add">
          <Add
            onClick={() => {
              setCreatNew(true);
            }}
          />
        </Fab>
      </Stack>
      <PostStream />
    </div>
  );
}

export default MainPage;
