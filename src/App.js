import { Layout } from "./components/Layout";
import MainPage from "./components/MainPage";
import { Route } from "react-router-dom";
import Profile from "./components/Profile";
import Post from "./components/Post"
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom"
import Box from '@mui/material/Box';


function App() {
  const history = useHistory();

  return (
    <header>
      <Layout>
        <Route exact path="/">
          <MainPage></MainPage>
        </Route>
        <Route exact path="/profile/">
          <Profile is_follow={false}></Profile>
        </Route>
        <Route exact path="/new/">
          <Post></Post>
        </Route>
        <Box
            sx={{p: 1,    bgcolor:  '#e0e0e0'}}>

              <Button 
              sx={{
                p: 1,    
                textAlign: 'end'
                }}
              variant="contained" 
               onClick={() => {
                        let path = `/new/`; 
                  history.push(path);
                  }}>
                New
              </Button>
        </Box>
      </Layout>
    </header>
  );
}

export default App;

