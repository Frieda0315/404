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
import AddIcon from "@mui/icons-material/Add";

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
  const [showImagebox, setshowImagebox] = React.useState(false);
  const [unlisted, setUnlisted] = React.useState(false);
  const [categories, setCategories] = React.useState([]);
  const [category, setCategory] = React.useState([]);
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
        const imagePrefix = reader.result.split("base64,")[0].split(":")[1];
        if (imagePrefix === "image/jpeg;") {
          setFileBase64String(reader.result.split("base64,")[1]);
        } else if (imagePrefix === "image/png;") {
          setFileBase64String(reader.result.split("base64,")[1]);
        } else {
          console.log(imagePrefix);
          // alert("unsupported image");
        }
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
    const currentDateTime = new Date().toISOString();
    const uuid = uuidv4();
    setDate(currentDateTime);
    const author = await axios.get(`${baseUrl2}/author/${userid}/`, {
      auth: {
        username: "admin",
        password: "admin",
      },
    });
    if (title === "") {
      alert("Empty field is not allowed ^^");
      return;
    }
    if (categories.length === 0) {
      alert("Categories cannot be empty ^^");
      return;
    }
    const postId = baseUrl2 + "/author/" + authorID + "/posts/" + uuid;
    const emptyComment = {
      type: "comments",
      page: 1,
      size: 5,
      post: postId,
      id: postId,
      comments: [],
    };
    const postTemplate = {
      type: "post",
      id: postId,
      title: title,
      source: "https://i-connect.herokuapp.com/",
      origin: "https://i-connect.herokuapp.com/",
      description: `${author.data.displayName} creates a new post "${title}"`,
      contentType: textChoice,
      author: author.data,
      categories: categories,
      count: 0,
      comments: postId,
      commentsSrc: emptyComment,
      published: currentDateTime,
      visibility: visibility,
      unlisted: unlisted,
    };
    if (textChoice === "text/plain" || textChoice === "text/markdown") {
      if (common === "") {
        alert("Content field is empty!");
        return;
      }
      postTemplate.content = common;
    } else {
      if (fileBase64String === "") {
        alert("Image field is empty!");
        return;
      }
      postTemplate.content = fileBase64String;
    }
    const newPost = await axios.put(`${postId}/`, postTemplate, {
      auth: {
        username: "admin",
        password: "admin",
      },
    });
    console.log(newPost.data);
    history.push({ pathname: "/" });
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
              onChange={(e) => {
                if (
                  e.target.value === "image/png;base64" ||
                  e.target.value === "image/jpeg;base64"
                ) {
                  setshowImagebox(true);
                  setCommon("");
                } else {
                  setshowImagebox(false);
                  setFileBase64String("");
                  setImage(null);
                }
                setTextChoice(e.target.value);
              }}
            >
              <MenuItem value={"text/plain"}>text/plain</MenuItem>
              <MenuItem value={"text/markdown"}>text/markdown</MenuItem>
              <MenuItem value={"image/png;base64"}>image/png</MenuItem>
              <MenuItem value={"image/jpeg;base64"}>image/jpeg</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {showImagebox ? (
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
              {/* <Button
                variant="contained"
                color="success"
                sx={{ marginInlineStart: "5px" }}
                onClick={() => {
                  imageUpload();
                }}
              >
                Upload
              </Button> */}
            </Grid>
            <Card sx={{ maxWidth: 200, maxHeight: 200 }}>
              <img style={images} src={preview} />
            </Card>
          </Grid>
        </CardContent>
      ) : (
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
      )}

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
        <FormControl component="fieldset">
          <FormLabel
            component="legend"
            sx={{
              marginInlineStart: "5px",
            }}
          >
            Unlisted?
          </FormLabel>
          <RadioGroup
            aria-label="unlisted?"
            defaultValue="false"
            name="radio-buttons-group"
            onChange={(event) => {
              setUnlisted(event.target.value);
            }}
          >
            <FormControlLabel
              value={false}
              sx={{
                marginInlineStart: "5px",
              }}
              control={<Radio />}
              label="false"
            />
            <FormControlLabel
              value={true}
              sx={{
                marginInlineStart: "5px",
              }}
              control={<Radio />}
              label="true"
            />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid
        container
        alignItems="center"
        style={{
          marginTop: 5,
          marginBottom: 20,
          marginLeft: 5,
        }}
      >
        <div>
          {categories.map((c) => {
            return <span>{c}, </span>;
          })}
        </div>

        <TextField
          style={{
            marginTop: 5,
            marginBottom: 20,
            width: "10%",
            marginLeft: 5,
          }}
          id="addTitle"
          label="category"
          variant="filled"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        />
        <AddIcon
          sx={{ fontSize: 40 }}
          cursor="pointer"
          onClick={(e) => {
            if (category !== "") {
              let newCategories = categories;
              newCategories.push(category);
              setCategories(newCategories);
              setCategory("");
            }
          }}
        />
      </Grid>

      <Grid item style={{ marginBottom: 20 }}>
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
