
import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { MenuItem, TextField } from '@mui/material';
import  { useState } from 'react'
import axios from 'axios';
import { Grid } from '@mui/material';
import {z} from "zod";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '20%',
  minWidth: '300px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function AddWorker(props) {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
 
    const [newWorker, setWorker] = useState(null);

    const validationScheme = z.object( {
        name: z.string().min(3).max(25),
        age: z.number().int().positive().min(18).max(60),
        email: z.string().min(12).max(25),
    });

    const [nameError, setNameError] = useState('');
    const [ageError, setAgeError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [certifiedDateError, setCertifiedDateError] = useState('');
    const [designationIdError, setDesignationIdError] = useState('');

    const handleFormSubmit = ()=>{

        const submitResult = validationScheme.safeParse(newWorker);

        if(!submitResult.success)
        {
            submitResult.error.format().name? setNameError(submitResult.error.format().name._error[0]) : setNameError('');
            submitResult.error.format().email? setEmailError(submitResult.error.format().email._error[0]) : setEmailError('');
            submitResult.error.format().age? setAgeError(submitResult.error.format().age._error[0] ): setAgeError('');

        }
        else{
            axios.post('http://localhost:12759/api/Worker', newWorker)
                .then(response => {
                    console.log(response.data);
                    props.onAddWorker();

                })
                .catch(error => {
                    console.log(error);
                });
        }
        handleClose();
    }

    return (
        <div>
            <Button 
                variant="contained" 
                onClick={handleOpen} 
                color="primary">
                Add Worker
            </Button>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                autoComplete="off"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add Worker
                    </Typography>

                    <TextField 
                        error = { nameError!== ''? true: false}
                        id="outlined-basic" 
                        required={true}
                        label="Name" 
                        type="text"
                        sx={{minWidth: 295, marginTop:3}} 
                        variant="outlined"  
                        onChange={(e) => setWorker({...newWorker, name: (e.target.value)})}
                        autocomplete="off"
                        helperText={nameError}
                    />

                    <TextField 
                        error = {ageError!== ''? true: false}
                        id="outlined-basic" 
                        rewuired={true}
                        label="Age" 
                        type="number"
                        sx={{minWidth: 295, marginTop:3}} 
                        variant="outlined"  
                        onChange={(e) => setWorker({...newWorker, age: parseInt(e.target.value)})}
                        autocomplete="off"
                        helperText={ageError}
                    />

                    <TextField 
                        error= {emailError!==''? true : false}
                        id="outlined-basic" 
                        required={true}
                        label="Email" 
                        type="email"
                        sx={{minWidth: 295 , marginTop:3}} 
                        variant="outlined" 
                        onChange={(e) => setWorker({...newWorker, email: (e.target.value)})}
                        autocomplete="off"
                        helperText={emailError}
                    ></TextField>

                    <TextField 
                        select 
                        error = {designationIdError!==''? true: false}
                        id="outlined-select" 
                        label="Designation" 
                        
                        rewuired={true}
                        variant="filled"
                        onChange={(e) => setWorker({...newWorker, designationId: parseInt(e.target.value)})}
                        autocomplete="off"
                        helperText={designationIdError}
                        sx={{minWidth: 295, marginTop:3}}
                    >
                        {props.designations.map( (designation) => (
                            <MenuItem 
                                key={designation.id} 
                                value={designation.id}
                            >
                                { designation.name}
                            </MenuItem>
                            ))
                        }
                    </TextField>

                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                error = {certifiedDateError!== ''? true: false}
                                id="outlined-basic"
                                required ={true}
                                label="Worker Certified Until (Date)"
                                sx={{minWidth: 295, marginTop:3}}
                                variant="outlined"
                                type="date"
                                onChange={(e) => setWorker({ ...newWorker, certifiedDate: (e.target.value) })}
                                helperText={certifiedDateError}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                    </Grid>

                    <Button variant="contained" onClick={handleFormSubmit} sx={{margin: 3, minWidth:100}} autocomplete="off">
                        Submit
                        {/* {console.log(newWorker)} */}
                    </Button>
                    <Button variant="contained" onClick={handleClose} sx={{margin: 3, minWidth:100}}>Close</Button>
                </Box>
            
            </Modal>
        </div>
    )
}

export default AddWorker
