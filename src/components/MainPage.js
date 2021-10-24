import PostStream from "./PostStream";
import React from "react";
import {
  CardMedia,
  Grid,
  CardActionArea,
  Typography,
  Fab,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { Route, Redirect } from "react-router";
import bg1 from "./assets/bg2.jpeg";
import "./font/style.css";

function MainPage() {
  //const history = useHistory();
  const [creatNew, setCreatNew] = React.useState(false);
  if (creatNew) {
    return <Redirect from="/" to="/new" />;
  }

  return (
    <Grid
      container
      spacing={1}
      justifyContent="center"
      direction="column"
      alignItems="center"
    >
      <Grid item>
        <div className="text text-3">let's connect with your friends</div>
      </Grid>
      <Grid item>
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
      </Grid>
      <Grid item>
        <PostStream />
      </Grid>
    </Grid>
  );
}

export default MainPage;
