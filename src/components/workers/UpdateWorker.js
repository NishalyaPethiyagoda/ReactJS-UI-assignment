
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {  MenuItem, TextField } from '@mui/material';
import axios from 'axios';


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

  
// const positions = [
//     {
//         value: '3',
//         label: 'Worker',
//     },
//     {
//         value: '2',
//         label: 'Captain',
//     },
//     {
//         value: '1',
//         label: 'CEO',
//     }
// ];

// function getWorkerPosition(worker, positions){
//     const positionAvailable = positions.find(position => position.name==worker.designation);
//     return positionAvailable.name;
// }

function UpdateWorker({worker, setOpen } ) {
    
    const [positions, setPositions] = useState([]);
    const [newWorker, setWorker] = useState();
  
    useEffect(()=>{
        axios.get('http://localhost:12759/api/WorkerDesignation')
            .then(response => {
                setPositions(response.data);
            })
    }, []);

    function getWorkerPosition(worker, positions){
        const currentPosition = positions.find(position => position.name == worker.designation);
        console.log(currentPosition)
        return currentPosition!= null ? currentPosition : "CEO";
    }
    
    
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
                        
                    <TextField id="outlined-basic" label="Email" sx={{minWidth: 295, marginTop:3}} variant="outlined"
                        defaultValue={worker.email}
                        onChange={(e) => setWorker({...worker, email: e.target.value})}
                    />

                    <TextField 
                        select 
                        id="outlined-select" 
                        label="Designation" 
                        defaultValue={getWorkerPosition(worker, positions)}
                        //defaultValue={worker.designation}
                        onChange={(e) => setWorker({...worker, designation: e.target.value})}
                        
                        sx={{minWidth: 295, marginTop:3}}
                    >
                        {console.log(newWorker)}
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
                    <Button variant="contained" onClick={null} sx={{margin: 3, minWidth:100}}>Submit</Button>
                        
                    <Button variant="contained" onClick={handleClose} sx={{marginLeft: 4}}>Close</Button>
                </Box>
            </Modal>
        </div>
    )
}

export default UpdateWorker
