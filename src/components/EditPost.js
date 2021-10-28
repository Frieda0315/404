import React, { StyleSheet, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import noimage from "../static/noimage.png";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import {
  Button,
  Typography,
  CardContent,
  Card,
  CardMedia,
} from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";

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

const EditPost = () => {
  const history = useHistory();
  const location = useLocation();
  
  const [item1, setItem] = React.useState(location.state);
  
  const [image, setImage] = React.useState(null);
  const [preview, setPreview] = React.useState();
  const [value, setValue] = React.useState( () =>{
    if(item1.contentType==null){
      return "text/plain"
    }
    else{
      return "image";
    }
  });
  const [state, setState] = React.useState(item1.state);
  const [title, setTitle] = React.useState(item1.title);
  const [common, setCommon] = React.useState(item1.content);
  const [date, setDate] = React.useState(location.date)
  const userid = localStorage.getItem("current_user_id");
  const baseUrl2 = process.env.REACT_APP_API_ENDPOINT;

  const uploadImage = (files) => {
    //accept = 'image/*';
    const file = files[0];
    if (file) {
      setImage(file);
    } else {
      if (value == "image") {
        setImage(location.state.image);
      } else {
        setImage(noimage);
      }
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
      if (value == "image") {
        setPreview(location.state.image);
      } else {
        setPreview(noimage);
      }
    }
  }, [image]);

  const imageUpload = () => {
    alert("Your file is being uploaded!");
  };

  const submited = async () => {
    if (value == "image") {
      const item2 = {
        title: title,
        image: image,
        author: item1.author,
        date: "xxxx-xx-xx xx:xx",
        id: item1.id,
        contentType: value,
      };
      setItem(item2);
      alert(item2.title);
      history.push({ pathname: "/mypost/", state: item2 });
    }
    if (value == "text/plain") {
      const currentDateTime = Date().toLocaleString();
      setDate(currentDateTime);

    const author = await axios.get(`${baseUrl2}/author/${userid}/`)
    console.log(state)
    const newpost = axios.post(`${baseUrl2}/authors/${userid}/posts/${item1.id}/`,
        { id:item1.id,
          title: title,
        content: common,
        published:date,
        author:author.data,
        visibility:state,
      } 
      )
      console.log(newpost.data)
      history.push({ pathname: "/mypost/" });
    }
  };

  return (
    <Grid container direction="column" justifyContent="center">
      <Grid item alignItems="center">
        <div style={heading}>Edit Post</div>
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
            onChange={(event) => {
              setValue(event.target.value);
            }}
          >
            <FormControlLabel value="image" control={<Radio />} label="Image" />

            <FormControlLabel
              value="text/plain"
              control={<Radio />}
              label="Text"
            />
          </RadioGroup>
        </FormControl>
      </Grid>

      {value == "image" ? (
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
            name="radio-buttons-group"
            onChange={(event) => {
              setState(event.target.value);
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
          Save Post
        </Button>

        <Button
          variant="contained"
          sx={{
            marginInlineStart: "50px",
          }}
          onClick={() => {
            let path = `/mypost`;
            history.push(path);
          }}
        >
          Cancle
        </Button>
      </Grid>
    </Grid>
  );
};

export default EditPost;
