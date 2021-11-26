import { Typography } from "@mui/material";
import "./font/style.css";

const SourceTag = ({ host }) => {
  if (host === "https://i-connect.herokuapp.com") {
    return <Typography className="tag-format public-tag">Local</Typography>;
  } else {
    return (
      <div>
        <Typography className="tag-format private-tag">Remote</Typography>
      </div>
    );
  }
};

export default SourceTag;
