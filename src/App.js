import { Layout } from "./components/Layout";
import MainPage from "./components/MainPage";
import { Route,Switch } from "react-router-dom";
import Profile from "./components/Profile";
import Post from "./components/Post";
import MyPostList from "./components/MyPostList"
import EditPost from "./components/EditPost"



function App() {
  return (
    <header>
      <Layout>
        <Route exact path="/">
          <MainPage></MainPage>
        </Route>
        <Route exact path="/profile/" >
          <Profile is_follow={false}></Profile>
        </Route>
        <Switch>
          <Route 
            path={'/new/'}
            component={Post}
            exact={true}/>
        </Switch>
        <Route 
            path={'/mypost/'}
            component={MyPostList}
            exact={true}/>
        <Route 
            path={'/mypost/edit'}
            component={EditPost}
            exact={true}/>
      </Layout>
      
 
    </header>
  );
}

export default App;

