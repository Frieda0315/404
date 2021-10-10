import { Layout } from "./components/Layout";
import MainPage from "./components/MainPage";
import { Route } from "react-router-dom";
import Profile from "./components/Profile";
import Post from "./components/Post"



function App() {
  

  return (
    <header>
      <Layout>
        <Route exact path="/">
          <MainPage></MainPage>
        </Route>
        <Route exact path="/profile/">
          <Profile></Profile>
        </Route>
        <Route exact path="/new/">
          <Post></Post>
        </Route>
      </Layout>
    </header>
  );
}

export default App;

