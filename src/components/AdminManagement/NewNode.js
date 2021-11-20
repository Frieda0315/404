import { useState } from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Grid } from "@material-ui/core";
import axios from "axios";

const NewNode = () => {
  const [uri, setUri] = useState("");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const baseUrl = process.env.REACT_APP_API_ENDPOINT;

  const submitted = async () => {
    if (uri !== "" && user !== "" && pass !== "") {
      await axios
        .post(
          `${baseUrl}/admin/nodes/`,
          {
            url: uri,
            user_name: user,
            password: pass,
            // published: date,
            // author: author.data,
            // visibility: visibility,
          },
          {
            auth: {
              username: "admin",
              password: "admin",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
        });
      window.location = "/admin/mainpage";
    } else {
      alert("Empty input");
    }

    //history.push({ pathname: "/" });
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item alignItems="center">
        <div className="text text-3">Create A New Node</div>
      </Grid>

      <Grid item alignItems="center" sx={{ width: 470 }}>
        <TextField
          style={{
            marginTop: 5,
            marginBottom: 15,
            width: "100%",
            // marginLeft: 5,
          }}
          id="addUri"
          label="Uri"
          variant="filled"
          value={uri}
          onChange={(e) => setUri(e.target.value)}
        />
      </Grid>
      <Grid item alignItems="center" sx={{ width: 470 }}>
        <TextField
          style={{
            marginTop: 5,
            marginBottom: 15,
            width: "100%",
          }}
          id="addUser"
          label="User"
          variant="filled"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
      </Grid>
      <Grid item alignItems="center" sx={{ width: 470 }}>
        <TextField
          style={{
            marginTop: 5,
            marginBottom: 35,
            width: "100%",
          }}
          id="addPass"
          label="Pass"
          variant="filled"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="success"
          sx={{ marginInlineStart: "5px" }}
          onClick={(event) => {
            submitted(event.target);
          }}
        >
          Create
        </Button>

        <Button
          variant="contained"
          color="error"
          sx={{
            marginInlineStart: "50px",
          }}
          onClick={() => {
            window.location = "/admin/mainpage";
            // let path = `/`;
            // history.push(path);
          }}
        >
          Cancel
        </Button>
      </Grid>
    </Grid>
  );
};

export default NewNode;
