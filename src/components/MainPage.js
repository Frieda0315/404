import PostStream from "./PostStream";
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom"
import Stack from '@mui/material/Stack';

function MainPage() {
  const history = useHistory();
  return (
    <div className="MainPage">
      <h1>let's connect with your friends</h1>

      <Stack direction="row" spacing={2} justifyContent = 'flex-end'>
      <Button
          sx={{   
            marginRight : '350px',
            }}
          variant="contained" 
          onClick={() => {
            let path = `/new/`; history.push(path);}}>
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
