import { Layout } from "./components/Layout";
import MainPage from "./components/MainPage";

import { Route } from "react-router-dom";
import Profile from "./components/Profile";
import Post from "./components/Post";
import Comments from "./components/Comment";
import MyPostList from "./components/MyPostList";
import EditPost from "./components/EditPost";
import FriendList from "./components/FriendList";
import Inbox from "./components/Inbox";

import Login from "./components/login/Login";
import Signup from "./components/signup/signup";
import ParticlesBg from "particles-bg";
import NavMenu from "./components/NavMenu";
import AdminLogin from "./components/AdminLogin/AdminLogin";

function App() {
  //const [cookies, setCookie] = useCookies([]);
  //console.log(isEmpty(cookies));
  //console.log(window.location.pathname);
  //const [loggedin, setLoggedIn] = useState(false);
  /*if (window.location.pathname === "/signup") {
    return (
      <header>
        <Route exact path="/signup" component={Signup} />
        <ParticlesBg type="square" bg={true} />
      </header>
    );
  }*/
  return (
    <header>
      <Layout>
        <Route exact path="/login">
          <Login></Login>
          <ParticlesBg type="square" bg={true} />
        </Route>
        <Route exact path="/signup">
          <Signup></Signup>
          <ParticlesBg type="square" bg={true} />
        </Route>
        <Route exact path="/">
          <NavMenu />
          <MainPage></MainPage>
        </Route>

        <Route exact path="/authors/*/posts/*/comments">
          <NavMenu />
          <Comments></Comments>
        </Route>

        <Route exact path="/profile">
          <NavMenu />
          <Profile is_follow={false}></Profile>
        </Route>
        <Route exact path="/new">
          <NavMenu />
          <Post></Post>
        </Route>
        <Route exact path="/mypost">
          <NavMenu />
          <MyPostList></MyPostList>
        </Route>
        <Route exact path="/inbox">
          <NavMenu />
          <Inbox></Inbox>
        </Route>
        <Route exact path="/mypost/edit">
          <NavMenu />
          <EditPost></EditPost>
        </Route>
        <Route exact path="/friends">
          <NavMenu />
          <FriendList></FriendList>
        </Route>
        <Route exact path="/admin/login">
          <AdminLogin />
        </Route>
      </Layout>
    </header>
  );
}

export default App;
