import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import noimage from "../static/noimage.png";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { Button, Typography, CardContent, Card } from "@mui/material";
import { useHistory } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import "./font/style.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const heading = {
  fontSize: "30px",
  color: "black",
  fontWeight: "bold",
};
const images = {
  marginBottom: "15px",
  height: "200px",
  width: "200px",
};

const pic = {
  maxHeight: 400,
  maxWidth: 300,
  marginBottom: "30px",
  borderRadius: "50%",
};

const Post = () => {
  const location = useLocation();
  const userid = localStorage.getItem("current_user_id");

  const [image, setImage] = React.useState("");
  const [preview, setPreview] = React.useState();
  const [title, setTitle] = React.useState("");
  const [common, setCommon] = React.useState("");
  const [fileBase64String, setFileBase64String] = React.useState("");
  const [decode, setDecode] = React.useState();
  const [isImage, setIsImage] = React.useState(false);
  const [date, setDate] = React.useState(location.date);
  const [visibility, setVisibility] = React.useState("PUBLIC");
  const [textChoice, setTextChoice] = React.useState("text/plain");
  const baseUrl2 = process.env.REACT_APP_API_ENDPOINT;

  const uploadImage = (files) => {
    //accept = 'image/*';
    const file = files[0];
    if (file) {
      setImage(file);
      encodeFileBase64(image);
    } else {
      setImage(noimage);
    }
  };

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        encodeFileBase64(image);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(noimage);
    }
  }, [image]);

  const encodeFileBase64 = (file) => {
    var reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFileBase64String(reader.result);
      };
    }
  };

  const decodeBase64File = (base64String) => {
    return decodeURIComponent(
      atob(base64String)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
  };

  const imageUpload = () => {
    encodeFileBase64(image);
    console.log(fileBase64String);
    setPreview(fileBase64String);
  };
  const handleDropDownChange = (event) => {
    setTextChoice(event.target.value);
  };

  const handleCheckBoxChange = (e) => {
    setIsImage(!isImage);
  };

  const submited = async () => {
    const authorID = localStorage.getItem("current_user_id");
    const currentDateTime = Date().toLocaleString();
    const uuid = uuidv4();
    setDate(currentDateTime);
    const author = await axios.get(`${baseUrl2}/author/${userid}/`, {
      auth: {
        username: "admin",
        password: "admin",
      },
    });

    if (textChoice === "text/plain") {
      if (isImage === true) {
        const newpost = await axios.put(
          `${baseUrl2}/authors/${userid}/posts/${uuid}/`,
          {
            type: "post",
            id: uuid,
            title: title,
            contentType: textChoice,
            content: common,
            // image: fileBase64String,
            published: date,
            author: author.data,
            visibility: visibility,
          },
          {
            auth: {
              username: "admin",
              password: "admin",
            },
          }
        );
        history.push({ pathname: "/" });
      } else {
        const newpost = await axios.put(
          `${baseUrl2}/authors/${userid}/posts/${uuid}/`,
          {
            type: "post",
            id: uuid,
            title: title,
            contentType: textChoice,
            content: common,
            published: date,
            author: author.data,
            visibility: visibility,
          },
          {
            auth: {
              username: "admin",
              password: "admin",
            },
          }
        );
        history.push({ pathname: "/" });
      }
    } else if (textChoice === "text/markdown") {
      const newpost = await axios.put(
        `${baseUrl2}/authors/${userid}/posts/${uuid}/`,
        {
          type: "post",
          id: uuid,
          title: title,
          contentType: textChoice,
          content: common,
          // image: fileBase64String,
          published: date,
          author: author.data,
          visibility: visibility,
        },
        {
          auth: {
            username: "admin",
            password: "admin",
          },
        }
      );
      history.push({ pathname: "/" });
    } else if (common === "") {
      const newpost = await axios.put(
        `${baseUrl2}/authors/${userid}/posts/${uuid}/`,
        {
          type: "post",
          id: uuid,
          title: title,
          contentType: "image",
          content: fileBase64String,
          published: date,
          author: author.data,
          visibility: visibility,
        },
        {
          auth: {
            username: "admin",
            password: "admin",
          },
        }
      );
      history.push({ pathname: "/" });
    }

    // if (common === "") {
    //   const author = await axios.get(`${baseUrl2}/author/${userid}/`, {
    //     auth: {
    //       username: "admin",
    //       password: "admin",
    //     },
    //   });
    //   const uuid = uuidv4();
    //   const newpost = await axios.put(
    //     `${baseUrl2}/authors/${userid}/posts/${uuid}/`,
    //     {
    //       type: "post",
    //       id: uuid,
    //       title: title,

    //       image: fileBase64String,
    //       published: date,
    //       author: author.data,
    //       visibility: visibility,
    //     },
    //     {
    //       auth: {
    //         username: "admin",
    //         password: "admin",
    //       },
    //     }
    //   );
    //   history.push({ pathname: "/" });
    // } else if (true) {
    //   const author = await axios.get(`${baseUrl2}/author/${userid}/`, {
    //     auth: {
    //       username: "admin",
    //       password: "admin",
    //     },
    //   });
    //   const uuid = uuidv4();
    //   const newpost = await axios.put(
    //     `${baseUrl2}/authors/${userid}/posts/${uuid}/`,
    //     {
    //       type: "post",
    //       id: uuid,
    //       title: title,
    //       content: common,
    //       image: "",
    //       published: date,
    //       author: author.data,
    //       visibility: visibility,
    //     },
    //     {
    //       auth: {
    //         username: "admin",
    //         password: "admin",
    //       },
    //     }
    //   );
    //   history.push({ pathname: "/" });
    // } else {
    // }
  };

  const history = useHistory();

  return (
    <Grid container direction="column" justifyContent="center">
      <Grid item alignItems="center">
        <div class="text text-3">Create A New Post</div>
      </Grid>

      <Grid item alignItems="flex-start">
        <TextField
          style={{ marginTop: 5, marginBottom: 5, width: "50%", marginLeft: 5 }}
          id="addTitle"
          label="title"
          variant="filled"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Grid>

      <Grid container alignItems="flex-start" direction="row">
        <Grid item>
          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={textChoice}
              label="Input Type"
              autoWidth
              onChange={(e) => setTextChoice(e.target.value)}
            >
              <MenuItem value={"text/plain"}>text/plain</MenuItem>

              <MenuItem value={"text/markdown"}>text/markdown</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <FormControlLabel
              control={<Checkbox />}
              label="Image"
              onChange={(e) => handleCheckBoxChange(e)}
            />{" "}
          </FormControl>
        </Grid>
      </Grid>

      <Grid item>
        <TextField
          style={{
            marginTop: 5,
            marginBottom: 5,
            width: "90%",
            height: "90%",
            marginLeft: 5,
          }}
          id="addDescription"
          label="add description"
          variant="filled"
          multiline
          rows={10}
          value={common}
          onChange={(e) => setCommon(e.target.value)}
        />
      </Grid>
      {isImage ? (
        <CardContent>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  uploadImage(event.target.files);
                }}
              />
              <Button
                variant="contained"
                color="success"
                sx={{ marginInlineStart: "5px" }}
                onClick={() => {
                  imageUpload();
                }}
              >
                Upload
              </Button>
            </Grid>
            <Card sx={{ maxWidth: 200, maxHeight: 200 }}>
              <img style={images} src={preview} />
            </Card>
          </Grid>
        </CardContent>
      ) : null}

      <Grid item alignItems="flex-start">
        <FormControl component="fieldset">
          <FormLabel
            component="legend"
            sx={{
              marginInlineStart: "5px",
            }}
          >
            State
          </FormLabel>
          <RadioGroup
            aria-label="private?"
            defaultValue="PUBLIC"
            name="radio-buttons-group"
            onChange={(event) => {
              setVisibility(event.target.value);
            }}
          >
            <FormControlLabel
              value="PUBLIC"
              sx={{
                marginInlineStart: "5px",
              }}
              control={<Radio />}
              label="Public"
            />
            <FormControlLabel
              value="PRIVATE"
              sx={{
                marginInlineStart: "5px",
              }}
              control={<Radio />}
              label="Private"
            />
            <FormControlLabel
              value="FRIENDS"
              sx={{
                marginInlineStart: "5px",
              }}
              control={<Radio />}
              label="Friend Only"
            />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item>
        <Button
          variant="contained"
          color="success"
          sx={{ marginInlineStart: "5px" }}
          onClick={(event) => {
            submited(event.target);
          }}
        >
          Create Post
        </Button>

        <Button
          variant="contained"
          sx={{
            marginInlineStart: "50px",
          }}
          onClick={() => {
            let path = `/`;
            history.push(path);
          }}
        >
          Cancel
        </Button>
      </Grid>
    </Grid>
  );
};

export default Post;
