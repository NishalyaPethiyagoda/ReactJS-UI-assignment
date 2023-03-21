
import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { MenuItem, TextField } from '@mui/material';
import  { useState } from 'react'
import axios from 'axios';
import { Grid } from '@mui/material';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import { LocalizationProvider } from '@mui/lab';
// import DateTimePicker from '@mui/lab/DateTimePicker';


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

    const handleFormSubmit = ()=>{
        axios.post('http://localhost:12759/api/Worker', newWorker)
        .then(response => {
            console.log(response.data);
            props.onAddWorker();

        })
        .catch(error => {
            console.log(error);
        });
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
                        id="outlined-basic" 
                        label="Name" 
                        sx={{minWidth: 295, marginTop:3}} 
                        variant="outlined"  
                        onChange={(e) => setWorker({...newWorker, Name: e.target.value})}
                        autocomplete="off"
                    />

                    <TextField 
                        id="outlined-basic" 
                        label="Age" 
                        sx={{minWidth: 295, marginTop:3}} 
                        variant="outlined"  
                        autocomplete="off"
                        onChange={(e) => setWorker({...newWorker, Age: parseInt(e.target.value)})}
                    />

                    <TextField 
                        id="outlined-basic" 
                        label="Email" 
                        sx={{minWidth: 295 , marginTop:3}} 
                        variant="outlined" 
                        autocomplete="off"
                        onChange={(e) => setWorker({...newWorker, Email: e.target.value})}
                    ></TextField>

                    <TextField 
                        select 
                        id="outlined-select" 
                        label="Designation" 
                        variant="filled"
                        //defaultValue={positions}
                        //defaultValue={worker.designation}
                        onChange={(e) => setWorker({...newWorker, DesignationId: e.target.value})}
                        autocomplete="off"
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
                                id="outlined-basic"
                                label="Worker Certified Until (Date)"
                                sx={{minWidth: 295, marginTop:3}}
                                variant="outlined"
                                type="date"
                                onChange={(e) => setWorker({ ...newWorker, CertifiedDate: e.target.value })}
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
