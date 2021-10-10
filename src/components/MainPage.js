import PostStream from "./PostStream";
import { Typography } from "@material-ui/core";

function MainPage() {
  return (
    <div className="MainPage">
      <h1>let's connect with your friends</h1>
      <div>
        <PostStream />
      </div>
    </div>
  );
}

export default MainPage;
