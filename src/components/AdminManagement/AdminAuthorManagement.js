import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Grid, Button } from "@material-ui/core";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Switch from "@mui/material/Switch";
import head1 from "../../static/1.JPG";
import "../font/style.css";

const dummy = [
  {
    id: "123e4567-e89b-12d3-a456-426614174001",
    user_name: "user1",
    github_name: "xichen1",
    type: "author",
    host: "https://i-connect.herokuapp.com/",
    profileImage: "https://i.imgur.com/k7XVwpB.jpeg",
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174002",
    user_name: "user2",
    github_name: "xius666",
    type: "author",
    host: "https://i-connect.herokuapp.com/",
    profileImage: "https://i.imgur.com/k7XVwpB.jpeg",
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174003",
    user_name: "user3",
    github_name: "xichen1",
    type: "author",
    host: "https://i-connect.herokuapp.com/",
    profileImage: "https://i.imgur.com/k7XVwpB.jpeg",
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174004",
    user_name: "user4",
    github_name: "xius666",
    type: "author",
    host: "https://i-connect.herokuapp.com/",
    profileImage: "https://i.imgur.com/k7XVwpB.jpeg",
  },
];

const AdminAuthorManagement = () => {
  const [tab, setTab] = useState(0);
  const [authorList, setAuthorList] = useState([]);
  const handleNavChnge = (e, newValue) => {
    setTab(newValue);
  };
  return (
    <div>
      <div className="text text-1">Current Author List</div>
      <Tabs value={tab} onChange={handleNavChnge} aria-label="nav tabs example">
        <Tab label="current" />
        <Tab label="pending" />
      </Tabs>
      <FormControl component="fieldset" variant="standard">
        <FormLabel component="legend">Assign responsibility</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Switch name="gilad" />}
            label="Gilad Gray"
          />
        </FormGroup>
        <FormHelperText>Be careful</FormHelperText>
      </FormControl>
      {dummy.map((item) => (
        <Grid
          key={item.user_name}
          item
          xs={12}
          justifyContent="flex-start"
          alignItems="flex-start"
          backgroundColor=""
          padding="30px"
          marginLeft={40}
          marginRight={40}
        >
          <Grid
            container
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item>
              <Avatar
                alt={`head1`}
                src={head1}
                sx={{ width: 56, height: 56 }}
              />
            </Grid>

            <Grid item alignContent="space-between" marginRight={2}>
              <Grid item marginLeft={1}>
                <Typography>ID: {item.id}</Typography>
              </Grid>
              <Grid item marginLeft={1}>
                <Typography>Username: {item.user_name}</Typography>
              </Grid>
              <Grid item marginLeft={1}>
                <Typography>GitHub: {item.github_name}</Typography>
              </Grid>
            </Grid>
            <Grid item>
              {tab === 0 ? (
                <HighlightOffIcon
                  sx={{ cursor: "pointer", color: "#b02a2a" }}
                  fontSize="large"
                />
              ) : (
                <div>
                  <HighlightOffIcon
                    sx={{
                      cursor: "pointer",
                      color: "#b02a2a",
                    }}
                    fontSize="large"
                  />
                  <CheckIcon
                    sx={{
                      cursor: "pointer",
                      color: "#039487",
                      marginLeft: "10px",
                    }}
                    fontSize="large"
                  />
                </div>
              )}
            </Grid>
          </Grid>
        </Grid>
      ))}
    </div>
  );
};

export default AdminAuthorManagement;
