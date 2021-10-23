import { Layout } from "./components/Layout";
import MainPage from "./components/MainPage";
import { Route, Switch, Redirect } from "react-router-dom";
import Profile from "./components/Profile";
import Post from "./components/Post";

function App() {
  var loggedIn = false;
  return (
    <header>
      <Route
        exact
        path="/"
        render={() =>
          loggedIn ? <Redirect to="/" /> : <Redirect to="/login" />
        }
      />
      <Layout>
        <Route exact path="/">
          <MainPage></MainPage>
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
