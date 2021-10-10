
import React, { Component,StyleSheet } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { bgcolor, height } from '@mui/system';
import Grid from "@mui/material/Grid";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Button } from '@mui/material';
import { useHistory } from "react-router-dom"
const heading = {
    fontSize: '30px',
    color: 'black',
    fontWeight: 'bold',
    
}

const Post = () => {
    const history = useHistory();

    return (
        <div>
            <Grid
                container
                direction="column"
                justifyContent="center"
                    >
                <Grid item
                    bgcolor =   '#e0e0e0'
                    alignItems ='center s'>   
                    <div style = {heading}>Create A New Post</div>
                </Grid>

                <Grid item  
                    bgcolor = '#eeeeee'
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
                    bgcolor =  '#e0e0e0' 
                    alignItems = 'flex-start'>

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
                </Grid>

                <Grid  item
                    bgcolor = '#eeeeee'
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
                    bgcolor = '#e0e0e0'>   
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
     </div>
    )
}

export default Post
