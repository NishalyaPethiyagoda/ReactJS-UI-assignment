
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {  MenuItem, TextField } from '@mui/material';
import axios from 'axios';
import { Grid } from '@mui/material';

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


function UpdateWorker({worker, setOpenUpdateModal } ) {
    
    const [positions, setPositions] = useState([]);
    const [newWorker, setWorker] = useState(worker);
    const [updateAlert, setUpdateAlert] = useState("");
  
    useEffect(()=>{
        axios.get('http://localhost:12759/api/WorkerDesignation')
            .then(response => {
                setPositions(response.data);
            })
    }, []);

    const updateWorkerSubmit = (newWorker) => {
        console.log(newWorker);

        axios.put(`http://localhost:12759/api/Worker/${newWorker.id}`, newWorker)
            .then( response => setUpdateAlert(response.data))

        console.log(updateAlert);
        setWorker(newWorker);
        setOpenUpdateModal(false);
        alert(updateAlert);
    }

    const handleClose = () =>{
        setOpenUpdateModal(false);
    }
    return (
        <div>
            <Modal
                open={setOpenUpdateModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Update Worker
                    </Typography>
                        
                    <TextField 
                        id="outlined-basic" 
                        label="Name" 
                        defaultValue={worker.name} 
                        onChange={(e) => setWorker({...newWorker, name: e.target.value})}
                        sx={{minWidth: 295, marginTop:3}} 
                        variant="outlined" size='100px'/>
                          
                    <TextField 
                        id="outlined-basic" 
                        label="Age" 
                        defaultValue={worker.age} 
                        onChange={(e) => setWorker({...newWorker, age: e.target.value})}
                        sx={{minWidth: 295, marginTop:3}} 
                        variant="outlined" />
                        
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                id="outlined-basic"
                                label="Worker Certified Until (Date)"
                                sx={{minWidth: 295, marginTop:3}}
                                variant="outlined"
                                type="date"
                                //defaultValue={DateTime.parse(worker.certifiedDate)}
                                defaultValue={Date.parse(worker.certifiedDate)}
                                onChange={(e) => setWorker({ ...newWorker, certifiedDate: e.target.value })}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                        
                    <TextField 
                        id="outlined-basic" 
                        label="Email" sx={{minWidth: 295, marginTop:3}} 
                        variant="outlined"
                        defaultValue={worker.email}
                        onChange={(e) => setWorker({...newWorker, email: e.target.value})}
                    />

                    <TextField 
                        select 
                        id="outlined-select" 
                        label="Designation" 
                        defaultValue={parseInt(worker.designationId)}
                        onChange={(e) => setWorker({...newWorker, designationId: e.target.value})}
                        
                        sx={{minWidth: 295, marginTop:3}}
                    >
                        
                        {positions.map( (position) => (
                            <MenuItem 
                                key={position.id} 
                                value={position.id}
                            >
                                { position.name}
                            </MenuItem>
                            ))
                        }
                    </TextField>
                    <Button 
                        variant="contained" 
                        onClick={() => updateWorkerSubmit(newWorker)} 
                        sx={{margin: 3, minWidth:100}}
                    >
                        Submit
                    {/* {console.log(worker)} */}
                    </Button>
                        
                    <Button 
                        variant="contained" 
                        onClick={handleClose} 
                        sx={{marginLeft: 4}}>Close</Button>
                </Box>
            </Modal>
        </div>
    )
}

export default UpdateWorker
