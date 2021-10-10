import React, { Component,StyleSheet } from 'react'
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
//import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import Fab from '@mui/material/Fab';
//import AddIcon from '@mui/icons-material/Add';




const heading = {
    fontSize: '30px',
    color: 'black',
    //textAlign: 'left', // <-- the magic
    fontWeight: 'bold',
    
}


export class post extends Component {

    

    constructor(props){
        super(props)
        
        this.state = {
            title: '',
            commons:'',
            states:'Public'
        }

        
    }

    handleTiltle = (event) => {
        this.setState({
            title: event.target.value
        })
    }

    handleCommon = (event) =>{
        this.setState({
            commons: event.target.value
        })
    }

    handleStates = (event) =>{
        this.setState({
            states: event.target.value
        })
    }

    handleSumbit = event =>{
        alert(`${this.state.title} ${this.state.commons} ${this.state.states}`)
    }

    render() {
        return (
            
            <form onSubmit = {this.handleSumbit} 
            
            >
                <Grid
                    container
                    //spacing={2}
                    direction="column"
                    justifyContent="center"
                    //alignItems =''
                    //bgcolor = '#cfd8dc'
                    
                >
                    <Box
                        //borderRadius={3}
                        sx={{
                        p: 5,    
                        bgcolor:  '#e0e0e0',
                        alignItems:'flex-start',
                        //borderBottom: 1 
                        }}
                        >   
                         <div style = {heading}>Create A New Post</div>
                    </Box>

                    <Box
                        //borderRadius={3}
                        sx={{
                        p: 5,    
                        bgcolor:  '#eeeeee',
                        alignItems:'flex-start',
                        //borderBottom: 1 
                     }}
                    >
                        <div >

                        <TextField
                            style={{ marginTop: 5 ,
                            marginBottom: 5,
                            width: '50%',
                            //height: '90%',
                        
                            }}
                            id="addTitle"
                            label="title"
                            variant="filled"
                            value = {this.state.title} 
                            onChange = {this.handleTiltle}
                            />
                        
                        </div>
                     </Box>

                     <Box
                        //borderRadius={3}
                        sx={{
                        p: 5,    
                        
                        bgcolor:  '#e0e0e0',
                        alignItems:'flex-start',
                        //borderBottom: 1 
                     }}>
                        <div >

                        <TextField
                            style={{ marginTop: 5 ,
                            marginBottom: 5,
                            width: '90%',
                            height: '90%',
                        
                            }}
                            id="addDescription"
                            label="add description"
                            variant="filled"
                            multiline
                            rows={10}
                            onChange = {this.handleCommon}
                            />
                    
                        </div> 
                        
                        </Box>

                        <Box
                        //borderRadius={3}
                        sx={{
                        p: 5,    
                        bgcolor:  '#eeeeee',
                        alignItems:'flex-start',
                        //borderBottom: 1 
                        }}
                        >   
                        

                        <FormControl component="fieldset">
                        <FormLabel component="legend">State</FormLabel>
                        <RadioGroup
                            aria-label="private?"
                            defaultValue="public"
                            name="radio-buttons-group"
                        >
                        <FormControlLabel value="public" control={<Radio />} label="Public" />
                        <FormControlLabel value="private" control={<Radio />} label="Private" />
                        
                        </RadioGroup>
                        </FormControl>
                        </Box>
                    

                        <Box
                        sx={{
                        p: 1,    
                        bgcolor:  '#e0e0e0',
                        }}
                        >   
                         <Button variant="contained" color="success" >
                            Create Post
                        </Button>
                    </Box>
                        
                        
                    
                </Grid>
            </form>
           
        )
    }
}

export default post
