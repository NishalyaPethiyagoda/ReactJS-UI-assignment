
import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { InputLabel, MenuItem, TextField } from '@mui/material';
import { Form } from 'react-router-dom';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '25%',
    minWidth: '300px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const designations = [
    {
        value: 'Worker',
        label: 'Worker',
    },
    {
        value: 'Captain',
        label: 'Captain',
    },
    {
        value: 'CEO',
        label: 'CEO',
    }
];

function UpdateWorker({worker, setOpen } ) {
    
    //const [open, setOpen] = useState(false);

    const handleClose = () =>{
        setOpen(false);
    }
    return (
        <div>
            <Modal
                open={setOpen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
            
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Update Worker
                    </Typography>
                        
                    <TextField id="outlined-basic" label="Name" defaultValue={worker.name} sx={{minWidth: 295, marginTop:3}} variant="outlined" size='100px'/>
                          
                    <TextField id="outlined-basic" label="Age" defaultValue={worker.age} sx={{minWidth: 295, marginTop:3}} variant="outlined" />
                        
                    <TextField id="outlined-basic" label="Worker Certified Until (Date)" defaultValue={worker.certifiedDate} sx={{minWidth: 295, marginTop:3}} variant="outlined" />
                        
                    <TextField id="outlined-basic" label="Email" defaultValue={worker.email} sx={{minWidth: 295, marginTop:3}} variant="outlined"  />
                        
                    <TextField 
                        select 
                        id="outlined-select" 
                        label="Designation" 
                        variant="filled"
                        defaultValue="Worker"
                        sx={{minWidth: 295, marginTop:3}}
                    >
                        {designations.map( (option) => (
                            <MenuItem key={option.value} value={option.value}>
                            { option.label}
                            </MenuItem>
                        )
                        )}
                    </TextField>
                    <Button variant="contained" onClick={null} sx={{margin: 3, minWidth:100}}>Submit</Button>
                        
                    <Button variant="contained" onClick={handleClose} sx={{marginLeft: 4}}>Close</Button>
                </Box>
            </Modal>
        </div>
    )
}

export default UpdateWorker
