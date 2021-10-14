
import React, { Component,StyleSheet } from 'react';
import TextField from '@mui/material/TextField';

import { bgcolor, height } from '@mui/system';
import Grid from "@mui/material/Grid";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Button,Typography,CardContent, } from '@mui/material';
import { useHistory } from "react-router-dom";
import { Axios } from 'axios';

const heading = {
    fontSize: '30px',
    color: 'black',
    fontWeight: 'bold',
    
}

const Post = () => {

const uploadImage = (files) => {
    console.log(files[0]);
  };


  const [value, setValue] = React.useState('Image');

  const ImageOrText = (event) => {
    setValue(event.target.value);
  };

//const [isEdit, setIsEdit] = useState(false);

const imageUpload = () =>{}

    const history = useHistory();

    return (
       
            <Grid
                container
                direction="column"
                justifyContent="center"
                    >
                <Grid item
                    alignItems ='center'>   
                    <div style = {heading}>Create A New Post</div>
                </Grid>

                <Grid item  
                    //bgcolor = '#eeeeee'
                    alignItems = 'flex-start'>
                    <TextField
                        style={{ marginTop: 5 ,
                        marginBottom: 5,
                        width: '50%',
                        marginLeft: 5 }}
                        id="addTitle"
                        label="title"
                        variant="filled"/>
                </Grid>

                <Grid item
                    alignItems = 'flex-start'>
                    <Typography variant="body1" color="text.secondary">
                          Post an Image or Plain text
                    </Typography>

                    <FormControl component="fieldset">
                        <RadioGroup row aria-label="gender" name="row-radio-buttons-group"
                                value={value}
                                onChange={ImageOrText}>
                            <FormControlLabel value="Image" control={<Radio /> } label="Image" />
                            <FormControlLabel value="Text" control={<Radio />} label="Text" />
                        </RadioGroup>
                    </FormControl>
                </Grid>

                {value == "Image" ?(
                    <CardContent>
                        <Grid container>
                            <Grid item>
                                <input type='file'  onChange = {(event) => {uploadImage(event.target.files)}} />
                                <button >upload</button>
                            </Grid>

                         </Grid>
                    </CardContent>
                ):(
        
            <TextField
                style={{ marginTop: 5 ,
                marginBottom: 5,
                width: '90%',
                height: '90%',
                marginLeft: 5 }}
                id="addDescription"
                label="add description"
                variant="filled"
                multiline
                rows={10}
                //onChange = {this.handleCommon} 
                    />   
                )}      
                  

                <Grid  item
                    alignItems = 'flex-start'>   
                        
                    <FormControl component="fieldset">
                    <FormLabel component="legend"
                                sx={{   
                                    marginInlineStart : '5px',
                                    }}
                        >State</FormLabel>
                    <RadioGroup
                        aria-label="private?"
                        defaultValue="public"
                        name="radio-buttons-group">
                    <FormControlLabel value="public" 
                                        sx={{   
                                            marginInlineStart : '5px',
                                            }} 
                                        control={<Radio />} label="Public" />
                    <FormControlLabel value="private" 
                                    sx={{   
                                        marginInlineStart : '5px',
                                        }}
                                    control={<Radio />} label="Private" />
                    </RadioGroup>
                    </FormControl>
                </Grid>
                    

                <Grid item
                    direction = 'row'
                    //bgcolor = '#e0e0e0'
                    >   
                    <Button variant="contained" color="success" 
                    sx={{   
                        marginInlineStart : '5px',
                        }}>
                        Create Post
                    </Button>
                    <Button variant="contained" 
                        sx={{   
                        marginInlineStart : '50px',
                        }}
                        
                        onClick={() => {
                            let path = `/`; 
                            history.push(path);
                            }}> 
                        Cancle
                    </Button>
                </Grid>               
        </Grid>

    )
}

export default Post
