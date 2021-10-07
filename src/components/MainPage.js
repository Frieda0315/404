
import PostStream from "./PostStream";

function MainPage() {
  return (
    <div className="MainPage">
      <h1>let us connect with your friends</h1>
      <h2>{PostStream()}</h2>
    </div>
  );
}

export default MainPage;
