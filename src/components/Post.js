import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import noimage from "../static/noimage.png";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Button, Typography, CardContent, Card } from "@mui/material";
import { useHistory } from "react-router-dom";
import "./font/style.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

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

  const [image, setImage] = React.useState(null);
  const [preview, setPreview] = React.useState();
  const [value, setValue] = React.useState("Text");
  const [title, setTitle] = React.useState(null);
  const [common, setCommon] = React.useState(null);
  const [date, setDate] = React.useState(location.date);
  const [visibility, setVisibility] = React.useState("PUBLIC");

  const baseUrl2 = process.env.REACT_APP_API_ENDPOINT;
  const uploadImage = (files) => {
    //accept = 'image/*';
    const file = files[0];
    if (file) {
      setImage(file);
    } else {
      setImage(noimage);
    }
  };

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(noimage);
    }
  }, [image]);

  const imageUpload = () => {
    alert("Your file is being uploaded!");
  };

  const submited = async () => {
    const authorID = localStorage.getItem("current_user_id");

    if (value == "Image") {
      alert("image");
    }
    if (value == "Text") {
      const currentDateTime = Date().toLocaleString();
      setDate(currentDateTime);

      const author = await axios.get(`${baseUrl2}/author/${userid}/`);
      const uuid = uuidv4();
      const newpost = await axios.put(
        `${baseUrl2}/authors/${userid}/posts/${uuid}/`,
        {
          type: "post",
          id: uuid,
          title: title,
          content: common,
          published: date,
          author: author.data,
          visibility: visibility,
        }
      );
      console.log(newpost.data);
      history.push({ pathname: "/mypost/" });
    }
  };

  const history = useHistory();

  return (
    <Grid container direction="column" justifyContent="center">
      <Grid item alignItems="center">
        <div class="text text-3">Create A New Post</div>
      </Grid>

      <Grid
        item
        //bgcolor = '#eeeeee'
        alignItems="flex-start"
      >
        <TextField
          style={{ marginTop: 5, marginBottom: 5, width: "50%", marginLeft: 5 }}
          id="addTitle"
          label="title"
          variant="filled"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Grid>

      <Grid item alignItems="flex-start">
        <Typography variant="body1" color="text.secondary">
          Post an Image or Plain text
        </Typography>

        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="gender"
            name="row-radio-buttons-group"
            value={value}
            defaultValue="Text"
            onChange={(event) => {
              setValue(event.target.value);
            }}
          >
            <FormControlLabel value="Image" control={<Radio />} label="Image" />

            <FormControlLabel value="Text" control={<Radio />} label="Text" />
          </RadioGroup>
        </FormControl>
      </Grid>

      {value == "Image" ? (
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
      ) : (
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
      </Grid>

      <Grid
        item
        direction="row"
        //bgcolor = '#e0e0e0'
      >
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
