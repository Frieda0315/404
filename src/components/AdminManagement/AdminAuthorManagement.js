import { useState, useEffect } from "react";
import AdminAuthorList from "./AdminAuthorList";
import { Grid } from "@material-ui/core";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import "../font/style.css";
import axios from "axios";

const AdminAuthorManagement = () => {
  const [tab, setTab] = useState(0);
  const [currentAuthorList, setCurrentAuthorList] = useState([]);
  const [pendingAuthorList, setPendingAuthorList] = useState([]);
  const [pendingSwitch, setPendingSwitch] = useState(true);

  const baseUrl = process.env.REACT_APP_API_ENDPOINT;

  const handlePending = async () => {
    await axios.put(
      `${baseUrl}/admin/approveoption/`,
      {
        approve_option: !pendingSwitch,
      },
      {
        auth: {
          username: "admin",
          password: "admin",
        },
      }
    );
    setPendingSwitch(!pendingSwitch);
  };

  const getAuthors = async () => {
    const pendingAuthors = await axios.get(`${baseUrl}/authors/pendinglist/`, {
      auth: {
        username: "admin",
        password: "admin",
      },
    });
    setPendingAuthorList(pendingAuthors.data);

    const currentAuthors = await axios.get(`${baseUrl}/authors/currentlist/`, {
      auth: {
        username: "admin",
        password: "admin",
      },
    });
    setCurrentAuthorList(currentAuthors.data);
  };

  useEffect(async () => {
    const pending = await axios.get(`${baseUrl}/admin/approveoption/`, {
      auth: {
        username: "admin",
        password: "admin",
      },
    });
    setPendingSwitch(pending.data.approve_option);

    await getAuthors();
  }, []);

  const deleteAuthor = async (e, authorId) => {
    await axios.delete(`${baseUrl}/author/${authorId}`, {
      auth: {
        username: "admin",
        password: "admin",
      },
    });

    await getAuthors();
  };

  const acceptPending = async (e, authorId) => {
    await axios.post(
      `${baseUrl}/authors/pendinglist/`,
      {
        id: authorId,
        action: "approve",
      },
      {
        auth: {
          username: "admin",
          password: "admin",
        },
      }
    );

    await getAuthors();
  };

  const handleNavChnge = (e, newValue) => {
    setTab(newValue);
  };
  return (
    <div>
      <div className="text text-1">Current Author List</div>
      <Grid container direction="row" justifyContent="flex-start">
        <Grid item xs={2} paddingLeft={2.5}>
          <Tabs
            value={tab}
            onChange={handleNavChnge}
            aria-label="nav tabs example"
            style={{ marginBottom: "50px" }}
          >
            <Tab label="current" />
            <Tab label="pending" />
          </Tabs>
          <FormControl component="fieldset" variant="standard">
            <FormLabel>Pending Feature Switch</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    name="switch"
                    checked={pendingSwitch}
                    onChange={handlePending}
                  />
                }
                label={pendingSwitch ? "ON" : "OFF"}
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={10}>
          {tab === 0 ? (
            <AdminAuthorList
              authors={currentAuthorList}
              authorType="pending"
              acceptPending={acceptPending}
              deleteAuthor={deleteAuthor}
            />
          ) : (
            <AdminAuthorList
              authors={pendingAuthorList}
              authorType="current"
              acceptPending={acceptPending}
              deleteAuthor={deleteAuthor}
            />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminAuthorManagement;
