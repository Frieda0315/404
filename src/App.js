import { Layout } from "./components/Layout";
import MainPage from "./components/MainPage";
import { Route, Switch } from "react-router-dom";
import Profile from "./components/Profile";
import Post from "./components/Post";
import Comments from "./components/Comment";

function App() {
  return (
    <header>
      <Layout>
        <Route exact path="/">
          <MainPage></MainPage>
        </Route>
        <Route exact path="/posts/*/comments">
          <Comments></Comments>
        </Route>
        <Route exact path="/profile/">
          <Profile is_follow={false}></Profile>
        </Route>
        <Switch>
          <Route path={"/new/"} component={Post} exact={true} />
        </Switch>
      </Layout>
    </header>
  );
}

export default App;
