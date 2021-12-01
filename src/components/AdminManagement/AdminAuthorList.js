import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Grid } from "@material-ui/core";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckIcon from "@mui/icons-material/Check";
import head1 from "../../static/1.JPG";
import "../font/style.css";
import { CardMedia } from "@mui/material";

const AdminAuthorList = ({
  authors,
  authorType,
  acceptPending,
  deleteAuthor,
}) => {
  return authors.map((author) => (
    <Grid
      key={author.displayName}
      item
      justifyContent="flex-start"
      alignItems="flex-start"
      backgroundColor=""
      padding="30px"
    >
      <Grid
        container
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="center"
      >
        <Grid item>
          <Avatar
            alt={`head1`}
            src={author.profileImage}
            sx={{ width: 56, height: 56 }}
          />
        </Grid>

        <Grid item alignContent="space-between" marginRight={2}>
          <Grid item marginLeft={1}>
            <Typography>ID: {author.id}</Typography>
          </Grid>
          <Grid item marginLeft={1}>
            <Typography>Username: {author.displayName}</Typography>
          </Grid>
          <Grid item marginLeft={1}>
            <Typography>GitHub: {author.github}</Typography>
          </Grid>
        </Grid>
        <Grid item>
          {authorType === "pending" ? (
            <HighlightOffIcon
              sx={{ cursor: "pointer", color: "#b02a2a" }}
              fontSize="large"
              onClick={(e) => deleteAuthor(e, author.id)}
            />
          ) : (
            <div>
              <HighlightOffIcon
                sx={{
                  cursor: "pointer",
                  color: "#b02a2a",
                }}
                fontSize="large"
                onClick={(e) => deleteAuthor(e, author.id)}
              />
              <CheckIcon
                sx={{
                  cursor: "pointer",
                  color: "#039487",
                  marginLeft: "10px",
                }}
                fontSize="large"
                onClick={(e) => acceptPending(e, author.id)}
              />
            </div>
          )}
        </Grid>
      </Grid>
    </Grid>
  ));
};

export default AdminAuthorList;
