import { Layout } from "./components/Layout";
import MainPage from "./components/MainPage";
import { Route, Switch, Redirect } from "react-router-dom";
import Profile from "./components/Profile";
import Post from "./components/Post";

import MyPostList from "./components/MyPostList"
import EditPost from "./components/EditPost"
import friedaList from "./components/friedaList";


import { useCookies } from "react-cookie";
import { isEmpty } from "lodash";
import Login from "./components/login/Login";
import Signup from "./components/signup/signup";
import { useEffect, useState } from "react";
import ParticlesBg from "particles-bg";


function App() {
  const [cookies, setCookie] = useCookies([]);
  console.log(isEmpty(cookies));
  console.log(window.location.pathname);

  if (window.location.pathname === "/signup") {
    return (
      <header>
        <Route exact path="/signup" component={Signup} />{" "}
        <ParticlesBg type="square" bg={true} />
      </header>
    );
  }
  return (
    <header>
      <Route exact path="/login">
        <Login></Login>
        <ParticlesBg type="square" bg={true} />
      </Route>
      <Route exact path="/signup">
        <Signup></Signup>
        <ParticlesBg type="square" bg={true} />
      </Route>

      <Layout>
        <Route
          exact
          path="/"
          render={() =>
            isEmpty(cookies) ? <Redirect to="/login" /> : <Redirect to="/" />
          }
        ></Route>
        <Route exact path="/">
          <MainPage></MainPage>
        </Route>
        <Route exact path="/profile">
          <Profile is_follow={false}></Profile>
        </Route>
        <Switch>
          <Route path={"/new"} component={Post} exact={true} />
        </Switch>
        <Route 
            path={'/mypost'}
            component={MyPostList}
            exact={true}/>
        <Route 
            path={'/mypost/edit'}
            component={EditPost}
            exact={true}/>
            <Route 
            path={'/friends'}
            component={friedaList}
            exact={true}/>
      </Layout>
      
 
    </header>
  );
}

export default App;
