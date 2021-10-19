import PostStream from "./PostStream";
import React from 'react';
import { CardMedia, CardActionArea, Typography } from "@material-ui/core";
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom"
import Stack from '@mui/material/Stack';
import { Route, Redirect } from 'react-router'

function MainPage() {
  //const history = useHistory();
  const [creatNew, setCreatNew] = React.useState(false);
  if(creatNew){
    return <Redirect from = '/' to='/new' />
  }

  return (
 
    <div className="MainPage">
      <Typography variant="h1">let's connect with your friends</Typography>

      <Stack direction="row" spacing={2} justifyContent = 'flex-end'>
      <Button
          sx={{
            marginRight : '140px',
            }}
          variant="contained"
          onClick={() => {
           setCreatNew(true);
          }}>
          New
        </Button>

    </Stack>

      <div>
        <PostStream />
      </div>

    </div>
  );
}

export default MainPage;
