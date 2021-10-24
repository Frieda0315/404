import { Layout } from "./components/Layout";
import MainPage from "./components/MainPage";
import { Route, Switch, Redirect } from "react-router-dom";
import Profile from "./components/Profile";
import Post from "./components/Post";
import { useCookies } from "react-cookie";
import { isEmpty } from "lodash";
import Login from "./components/login/Login";
import signup from "./components/signup/signup";
import { useState } from "react";
function App() {
  const [cookies, setCookie] = useCookies([]);
  const [isSignup, setIsSignup] = useState(false);

  console.log(isEmpty(cookies));
  console.log(window.location.pathname);
  console.log(isSignup);
  if (window.location.pathname === "/signup") {
    setIsSignup(true);
  } else if (window.location.pathname === "/signin") {
    setIsSignup(false);
  }
  return (
    <header>
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={signup} />
      <Layout>
        <Route
          exact
          path="/"
          render={() =>
            isEmpty(cookies) && !isSignup ? (
              <Redirect to="/login/" />
            ) : (
              <Redirect to="/" />
            )
          }
        ></Route>
        <Route exact path="/">
          <MainPage></MainPage>
        </Route>
        <Route exact path="/profile/">
          <Profile is_follow={false}></Profile>
        </Route>
        <Switch>
          <Route path={"/new"} component={Post} exact={true} />
        </Switch>
      </Layout>
    </header>
  );
}

export default App;
