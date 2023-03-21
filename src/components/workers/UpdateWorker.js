
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


function UpdateWorker(props ) {
    
    const [positions, setPositions] = useState([]);
    const [editingWorker, setWorker] = useState(props.worker);
  
    useEffect(()=>{
        axios.get('http://localhost:12759/api/WorkerDesignation')
            .then(response => {
                setPositions(response.data);
            })
    }, []);

    const updateWorkerSubmit = (editingWorker) => {
        console.log(editingWorker);

        axios.put(`http://localhost:12759/api/Worker/${editingWorker.id}`, editingWorker)
            .then( response => {
                console.log(response.data);
                
                props.tableRefresh();
            });
        props.setOpenUpdateModal(false);
    }

    const handleClose = () =>{
        props.setOpenUpdateModal(false);
    }
    return (
        <div>
            <Modal
                open={props.setOpenUpdateModal}
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
                        defaultValue={editingWorker.name} 
                        onChange={(e) => setWorker({...editingWorker, name: e.target.value})}
                        sx={{minWidth: 295, marginTop:3}} 
                        variant="outlined" size='100px'/>
                          
                    <TextField 
                        id="outlined-basic" 
                        label="Age" 
                        defaultValue={editingWorker.age} 
                        onChange={(e) => setWorker({...editingWorker, age: e.target.value})}
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
                                defaultValue={ new Date(editingWorker.certifiedDate).toISOString().slice(0,10)}
                                onChange={(e) => setWorker({ ...editingWorker, certifiedDate: e.target.value })}
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
                        defaultValue={editingWorker.email}
                        onChange={(e) => setWorker({...editingWorker, email: e.target.value})}
                    />

                    <TextField 
                        select 
                        id="outlined-select" 
                        label="Designation" 
                        defaultValue={parseInt(editingWorker.designationId)}
                        onChange={(e) => setWorker({...editingWorker, designationId: e.target.value})}
                        
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
                        onClick={() => updateWorkerSubmit(editingWorker)} 
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
