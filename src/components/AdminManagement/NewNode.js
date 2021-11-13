import { useState } from "react";
import Stack from "@mui/material/Stack";
import { Button, Typography, CardContent, Card } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Grid } from "@material-ui/core";

const NewNode = () => {
  const [uri, setUri] = useState("");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item alignItems="center">
        <div class="text text-3">Create A New Node</div>
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
          onChange={(e) => setUri(e.target.value)}
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
          onChange={(e) => setUri(e.target.value)}
        />
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="palette.primary.main"
          sx={{ marginInlineStart: "5px" }}
          onClick={(event) => {
            alert("submit");
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
            alert("cancel");
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
