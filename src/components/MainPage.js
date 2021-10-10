import PostStream from "./PostStream";
import { Typography } from "@material-ui/core";

function MainPage() {
  return (
    <div className="MainPage">
      <Typography variant="h1">let's connect with your friends</Typography>
      <div>
        <PostStream />
      </div>
    </div>
  );
}

export default MainPage;
