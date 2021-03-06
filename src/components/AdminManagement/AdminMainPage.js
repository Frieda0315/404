/*
    Material UI Table reference: https://mui.com/components/tables/#api
*/
import { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import MuiTableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import withStyles from "@material-ui/styles/withStyles";
import { Grid, Fab } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import Stack from "@mui/material/Stack";
import axios from "axios";

import "../font/style.css";

const AdminMainPage = () => {
  const baseUrl = process.env.REACT_APP_API_ENDPOINT;
  const [nodeList, setNodeList] = useState([]);
  useEffect(() => {
    async function fetchNode() {
      await axios
        .get(`${baseUrl}/admin/nodes/`, {
          auth: {
            username: "admin",
            password: "admin",
          },
        })
        .then((res) => {
          console.log(res.data);
          setNodeList(res.data);
        });
    }
    fetchNode();
  }, []);
  const TableCell = withStyles({
    root: {
      borderBottom: "none",
    },
  })(MuiTableCell);

  const [creatNew, setCreatNew] = useState(false);
  if (creatNew) {
    window.location = "/admin/newnode";
  }

  const deleteNode = async (node) => {
    await axios.delete(`${baseUrl}/admin/node/`, {
      auth: {
        username: "admin",
        password: "admin",
      },
      data: node,
    });

    setNodeList(nodeList.filter((n) => n !== node));
  };

  return (
    <div>
      <div class="text text-1">Node List</div>
      <Grid
        container
        spacing={1}
        justifyContent="center"
        direction="column"
        alignItems="center"
      >
        <Grid item></Grid>
        <Stack
          direction="column"
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <Fab color="primary" aria-label="add">
            <Add
              onClick={(e) => {
                setCreatNew(true);
              }}
            />
          </Fab>
        </Stack>
      </Grid>

      <TableContainer>
        <Table
          sx={{ maxWidth: "70%", margin: "auto" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h5">Node Uri</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h5">Username</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h5">Password</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h5">Delete</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {nodeList.map((node) => (
              <TableRow
                key={node.url}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                hover
              >
                <TableCell component="th" scope="row">
                  <Typography variant="h6">{node.url}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">{node.user_name}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">{node.password}</Typography>
                </TableCell>
                <TableCell align="center">
                  <HighlightOffIcon
                    sx={{ cursor: "pointer", color: "#b02a2a" }}
                    fontSize="large"
                    onClick={() => deleteNode(node)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminMainPage;
